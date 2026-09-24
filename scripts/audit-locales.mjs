import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const out=path.join(root,"dist","client");
const origin="https://playboxai.fun";
const locales={ja:"ja",ko:"ko","zh-hant":"zh-Hant",es:"es","pt-br":"pt-BR",ru:"ru",de:"de",fr:"fr",ar:"ar"};
const keys=["musebox","runway","kling-ai","pika","luma-dream-machine"];
const basePaths=["/","/blog/","/about/","/contact/","/editorial-policy/","/privacy/","/terms/",...keys.map(key=>`/blog/playbox-ai-vs-${key}/`)];
const expectedRoutes=new Set(basePaths.flatMap(route=>[route,...Object.keys(locales).map(slug=>`/${slug}${route}`)]));
const failures=[];
const check=(ok,message)=>{if(!ok)failures.push(message);};
const files=[];
function walk(dir){for(const item of readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,item.name);if(item.isDirectory())walk(full);else if(item.name.endsWith(".html"))files.push(full);}}
function routeFromFile(file){const rel=path.relative(out,file).replaceAll("\\","/");return rel==="index.html"?"/":rel.endsWith("/index.html")?`/${rel.slice(0,-11)}/`:`/${rel}`;}
function localFile(href){const route=href.split("#")[0].split("?")[0];if(!route.startsWith("/"))return null;return route==="/"?path.join(out,"index.html"):path.extname(route)?path.join(out,route):path.join(out,route,"index.html");}
function extract(html,re){return html.match(re)?.[1]??"";}
function englishPath(route){const first=route.split("/")[1];return locales[first]?route.slice(first.length+1)||"/":route;}
function alternates(route){const en=englishPath(route);return new Map([["en",`${origin}${en}`],...Object.entries(locales).map(([slug,code])=>[code,`${origin}/${slug}${en}`]),["x-default",`${origin}${en}`]]);}
walk(out);
const canonicals=new Set();
for(const file of files){
  const route=routeFromFile(file),html=readFileSync(file,"utf8"),slug=route.split("/")[1];
  const lang=locales[slug]??"en";
  const title=extract(html,/<title>(.*?)<\/title>/i);
  const desc=extract(html,/<meta name="description" content="([^"]+)"/i);
  const canonical=extract(html,/<link rel="canonical" href="([^"]+)"/i);
  const htmlLang=extract(html,/<html[^>]+lang="([^"]+)"/i);
  const direction=extract(html,/<html[^>]+dir="([^"]+)"/i);
  const h1=(html.match(/<h1(?:\s|>)/gi)??[]).length;
  const lowerBound=["ja","ko","zh-Hant"].includes(lang)?25:lang==="en"?70:45;
  check(Boolean(title),`${route}: missing title`);
  check(desc.length>=lowerBound&&desc.length<=240,`${route}: description length ${desc.length}`);
  if(route!=="/404.html")check(canonical===`${origin}${route}`,`${route}: canonical ${canonical}`);
  check(htmlLang===lang,`${route}: html lang ${htmlLang}`);
  check(direction===(lang==="ar"?"rtl":"ltr"),`${route}: direction ${direction}`);
  check(h1===1,`${route}: H1 count ${h1}`);
  check(/<meta name="robots"/.test(html),`${route}: robots`);
  check(/<meta property="og:title"/.test(html)&&/<meta property="og:image"/.test(html)&&/<meta name="twitter:card"/.test(html),`${route}: social metadata`);
  if(canonical){check(!canonicals.has(canonical),`${route}: duplicate canonical`);canonicals.add(canonical);}
  for(const img of html.match(/<img\b[^>]*>/gi)??[])check(/\salt="[^"]+"/i.test(img),`${route}: image alt`);
  for(const [,href] of html.matchAll(/href="([^"]+)"/gi)){const filePath=localFile(href);if(filePath)check(existsSync(filePath),`${route}: broken internal link ${href}`);}
  if(route==="/404.html")check(/noindex/i.test(html),"404 must be noindex");
  if(expectedRoutes.has(route)){
    const found=new Map([...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/g)].map(([,code,href])=>[code,href]));
    const expected=alternates(route);
    check(found.size===expected.size,`${route}: alternate count ${found.size}`);
    for(const [code,href] of expected)check(found.get(code)===href,`${route}: ${code} alternate`);
    if(route.endsWith("/index.html"))check(false,`${route}: unexpected file path`);
  }
}
check(files.length===121,`expected 121 HTML pages, found ${files.length}`);
for(const route of expectedRoutes)check(existsSync(localFile(route)),`missing route ${route}`);
for(const name of ["robots.txt","sitemap-index.xml","rss.xml","llms.txt","a37d5e4c9b1f42e8860d3a1c7f29b605.txt"])check(existsSync(path.join(out,name)),`missing ${name}`);
if(failures.length){console.error(`SEO audit failed:\n- ${failures.join("\n- ")}`);process.exit(1);}
console.log(`SEO audit passed for ${files.length} HTML pages and 120 reciprocal language routes.`);
