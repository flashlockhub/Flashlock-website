import manifest from './manifest.json';
export const DENY="default-src 'none'; script-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'";
const LIMIT=131072;
export async function bounded(response){const r=response.body.getReader();let n=0,parts=[];try{for(;;){const {done,value}=await r.read();if(done)break;n+=value.length;if(n>LIMIT)throw Error('oversize');parts.push(value)}}finally{await r.cancel()}const out=new Uint8Array(n);let p=0;for(const v of parts){out.set(v,p);p+=v.length}return out}
export async function digest(bytes){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('')}
function fail(){return new Response('Publication verification failed. Please retry later.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store','Content-Security-Policy':DENY,'X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY','X-FlashLock-CSP-Release':manifest.release}})}

// Reverse only exact audited email markup for verification, never script bodies.
export function canonicalEmail(html){
 const decode=h=>{const key=parseInt(h.slice(0,2),16);const s=(h.slice(2).match(/../g)||[]).map(x=>String.fromCharCode(parseInt(x,16)^key)).join('');if(!/^[A-Za-z0-9@._+?=%&;/-]+$/.test(s))throw Error('invalid email');return s};
 return html.replace(/href="\/cdn-cgi\/l\/email-protection#([a-f0-9]+)"/g,(_,h)=>'href="mailto:'+decode(h)+'"').replace(/<span class="__cf_email__" data-cfemail="([a-f0-9]+)">\[email&#160;protected\]<\/span>/g,(_,h)=>decode(h)).replace('<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>','');
}
export default {async fetch(request,env){
 const u=new URL(request.url);
 if(!['flashlock.app','www.flashlock.app'].includes(u.hostname))return new Response('Not found',{status:404,headers:{'Content-Security-Policy':DENY}});
 if(u.protocol!=='https:'||u.hostname==='www.flashlock.app'){u.protocol='https:';u.hostname='flashlock.app';return Response.redirect(u.href,301)}
 if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD','Content-Security-Policy':DENY}});
 // Same-zone routed Worker fetch goes to existing origin. Never follow redirects.
 // Drop request cookies, validators, range and other untrusted forwarding headers.
 const upstream=await fetch(new Request(u.href,{method:'GET',headers:{Accept:'*/*','User-Agent':'FlashLock-CSP-Adapter/1'}}),{redirect:'manual',cf:{cacheTtl:0}});
 const h=new Headers(upstream.headers);h.set('X-FlashLock-CSP-Release',manifest.release);h.set('Content-Security-Policy',DENY);h.set('X-Content-Type-Options','nosniff');h.set('X-Frame-Options','DENY');h.set('Referrer-Policy','strict-origin-when-cross-origin');
 if(!(h.get('content-type')||'').includes('text/html'))return new Response(request.method==='HEAD'?null:upstream.body,{status:upstream.status,headers:h});
 try{
  const bytes=await bounded(upstream);let hash=await digest(bytes);let entry=manifest.documents[hash];if(!entry){hash=await digest(new TextEncoder().encode(canonicalEmail(new TextDecoder("utf-8",{fatal:true}).decode(bytes))));entry=manifest.documents[hash]}
  // Entire trusted build document must match; never bless upstream scripts.
  if(!entry)return fail();
  h.delete('content-length');h.delete('content-encoding');h.delete('etag');h.set('Cache-Control','no-store');
  h.set(env.MODE==='report'?'Content-Security-Policy-Report-Only':'Content-Security-Policy',entry.policy);
  if(env.MODE==='report')h.set('Content-Security-Policy',"frame-ancestors 'none'; object-src 'none'; base-uri 'none'");
  h.set('X-FlashLock-CSP-Release',manifest.release);
  return new Response(request.method==='HEAD'?null:bytes,{status:upstream.status,headers:h});
 }catch{return fail()}
}};
