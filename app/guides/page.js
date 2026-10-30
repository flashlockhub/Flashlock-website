import { sitePath } from "../../lib/site";
import { pageMetadata } from "../../lib/seo";
import GuideLayout from "./GuideLayout";

export const metadata = pageMetadata(
  "/guides/",
  "FlashLock Guides: Android Setup and Anki Import",
  "Set up flashcards before your Android apps, bring your own Anki deck and troubleshoot imports. Practical guides for your daily study routine."
);

export default function Guides() {
  return <GuideLayout breadcrumbs={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }]}>
    <h1>FlashLock guides</h1>
    <p>Start with your own study material. Add a deck, pair it with an everyday Android app and keep the first break short.</p>
    <ul>
      <li><a href={sitePath("/guides/study-before-scrolling/")}>Study before scrolling on Android</a><p>Try a Spanish-before-Instagram routine. Choose your cards, enable access and check the first break.</p></li>
      <li><a href={sitePath("/guides/import-anki-decks/")}>Import Anki decks into FlashLock</a><p>Export an .apkg, review the cards and save a local copy. Check media and troubleshoot common errors.</p></li>
      <li><a href={sitePath("/medical/")}>FlashLock for medical students</a><p>Use course-specific cards rather than a generic starter deck.</p></li>
    </ul>
    <p>Choosing between a study break and a full blocker? <a href={sitePath("/compare/")}>Compare FlashLock with other focus apps</a>.</p>
    <p>By the FlashLock team · Reviewed 30 October 2026.</p>
  </GuideLayout>;
}
