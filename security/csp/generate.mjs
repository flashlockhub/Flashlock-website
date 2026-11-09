import fs from 'node:fs';import path from 'node:path';import{createHash}from'node:crypto';import{execFileSync}from'node:child_process';
const sha=(s,fmt='hex')=>createHash('sha256').update(s).digest(fmt);
const release=execFileSync('git',['rev-parse','origin/main'],{encoding:'utf8'}).trim();
// Only committed reviewed publication bytes; reject local build/worktree drift.
execFileSync('git',['diff','--exit-code','origin/main','--','docs']);
const documents={};
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory()){walk(f);continue}if(!f.endsWith('.html'))continue;const b=execFileSync('git',['show',release+':'+f]),html=b.toString('utf8');if(!b.equals(fs.readFileSync(f)))throw Error('untrusted worktree bytes');if(b.length>131072)throw Error('oversized document');const hashes=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter(m=>! /\bsrc=/.test(m[1])).map(m=>"'sha256-"+sha(m[2],'base64')+"'");if(!hashes.length)throw Error('No inline hashes: '+f);documents[sha(b)]={file:f,policy:["default-src 'none'","script-src 'self' "+[...new Set(hashes)].join(' '),"script-src-attr 'none'","style-src 'self' 'unsafe-inline'","img-src 'self' data:","font-src 'self'","connect-src 'self'","media-src 'self' blob:","object-src 'none'","base-uri 'none'","form-action 'none'","frame-ancestors 'none'"].join('; ')}}}
walk('docs');fs.writeFileSync('security/csp/manifest.json',JSON.stringify({release,documents},null,2));console.log({release,documents:Object.keys(documents).length});
