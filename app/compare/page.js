import { sitePath } from "../../lib/site";
import { pageMetadata } from "../../lib/seo";
import Breadcrumbs from "../Breadcrumbs";
import styles from "./flashlock-vs-appblock/comparison.module.css";

const title = "Compare FlashLock: Flashcards, App Blockers & Focus Timers";
const description = "Choose between flashcard reviews, AnkiDroid goals, mindful pauses and timed blocking. Compare FlashLock with AnkiBlock, AppBlock, one sec, Forest, Freedom and Stay Focused.";
export const metadata = pageMetadata("/compare/", title, description);

export default function Compare() {
  return <div className={styles.page}>
    <a className="skipLink" href="#main">Skip to comparisons</a>
    <header className={styles.header}><a className="brand" href={sitePath("/")}>FlashLock</a><a href={sitePath("/#demo")}>Try the demo</a></header>
    <main id="main">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Compare", path: "/compare/" }]} />
      <header className={styles.intro}><h1>Compare FlashLock</h1><p className={styles.lead}>Do you want to review, reconsider opening an app, or block it for a while?</p></header>
      <h2>Pick the habit you want to change.</h2>
      <ul>
        <li><p><a href={sitePath("/compare/flashlock-vs-ankiblock/")}>FlashLock vs AnkiBlock</a><br/>Review inside FlashLock or unlock apps through AnkiDroid study goals.</p></li>
        <li><p><a href={sitePath("/compare/flashlock-vs-appblock/")}>FlashLock vs AppBlock</a><br/>A few cards before access or rules for times, usage and app launches.</p></li>
        <li><p><a href={sitePath("/compare/flashlock-vs-one-sec/")}>FlashLock vs one sec</a><br/>Your study material or a mindful pause; where LENGO vocabulary fits.</p></li>
        <li><p><a href={sitePath("/compare/flashlock-vs-forest/")}>FlashLock vs Forest</a><br/>Short recall practice or a tree-growing focus session.</p></li>
        <li><p><a href={sitePath("/compare/flashlock-vs-freedom/")}>FlashLock vs Freedom</a><br/>Android study breaks or coordinated blocking across phone and computer.</p></li>
        <li><p><a href={sitePath("/compare/flashlock-vs-stay-focused/")}>FlashLock vs Stay Focused</a><br/>Review prompts or blocking profiles—not the StayFocusd browser extension.</p></li>
      </ul>
      <p>Already choosing flashcards? Start with <a href={sitePath("/guides/study-before-scrolling/")}>study before scrolling</a> or the <a href={sitePath("/guides/import-anki-decks/")}>Anki import guide</a>.</p>
      <p className={styles.note}>Written by the FlashLock team, not an independent review. Official sources checked 30 October 2026; each comparison links its evidence and platform limits. These are workflow comparisons, not hands-on app tests or ranked recommendations.</p>
    </main>
    <footer className={styles.footer}><a href={sitePath("/")}>← Back to FlashLock</a><a href={sitePath("/privacy/")}>Privacy</a></footer>
  </div>;
}
