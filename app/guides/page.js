import { sitePath } from "../../lib/site";
import { pageMetadata } from "../../lib/seo";
import GuideLayout from "./GuideLayout";

export const metadata = pageMetadata(
  "/guides/",
  "Study Habits, Phone Distraction and Android Setup | FlashLock",
  "Practical guides to phone distractions, Instagram and consistent study habits, plus FlashLock Android setup and Anki deck imports."
);

export default function Guides() {
  return <GuideLayout breadcrumbs={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }]}>
    <h1>FlashLock guides</h1>
    <p>Start with your own study material. Add a deck, pair it with an everyday Android app and keep the first break short.</p>
    <ul>
      <li><a href={sitePath("/guides/too-addicted-to-phone-to-study/")}> Too addicted to your phone to study? Start here</a><p>Struggling to study without checking your phone? Try a small study block, reduce phone cues and choose support that fits your situation.</p></li>
      <li><a href={sitePath("/guides/instagram-addiction-study/")}> Instagram keeps interrupting your study? Make a specific plan</a><p>Reduce Instagram interruptions during study with notification changes, planned check-ins and a realistic return-to-work routine.</p></li>
      <li><a href={sitePath("/guides/how-to-stick-with-study-habits/")}> How to stick with study habits when motivation fades</a><p>Build a study routine with a reliable cue, a small minimum, useful practice and a plan for missed days. Practical examples without perfect streaks.</p></li>

      <li><a href={sitePath("/guides/study-before-scrolling/")}>Study before scrolling on Android</a><p>Try a Spanish-before-Instagram routine. Choose your cards, enable access and check the first break.</p></li>
      <li><a href={sitePath("/guides/import-anki-decks/")}>Import Anki decks into FlashLock</a><p>Export an .apkg, review the cards and save a local copy. Check media and troubleshoot common errors.</p></li>
      <li><a href={sitePath("/medical/")}>FlashLock for medical students</a><p>Use course-specific cards rather than a generic starter deck.</p></li>
    </ul>
    <p>Choosing between a study break and a full blocker? <a href={sitePath("/compare/")}>Compare FlashLock with other focus apps</a>.</p>
    <p>By the FlashLock team · Reviewed 6 November 2026.</p>
  </GuideLayout>;
}
