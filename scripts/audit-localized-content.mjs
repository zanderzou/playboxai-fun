import {localeList,homeCopy} from "../src/data/localized-playbox.ts";
import {infoCopy} from "../src/data/localized-info.ts";
import {localizedComparisons,articleOrder,articleSources} from "../src/data/localized-articles.ts";
import {blogCopy} from "../src/data/localized-blog.ts";
const failures=[];
const check=(condition,message)=>{if(!condition)failures.push(message);};
const locales=localeList.map(entry=>entry.slug);
check(locales.length===9,"expected nine languages");
for(const locale of locales){
  const home=homeCopy[locale],info=infoCopy[locale],articles=localizedComparisons[locale],blog=blogCopy[locale];
  const compact=["ja","ko","zh-hant"].includes(locale);
  check(home.title==="Playbox AI",`${locale}: homepage keyword/title`);
  check(home.identity.paragraphs.length>=2&&home.method.steps.length===4&&home.comparisons.rows.length===5&&home.notes.entries.length===3&&home.faqs.length>=3,`${locale}: homepage depth`);
  check(home.hero.lead.length>=90&&home.safety.paragraphs.join(" ").length>=100,`${locale}: homepage/safety copy`);
  check(blog.intro.length>=(compact?40:90),`${locale}: blog index depth`);
  for(const key of ["about","contact","editorial-policy","privacy","terms"]){
    const page=info[key];
    check(page.sections.length>=2&&page.sections.flatMap(([,paragraphs])=>paragraphs).join(" ").length>=(compact?150:300),`${locale}/${key}: information depth`);
  }
  check(info.contact.sections.flatMap(([,paragraphs])=>paragraphs).join(" ").includes("support@playboxai.fun"),`${locale}: contact address`);
  for(const key of articleOrder){
    const article=articles[key];
    const length=article.intro.length+article.verdict.length+article.sections.reduce((total,[title,body])=>total+title.length+body.length,0);
    check(article.sections.length===4&&length>=500,`${locale}/${key}: article depth ${length}`);
    check(article.title.includes("Playbox AI")&&article.title.toLowerCase().includes(key.split("-")[0].toLowerCase()),`${locale}/${key}: title/keyword`);
    check(articleSources[key].product.startsWith("https://")&&articleSources[key].safety==="https://www.playbox.com/terms-and-conditions",`${locale}/${key}: primary sources`);
  }
}
if(failures.length){console.error(`Localized content audit failed:\n- ${failures.join("\n- ")}`);process.exit(1);}
console.log(`Localized content audit passed: ${locales.length} homepages, 45 VS articles and 45 information pages.`);
