import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true});
const results=[];
try {
 for (const [width,height,reduced] of [[1440,1000,false],[390,844,false],[768,1024,false],[1440,1000,true],[320,740,true]]) {
 const page=await browser.newPage({viewport:{width,height},reducedMotion:reduced?'reduce':'no-preference'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);
 assert.equal(await page.locator('h1').count(),1);
 assert.equal(await page.locator('.project').count(),4);
 assert.ok(await page.locator('.portrait-frame img').evaluate(e=>e.complete&&e.naturalWidth===480));
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);
 await page.locator('a[href="#work"]').first().click();await page.waitForTimeout(1800);
 await page.locator('#next').click();await page.waitForTimeout(1800);
 assert.equal(await page.locator('#project-count').textContent(),'02 / 04',`next ${width}`);
 await page.locator('#next').click();await page.waitForTimeout(1800);
 assert.equal(await page.locator('#project-count').textContent(),'03 / 04');
 await page.locator('#prev').click();await page.waitForTimeout(1800);
 assert.equal(await page.locator('#project-count').textContent(),'02 / 04');
 await page.locator('#prev').click();await page.waitForTimeout(1800);
 await page.locator('#project-1 summary').click();assert.ok(await page.locator('#project-1 details').evaluate(e=>e.open));
 await page.locator('#project-1 summary').click();
 await page.locator('a[href="#contact"]').first().click();await page.waitForTimeout(1500);
 assert.ok(await page.locator('.contact-title').isVisible());
 assert.equal(await page.locator('.contact-title').getAttribute('href'),'mailto:me@0xmyth.com');
 if(reduced){assert.equal(await page.locator('.is-pinned').count(),0);assert.equal(await page.locator('#motion-toggle').textContent(),'Motion: off');}
 else {await page.locator('#motion-toggle').click();assert.equal(await page.locator('.is-pinned').count(),0);}
 await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(300);
 await page.screenshot({path:`evidence/verified-${width}${reduced?'-reduced':''}.png`,fullPage:true});
 assert.deepEqual(errors,[]);
 results.push({width,height,reducedMotion:reduced,passed:true,checks:['no horizontal overflow','portrait loads','4 real projects','next/previous controls','project details','anchor navigation','email link','motion mode','no page errors']});
 await page.close();
 }
 const p=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await p.goto('http://127.0.0.1:5173');assert.ok(await p.locator('h1').isVisible());await p.close();results.push({javascriptDisabled:true,contentVisible:true});
 await writeFile('evidence/verification.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close()}
