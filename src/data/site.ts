export const site = {
  name: "Playbox AI",
  domain: "playboxai.fun",
  url: "https://playboxai.fun",
  description: "An independent Playbox AI guide to image-to-video workflows, templates, credits, output quality, privacy, consent, pricing questions, and alternatives.",
  author: "Playbox AI Guide editorial team",
  officialUrl: "https://www.playbox.com/",
};

export const formatDate = (date: Date) => new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(date);
export const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);
