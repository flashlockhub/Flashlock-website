import { sitePath } from "../../../lib/site";
import { pageMetadata } from "../../../lib/seo";
import GuideCTA from "../GuideCTA";
import GuideLayout from "../GuideLayout";
import styles from "../guides.module.css";

export const metadata = pageMetadata(
  "/guides/study-before-scrolling/",
  "Study Before Scrolling on Android: Setup Guide | FlashLock",
  "Put your study deck before Instagram or another Android app. Choose cards, enable the required access and check your first FlashLock learning break."
);

export default function Guide() {
  return <GuideLayout breadcrumbs={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }, { name: "Study before scrolling", path: "/guides/study-before-scrolling/" }]}><article>
    <h1>Study before scrolling on Android</h1>
    <p>Pair a deck you are studying with an app you open every day. FlashLock puts a few cards before that app, so your usual phone routine becomes a prompt to review.</p>
    <GuideCTA campaign="guide-study-before-scrolling" />
    <h2>A simple example: Spanish before Instagram</h2>
    <p>Add your Spanish deck, choose Instagram and start with three cards per break. When the break appears, try each answer, reveal it and finish the review before continuing. Three is a starting suggestion, not a required setting.</p>
    <h2>Set up your first break</h2>
    <ol>
      <li><strong>Add the material you actually need.</strong> Create a deck or <a href={sitePath("/guides/import-anki-decks/")}>import an Anki file</a>. Check its questions and answers. Starter trivia is only a sample; it is not a substitute for your study deck.</li>
      <li><strong>Choose your deck and one daily app.</strong> Select the study deck on Home, then choose the app you want a break before. Set a small card count and adjust the timing to suit your routine.</li>
      <li><strong>Enable the required access.</strong> Follow FlashLock’s prompts for Accessibility and Usage Access. Read Android’s confirmation, enable FlashLock, then return to setup. Menu names vary by phone; use the in-app setup help when they differ.</li>
      <li><strong>Choose the optional settings.</strong> Notifications, background-access guidance and app-usage sharing are separate choices. Usage sharing is not required to study. Review the battery guidance if your phone stops FlashLock in the background.</li>
      <li><strong>Try the actual app.</strong> Finish setup, make sure blocking is enabled, and open the app you selected. Check that your own deck appears, not just the practice cards shown during setup.</li>
    </ol>
    <details className={styles.screenshots}>
      <summary>See the deck and app screens</summary>
      <div className={styles.screenGrid}>
        <figure><img src={sitePath("/app/play-home-decks.webp")} width="640" height="1138" loading="lazy" decoding="async" alt="FlashLock Home showing two active decks, New Deck and Interrupt mode off"/><figcaption>Home: choose your deck. Turn Interrupt mode on when you’re ready.</figcaption></figure>
        <figure><img src={sitePath("/app/play-selected-apps.webp")} width="640" height="1138" loading="lazy" decoding="async" alt="FlashLock app selection with YouTube and Chrome selected"/><figcaption>Apps: select the everyday apps you want to pair with study.</figcaption></figure>
      </div>
      <p className={styles.note}>Examples from <a href="https://play.google.com/store/apps/details?id=com.flashlock.app">FlashLock’s Google Play listing</a>, checked 30 October 2026. Screens can vary by version.</p>
    </details>
    <GuideCTA campaign="guide-study-before-scrolling" />
    <h2>If the break does not appear</h2>
    <ul>
      <li><strong>Check your choices:</strong> the app is selected, a usable deck is selected, and blocking or the schedule is not paused.</li>
      <li><strong>Check the timing:</strong> a cooldown or scheduled break may mean cards do not appear on every opening.</li>
      <li><strong>Check Android access:</strong> revisit Accessibility and Usage Access. If FlashLock is enabled but disconnected, turn its Accessibility service off and on, then return.</li>
      <li><strong>Check background restrictions:</strong> use your phone’s app/battery settings and FlashLock’s setup help. No single manufacturer menu fits every Android phone.</li>
    </ul>
    <h2>Keep the routine useful</h2>
    <p>Start with one app and a small, relevant deck. For medicine, <a href={sitePath("/medical/")}>build the cards around your course</a>. To compare a study break with a full blocker, see <a href={sitePath("/compare/flashlock-vs-appblock/")}>FlashLock vs AppBlock</a>.</p>
    <p><a href={sitePath("/privacy/")}>Read how FlashLock handles permissions and study data</a>.</p>
    <p>By the FlashLock team · Reviewed 30 October 2026. Setup labels can vary by installed version.</p>
    <GuideCTA campaign="guide-study-before-scrolling" />
  </article></GuideLayout>;
}
