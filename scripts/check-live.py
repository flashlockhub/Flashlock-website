"""Read-only exported-route equality and edge-header checks; no signup writes.
Run python3 scripts/check-live.py. REQUIRE_EDGE=1 additionally requires enforced
CSP/XFO/nosniff and immutable caching for exported content-hashed JS/CSS only.
"""
from pathlib import Path
import os,json,urllib.request
root=Path('docs'); rows=[]; edge=os.environ.get('REQUIRE_EDGE')=='1'
files=list(root.rglob('*.html'))+[root/x for x in ['robots.txt','sitemap.xml','llms.txt','ai.txt']]
files+=list((root/'_next/static/chunks').glob('*.js'))[:2]+list((root/'_next/static/chunks').glob('*.css'))[:2]+[root/'app/flashlock-icon.svg']
for f in files:
 path='/'+str(f.relative_to(root));path=path[:-10] if path.endswith('index.html') else path
 with urllib.request.urlopen('https://flashlock.app'+path,timeout=30) as r:
  body=r.read();h=dict(r.headers);assert r.status==200,(path,r.status)
  assert body==f.read_bytes(),('export differs',path)
  cache=r.headers.get('Cache-Control','');csp=r.headers.get('Content-Security-Policy','')
  if not path.startswith('/_next/static/'):assert 'immutable' not in cache,path
  if edge:
   assert r.headers.get('X-Content-Type-Options')=='nosniff',path
   assert r.headers.get('X-Frame-Options')=='DENY',path
   if f.suffix=='.html':assert "frame-ancestors 'none'" in csp and "script-src" in csp,path
   if path.startswith('/_next/static/chunks/'):assert 'immutable' in cache,path
  rows.append({'path':path,'status':200,'byteMatch':True,'headers':h})
Path('artifacts/audit/live-publication.json').write_text(json.dumps(rows,indent=2));print(json.dumps({'verified':len(rows),'edgeRequired':edge}))
