// Run against the static export: DEMO_URL=http://127.0.0.1:8766 node scripts/test-demo.cjs
const pw = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const url = process.env.DEMO_URL || 'http://127.0.0.1:8766';
(async () => {
  const results = [];
  for (const engine of (process.env.DEMO_ENGINES || 'chromium').split(',')) {
    const browser = await pw[engine].launch({headless:true});
    try {
      for (const touch of [false,true]) for (const mode of ['cold','warm','offline','blocked-model','blocked-lazy','slow-model','no-webgl','no-js','blocked-hydration','slow-hydration']) {
        const context = await browser.newContext({viewport:{width:touch?390:1440,height:900},hasTouch:touch,isMobile:engine==='firefox'?false:touch,javaScriptEnabled:mode!=='no-js'});
        const page = await context.newPage(); page.setDefaultTimeout(8000);
        const errors=[],failed=[],csp=[];
        page.on('pageerror',e=>errors.push(String(e)));
        page.on('requestfailed',r=>failed.push({url:r.url(),failure:r.failure()}));
        await page.exposeFunction('reportCsp',event=>csp.push(event));
        await page.addInitScript(()=>document.addEventListener('securitypolicyviolation',e=>window.reportCsp({directive:e.effectiveDirective,blocked:e.blockedURI})));
        if(mode==='blocked-hydration') await page.route('**/_next/**/*.js',r=>r.abort());
        if(mode==='slow-hydration') await page.route('**/_next/**/*.js',async r=>{await new Promise(resolve=>setTimeout(resolve,2000));await r.continue().catch(()=>{});});
        if(mode==='blocked-model') await page.route('**/*.glb',r=>r.abort());
        if(mode==='slow-model') await page.route('**/*.glb',async r=>{await new Promise(resolve=>setTimeout(resolve,10000));await r.continue().catch(()=>{});});
        if(mode==='no-webgl') await page.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,...args){return t.startsWith('webgl')?null:get.call(this,t,...args);};});
        await page.goto(url,{waitUntil:'domcontentloaded'});
        if(mode==='warm') await page.reload({waitUntil:'domcontentloaded'});
        const tap=locator=>locator[touch?'tap':'click']();
        if(['no-js','blocked-hydration'].includes(mode)) {
          const fallback=page.getByTestId('demo-fallback'); await fallback.waitFor();
          assert.equal(await page.getByRole('button',{name:'Open Instagram demo',exact:true}).isDisabled(),true);
          for(const summary of await fallback.locator('summary').all()) await tap(summary);
          assert.equal(await fallback.locator('details[open]').count(),3);
          assert.ok(await fallback.getByText('Before opening Instagram.',{exact:true}).isVisible());
        } else {
          const launch=page.getByRole('button',{name:'Open Instagram demo',exact:true});
          await page.waitForFunction(()=>!document.querySelector('[aria-label="Open Instagram demo"]').disabled);
          if(mode==='offline') await context.setOffline(true);
          if(mode==='blocked-lazy') await page.route('**/_next/**/*.js',r=>r.abort());
          for(let cycle=0;cycle<2;cycle++) {
            await tap(launch);
            for(let card=0;card<3;card++) {
              await page.getByRole('button',{name:'Reveal answer',exact:true}).waitFor({timeout:5000});
              await tap(page.getByRole('button',{name:'Reveal answer',exact:true}));
              await tap(page.locator('[aria-label="Rate your answer"] button').last());
            }
            await page.getByTestId('demo-complete').waitFor({timeout:5000});
            if(process.env.DEMO_SCREENSHOTS && cycle===0 && mode==='cold') await page.screenshot({path:process.env.DEMO_SCREENSHOTS+'/'+engine+'-'+touch+'-complete.png'});
            await tap(page.getByRole('button',{name:'Start the demo over',exact:true}));
          }
          // Close during a pending optional model request and reopen without stale state.
          await tap(launch); await tap(page.getByRole('button',{name:'Start the demo over',exact:true})); await tap(launch);
          await page.getByRole('button',{name:'Reveal answer',exact:true}).waitFor({timeout:5000});
          if(process.env.DEMO_SCREENSHOTS && mode==='cold') await page.screenshot({path:process.env.DEMO_SCREENSHOTS+'/'+engine+'-'+touch+'-card.png'});
        }
        assert.deepEqual(errors,[]); assert.deepEqual(csp,[]);
        results.push({engine,touch,mode,passed:true,failedRequests:failed});
        await context.close();
      }
    } finally { await browser.close(); }
  }
  if(process.env.DEMO_RESULTS) fs.writeFileSync(process.env.DEMO_RESULTS,JSON.stringify(results,null,2));
  console.log(JSON.stringify({passed:results.length}));
})().catch(error=>{console.error(error);process.exitCode=1;});
