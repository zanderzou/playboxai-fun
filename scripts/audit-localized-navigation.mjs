import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
const {chromium}=require("C:/Users/zande/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const browser=await chromium.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});
const base="http://127.0.0.1:4324";
try{
  const desktop=await browser.newPage({viewport:{width:1280,height:850}});
  await desktop.goto(`${base}/blog/playbox-ai-vs-runway/`);
  await desktop.locator(".language-switch summary").click();
  await desktop.locator('.language-options a[lang="ja"]').click();
  if(new URL(desktop.url()).pathname!=="/ja/blog/playbox-ai-vs-runway/")throw Error("English to Japanese article switch lost route");
  await desktop.locator(".language-switch summary").click();
  await desktop.locator('.language-options a[lang="ar"]').click();
  if(new URL(desktop.url()).pathname!=="/ar/blog/playbox-ai-vs-runway/")throw Error("Japanese to Arabic article switch lost route");
  if(await desktop.locator("html").getAttribute("dir")!=="rtl")throw Error("Arabic article missing RTL");
  await desktop.close();
  const mobile=await browser.newPage({viewport:{width:390,height:844}});
  await mobile.goto(`${base}/de/`);
  await mobile.locator("[data-menu-button]").click();
  if(!await mobile.locator("[data-mobile-nav]").isVisible())throw Error("Mobile menu did not open");
  await mobile.locator('[data-mobile-nav] a[href="/de/blog/"]').click();
  if(new URL(mobile.url()).pathname!=="/de/blog/")throw Error("Mobile menu lost locale");
  await mobile.close();
  console.log("Localized navigation passed: article language switch, Arabic RTL and mobile menu locale preservation.");
}finally{await browser.close();}
