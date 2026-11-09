// Review artifact only: GitHub Pages does NOT consume this manifest.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root='docs';
const files=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);e.isDirectory()?walk(p):files.push(p)}}walk(root);
const routes={};
for(const f of files.filter(f=>f.endsWith('.html'))){const html=fs.readFileSync(f,'utf8');const hashes=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter(m=>! /\bsrc=/.test(m[1])).map(m=>"'sha256-"+createHash('sha256').update(m[2]).digest('base64')+"'");routes[f.slice(root.length)]={ 'Content-Security-Policy': ["default-src 'none'", "script-src 'self' "+[...new Set(hashes)].join(' '), "style-src 'self' 'unsafe-inline'", "img-src 'self' data:", "font-src 'self'", "connect-src 'self'", "media-src 'self' blob:", "object-src 'none'", "base-uri 'none'", "form-action 'none'", "frame-ancestors 'none'"].join('; '), 'X-Frame-Options':'DENY','X-Content-Type-Options':'nosniff'};}
fs.mkdirSync('artifacts/audit',{recursive:true});fs.writeFileSync('artifacts/audit/edge-policy.candidate.json',JSON.stringify({warning:'NOT DEPLOYED. Adapter must map /index.html to / and nested index.html to directory routes; include 404s. Report-only staging validation required before enforcement.',routes,cache:{fingerprintedNextStatic:'public, max-age=31536000, immutable',htmlAndUnversionedPublicAssets:'public, max-age=600'}},null,2));console.log('Generated candidate policies for '+Object.keys(routes).length+' HTML files');
