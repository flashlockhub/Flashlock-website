import {absoluteSiteUrl,sitePath} from "../../lib/site";
import GuideLayout from "./GuideLayout";
const title="FlashLock Guides: Android Setup and Anki Import";
const description="Quick, practical guides to setting up FlashLock’s Android learning breaks and importing Anki decks.";
const url=absoluteSiteUrl("/guides/");
export const metadata={title,description,alternates:{canonical:url},openGraph:{title,description,url,type:"website"},twitter:{card:"summary",title,description}};
export default function Guides(){return <GuideLayout><h1>FlashLock guides</h1><p>Start with a small, useful study break. Set up flashcards before your apps and bring your favourite decks along.</p><ul><li><a href={sitePath("/guides/study-before-scrolling/")}>Study before scrolling on Android</a><p>Choose apps, set your card count and understand the required permissions.</p></li><li><a href={sitePath("/guides/import-anki-decks/")}>Import Anki decks into FlashLock</a><p>Choose an .apkg file, review your cards and check compatibility before saving.</p></li></ul><p>By the FlashLock team · Updated 27 October 2026.</p></GuideLayout>;}