'use strict';
const {chromium}=require('playwright-core');
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const root=__dirname,mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'};
 const server=http.createServer(async(req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  const file=path.join(root,pathname==='/'?'index.html':pathname);
  try{res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(await fs.readFile(file))}
  catch{res.writeHead(404).end()}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
 try{
  for(const profile of ['marina','vladlen']) for(const width of [320,360,375,390,414,430]){
   const page=await browser.newPage({viewport:{width,height:844}});
   await page.route('**/cloud.js*',route=>route.fulfill({contentType:'text/javascript',body:"document.querySelectorAll('[inert]').forEach(e=>e.inert=false)"}));
   await page.addInitScript(p=>localStorage.setItem('sb.active',p),profile);
   await page.goto('http://127.0.0.1:'+server.address().port);
   const geometry=()=>page.evaluate(()=>{
    const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};
    return {viewport:innerWidth,document:document.documentElement.scrollWidth,aside:rect('aside'),brand:rect('.brand'),nav:rect('#nav'),header:rect('header'),breadcrumb:rect('header>span'),profile:rect('#profileSelect'),theme:rect('#themeToggle'),navWidth:document.querySelector('#nav').scrollWidth};
   });
   let g=await geometry();
   assert.ok(g.document<=width,'document horizontal overflow '+profile+' '+width);
   assert.ok(g.header.height<=65,'header height '+profile+' '+width+': '+g.header.height);
   assert.ok(g.profile.width>=width*.42,'profile control too narrow '+profile+' '+width);
   assert.ok(g.breadcrumb.right<=g.profile.x+1,'breadcrumb/profile overlap '+profile+' '+width);
   assert.ok(g.theme.right<=width+1&&g.theme.y<50,'theme control not aligned with brand '+profile+' '+width);
   const menu=page.locator('#mobileMenuToggle');
   assert.equal(await menu.getAttribute('aria-expanded'),'false','mobile menu starts closed '+profile+' '+width);
   await menu.click();
   assert.equal(await menu.getAttribute('aria-expanded'),'true','hamburger opens navigation '+profile+' '+width);
   assert.ok(await page.locator('#nav').isVisible(),'navigation drawer is visible '+profile+' '+width);
   await page.locator('#nav button').nth(8).click();
   assert.equal(await menu.getAttribute('aria-expanded'),'false','navigation closes after selecting a section '+profile+' '+width);
   assert.equal(await page.locator('#nav button[aria-current="page"]').count(),1,'one active navigation item '+profile+' '+width);
   assert.equal(await page.locator('#nav button').count(),10,'dictionary is available in both profiles '+profile+' '+width);
   await menu.click();
   await page.locator('#nav button').nth(9).click();
   if(profile==='marina'){
    assert.equal(await page.locator('.vocab-summary b').nth(0).textContent(),'42','Marina vocabulary category entries '+width);
    assert.equal(await page.locator('.vocab-summary b').nth(1).textContent(),'41','Marina unique vocabulary expressions '+width);
   }else{
    assert.equal(await page.locator('.vocab-summary b').nth(0).textContent(),'0','Vladlen starts with an empty personal vocabulary '+width);
   }
   await page.getByRole('button',{name:'+ Добавить слово'}).click();
   await page.locator('#newVocabEn').fill('test expression '+profile);
   await page.locator('#newVocabRu').fill('тестовый перевод');
   await page.locator('#newVocabExample').fill('This is a test expression.');
   await page.getByRole('button',{name:'Сохранить в мой словарь'}).click();
   assert.equal(await page.locator('.vocab-word h3').filter({hasText:'test expression '+profile}).count(),1,'new word is saved to the active profile '+profile+' '+width);
   await page.locator('#themeToggle').click();
   assert.equal(await page.locator('html').getAttribute('data-theme'),'light','light theme toggle '+profile+' '+width);
   g=await geometry();
   assert.ok(g.document<=width,'light theme overflow '+profile+' '+width);
   assert.ok(g.theme.right<=width+1,'light theme button overflow '+profile+' '+width);
   console.log('PASS',profile,width,'header='+Math.round(g.header.height)+'px','profile='+Math.round(g.profile.width)+'px','menu=hamburger');
   await page.close();
  }
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
})().catch(error=>{console.error(error);process.exit(1)});
