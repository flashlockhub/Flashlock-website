import { sitePath } from "../../../lib/site";
import { pageMetadata } from "../../../lib/seo";
import GuideCTA from "../GuideCTA";
import GuideLayout from "../GuideLayout";

export const metadata = pageMetadata(
  "/guides/import-anki-decks/",
  "Import Anki APKG Decks into FlashLock | Android Guide",
  "Export an Anki deck, choose the APKG file, check its cards and save a separate FlashLock copy. Learn what happens to media and review history."
);

export default function Guide() {
  return <GuideLayout breadcrumbs={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }, { name: "Import Anki decks", path: "/guides/import-anki-decks/" }]}><article>
    <h1>Import Anki decks into FlashLock</h1>
    <p><strong>File import makes a separate FlashLock copy.</strong> It does not sync edits, review history or scheduling back to Anki. Use it to bring familiar cards into <a href={sitePath("/guides/study-before-scrolling/")}>short study breaks before Android apps</a>.</p>
    <GuideCTA campaign="guide-import-anki-decks" />
    <h2>1. Export one deck</h2>
    <p>In Anki, export the deck as an <strong>Anki Deck Package (.apkg)</strong>. Include media if it uses pictures, then save the file on your Android phone. Start with a small deck to check compatibility.</p>
    <p>An <strong>.apkg</strong> normally contains a deck; <strong>.colpkg</strong> is a whole-collection backup. For this workflow, export the single deck you want rather than renaming a collection backup. See <a href="https://docs.ankiweb.net/manual/exporting">Anki’s export instructions</a>.</p>
    <h2>2. Choose the file in FlashLock</h2>
    <ol>
      <li>From Home, open <strong>New Deck</strong> and choose the file-import option. It may be labelled <strong>Upload a deck</strong> in your version.</li>
      <li>Tap <strong>Choose deck file</strong> and select the .apkg in Android’s file picker. Wait for the review screen.</li>
      <li>Check the questions, answers, images and any import notice. If needed, <strong>Review imported cards</strong> reopens the preview.</li>
      <li>Enter a deck name and choose <strong>Finish deck and go home</strong> to save. Select that deck for your learning breaks.</li>
    </ol>
    <p>If your version also offers an AnkiDroid connection, that is a different route. These steps describe importing a file, not linking a live collection.</p>
    <GuideCTA campaign="guide-import-anki-decks" />
    <h2>What to check before saving</h2>
    <ul>
      <li><strong>Cards:</strong> templates and cloze questions can be converted, but complex layouts may be simplified. Check both sides.</li>
      <li><strong>Images:</strong> the file-import path supports embedded PNG, JPEG, WebP and GIF as still images. Remote images and SVG are not loaded; missing images may show <strong>[Image unavailable]</strong>.</li>
      <li><strong>Other media:</strong> do not assume audio, video or interactive Anki styling carries into the local-copy workflow. Check the preview and your installed version’s import notice.</li>
      <li><strong>Progress:</strong> imported cards start with FlashLock’s own review state. Keep using Anki separately if you need its existing schedule.</li>
    </ul>
    <h2>If the import fails</h2>
    <ul>
      <li><strong>Wrong file:</strong> .apk is an Android installer, not an Anki deck. Use .apkg; CSV and JSON are separate supported card-file choices.</li>
      <li><strong>File will not open:</strong> finish downloading it, save a local copy in Downloads, then choose it again. Re-export a single deck if necessary.</li>
      <li><strong>Newer export format:</strong> if Anki offers <strong>Support older Anki versions</strong>, try that export option. It changes the package format; it does not guarantee every template will work.</li>
      <li><strong>Size-limit error:</strong> split a large deck or reduce oversized images. Compressed file size is not the same as the unpacked database and media size.</li>
      <li><strong>Generic storage message:</strong> “couldn’t finish importing” alone does not establish that storage is full. If it repeats, send <a href="mailto:hello@flashlock.app">support</a> your app version, file type and exact error.</li>
    </ul>
    <p>Next: <a href={sitePath("/guides/study-before-scrolling/")}>choose the app to pair with your deck</a>. Studying medicine? See the <a href={sitePath("/medical/")}>course-deck workflow</a>.</p>
    <p>By the FlashLock team · Reviewed 30 October 2026. Labels and compatibility can vary by installed version.</p>
    <GuideCTA campaign="guide-import-anki-decks" />
  </article></GuideLayout>;
}
