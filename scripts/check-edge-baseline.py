"""Read-only baseline check; REQUIRE_FULL_CSP=1 intentionally fails until full CSP."""
import json, os, pathlib, subprocess, tempfile, urllib.parse, xml.etree.ElementTree as ET
root=pathlib.Path('docs')
paths=['/'+str(f.relative_to(root)).removesuffix('index.html') for f in root.rglob('*.html')]
assets=['/'+str(f.relative_to(root)) for f in (root/'_next/static/chunks').rglob('*') if f.suffix in ('.js','.css')]
paths+=assets+['/robots.txt','/sitemap.xml','/app/flashlock-icon.svg','/edge-audit-nonexistent','/api/edge-audit-nonexistent']
rows=[]
with tempfile.TemporaryDirectory() as temp:
 sitemap=ET.parse(root/'sitemap.xml')
 canonical_paths=sorted({urllib.parse.urlsplit(node.text).path for node in sitemap.iter() if node.tag.endswith('}loc') or node.tag=='loc'})
 for canonical in canonical_paths:
  if canonical=='/':continue
  source=canonical.removesuffix('/')
  r=subprocess.run(['curl','-sS','--max-time','30','-o',os.devnull,'-w','%{http_code} %{redirect_url}','https://flashlock.app'+source],check=True,text=True,capture_output=True)
  status,location=r.stdout.split(' ',1)
  assert status=='308',(source,status)
  assert location=='https://flashlock.app'+canonical,(source,location)
  rows.append({'path':source,'status':status,'redirect':location})
 for path in paths:
  header=pathlib.Path(temp)/'headers'
  r=subprocess.run(['curl','-sS','--max-time','30','-D',str(header),'-o',os.devnull,'-w','%{http_code}','https://flashlock.app'+path],check=True,text=True,capture_output=True)
  headers={}
  for line in header.read_text().splitlines():
   if ':' in line:
    key,value=line.split(':',1);headers[key.lower()]=value.strip()
  assert r.stdout==('404' if path.endswith('edge-audit-nonexistent') else '200'),(path,r.stdout)
  assert headers.get('x-frame-options')=='DENY',path
  assert headers.get('x-content-type-options')=='nosniff',path
  policy=headers.get('content-security-policy','')
  assert "frame-ancestors 'none'" in policy,path
  assert ('immutable' in headers.get('cache-control',''))==(path in assets),path
  assert 'content-security-policy-report-only' not in headers,('stale candidate',path)
  if os.getenv('REQUIRE_FULL_CSP')=='1':
   assert "default-src 'none'" in policy and 'script-src' in policy,('full CSP missing',path)
   script=next(x for x in policy.split(';') if x.strip().startswith('script-src '))
   assert "'unsafe-inline'" not in script and "'unsafe-eval'" not in script,path
  rows.append({'path':path,'status':r.stdout,'headers':headers})
output=pathlib.Path('artifacts/audit/edge-baseline-live.json');output.parent.mkdir(parents=True,exist_ok=True);output.write_text(json.dumps(rows,indent=2))
print(json.dumps({'verified':len(rows),'fullCSPRequired':os.getenv('REQUIRE_FULL_CSP')=='1'}))
