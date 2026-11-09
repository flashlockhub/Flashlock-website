from pathlib import Path
from html.parser import HTMLParser
import json,hashlib,base64
class Parser(HTMLParser):
 def __init__(self): super().__init__(); self.scripts=[];self.attrs=None;self.body='';self.h1='';self.inh=False
 def handle_starttag(self,t,a):
  if t=='script': self.attrs=dict(a);self.body=''
  if t=='h1': self.inh=True
 def handle_data(self,d):
  if self.attrs is not None: self.body+=d
  if self.inh:self.h1+=d
 def handle_endtag(self,t):
  if t=='script':self.scripts.append((self.attrs,self.body));self.attrs=None
  if t=='h1':self.inh=False
manifest=json.load(open('artifacts/audit/edge-policy.candidate.json')); articles=0; scripts=0
for f in Path('docs').rglob('*.html'):
 p=Parser();p.feed(f.read_text());policy=manifest['routes']['/'+str(f.relative_to('docs'))]['Content-Security-Policy']
 for a,b in p.scripts:
  if 'src' not in a:
   digest=base64.b64encode(hashlib.sha256(b.encode()).digest()).decode();assert 'sha256-'+digest in policy; scripts+=1
  if a.get('type')=='application/ld+json':
   d=json.loads(b)
   if d.get('@type')=='Article':assert d['headline']==p.h1;articles+=1
assert articles==11,articles
def lum(rgb):
 c=[v/255 for v in rgb];c=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in c];return sum(a*b for a,b in zip(c,[.2126,.7152,.0722]))
def ratio(a,b):
 l=sorted([lum(a),lum(b)]);return (l[1]+.05)/(l[0]+.05)
print(json.dumps(dict(articles=articles,hashedInlineScripts=scripts,medicalContrastBefore=ratio([32,32,57],[13,27,75]),medicalContrastAfter=ratio([240,239,250],[13,27,75])),indent=2))
