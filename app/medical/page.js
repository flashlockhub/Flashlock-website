"use client";

import { androidBetaUrl } from "../../lib/download";
import { useState } from "react";
import { sitePath } from "../../lib/site";
import styles from "./medical.module.css";
import Breadcrumbs from "../Breadcrumbs";

const medicineDecks = [
  "Anatomy", "Physiology", "Biochemistry", "Cell biology & histology",
  "Genetics", "Immunology", "Microbiology", "Pharmacology",
  "Medical terminology", "Clinical history & evidence"
];

const cards = [
  {
    subject: "Physiology · Cardiovascular",
    question: "Which structure normally initiates each heartbeat?",
    answer: "The sinoatrial node",
    note: "The heart’s natural pacemaker."
  },
  {
    subject: "Anatomy · Nervous system",
    question: "Which cranial nerve carries parasympathetic fibres to the thorax and abdomen?",
    answer: "The vagus nerve (CN X)",
    note: "One more pathway ready for recall."
  },
  {
    subject: "Pharmacology · Foundations",
    question: "What does a drug’s half-life describe?",
    answer: "The time for its concentration to fall by half",
    note: "Small review. Durable vocabulary."
  }
];


const medicalFaqs = [
  ["How is this different from studying in Anki?", "FlashLock adds a short review before selected Android apps. Importing an Anki file creates a separate FlashLock deck; that file-import route does not sync your Anki reviews."],
  ["Which medical deck should I use?", "Start with material you are studying now. Create cards or import a deck, then check its answers against your course resources. The examples on this page are not a complete medical curriculum."],
  ["Does signing in back up my study progress?", "Progress is saved on your phone. Community sign-in is not a FlashLock cloud-backup service. Keep a separate copy of important study material."],
  ["How much does it cost?", "Check Google Play for current availability and pricing."],
  ["Is there an iPhone version?", "FlashLock is currently available for Android. There is no iPhone release or open email signup yet."]
];

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function Check() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export default function MedicalLandingPage() {
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const card = cards[cardIndex];

  function nextCard() {
    setCardIndex((cardIndex + 1) % cards.length);
    setRevealed(false);
  }

  function activateCard() {
    if (revealed) nextCard();
    else setRevealed(true);
  }

  function handleCardKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateCard();
    }
  }

  return (
    <div className={styles.medPage}>
      <a className={styles.skipLink} href="#medical-main">Skip to content</a>
      <div className={styles.announcement}>ANDROID BETA · STUDY YOUR COURSE CARDS BEFORE APPS</div>
      <header className={styles.header}>
        <a className={styles.brand} href={sitePath("/")}><img src={sitePath("/app/flashlock-icon.svg")} width="38" height="38" alt="" />FlashLock</a>
        <span className={styles.forMedicine}>FOR MEDICAL STUDENTS</span>
        <a className={styles.headerCta} href="#medical-download">Get the beta <Arrow /></a>
      </header>

      <main id="medical-main">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Medical students", path: "/medical/" }]} />
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>FLASHCARDS FOR THE APPS YOU ALREADY OPEN</p>
            <h1>Medical study<br/>{" "}<span>flashcards.</span></h1>
            <p className={styles.subhead}>Bring the deck you’re studying. Review a few cards before your everyday Android apps, then carry on.</p>
            <a className={styles.mainCta} href="#medical-download">Get the Android beta <Arrow /></a>
            <div className={styles.heroProof}>
              <span><Check /> Use your course material</span>
              <span><Check /> Import your Anki decks</span>
              <span><Check /> Choose your study break</span>
            </div>

          </div>

          <div className={styles.demo} id="medical-demo">
            <div className={styles.demoHalo} />
            <div className={styles.interrupt}><img src={sitePath("/app/flashlock-icon.svg")} width="34" height="34" alt="" /><div><strong>3 cards ready</strong><small>Then back to your app.</small></div><span>now</span></div>
            <article
              className={`${styles.card} ${revealed ? styles.revealed : ""}`}
              role="button"
              tabIndex="0"
              aria-label={revealed ? "Show next card" : "Reveal answer"}
              onClick={activateCard}
              onKeyDown={handleCardKeyDown}
            >
              <div className={styles.cardTop}><span>{card.subject}</span><span>{cardIndex + 1} / {cards.length}</span></div>
              <div className={styles.cardBody} aria-live="polite">
                <small>{revealed ? "ANSWER" : "QUESTION"}</small>
                <h2>{revealed ? card.answer : card.question}</h2>
                {revealed && <p>{card.note}</p>}
              </div>
              <span className={styles.cardButton} aria-hidden="true">{revealed ? "Next card" : "Tap to reveal"} <Arrow /></span>
            </article>
            <p className={styles.demoCaption}>Interactive example — tap to reveal. <span>↗</span></p>
          </div>
        </section>

        <section className={styles.outcomeStrip} aria-label="Benefits">
          <div><strong>Your course.</strong><span>Choose cards that match this week’s learning.</span></div>
          <div><strong>Your apps.</strong><span>Pair revision with an app you open daily.</span></div>
          <div><strong>Your pace.</strong><span>Start with a short break and adjust the card count.</span></div>
        </section>

        <section className={styles.mechanism}>
          <div className={styles.mechanismIntro}>
            <p className={styles.eyebrow}>REVISION THAT FITS THE DAY YOU ACTUALLY HAVE</p>
            <h2>A simple course-to-phone routine.</h2>
          </div>
          <ol>
            <li><span>1</span><div><strong>Add this week’s material.</strong><p>Create a small deck or <a href={sitePath("/guides/import-anki-decks/")}>import an Anki deck</a>. Check answers against your course resources.</p></div></li>
            <li><span>2</span><div><strong>Pair it with one daily app.</strong><p><a href={sitePath("/guides/study-before-scrolling/")}>Set up a short study break</a> before Instagram or another app you choose.</p></div></li>
            <li><span>3</span><div><strong>Recall, reveal, then carry on.</strong><p>Review the answer, finish the break and return to your app.</p></div></li>
          </ol>
        </section>

        <section className={styles.library}>
          <div className={styles.libraryCopy}>
            <p className={styles.eyebrow}>CHOOSE MATERIAL THAT FITS YOUR COURSE</p>
            <h2>Your topics.<br/>Your cards.</h2>
            <p>Use these as ideas for organising your own decks. Match the content to your lectures and learning objectives; these are example topics, not an included-library inventory.</p>
            <p><a href={sitePath("/guides/import-anki-decks/")}>Bring an existing deck →</a></p>
          </div>
          <div className={styles.deckGrid}>
            {medicineDecks.map((deck, index) => <article key={deck}><span>{["🫀","🫁","⚗️","🔬","🧬","🛡️","🦠","💊","🩺","📋"][index]}</span><strong>{deck}</strong><small>Example study topic</small></article>)}
          </div>
        </section>

        <section className={styles.control}>
          <div className={styles.phone}><img src={sitePath("/app/study.png")} width="720" height="1280" alt="Example FlashLock flashcard review screen" loading="lazy" /><p>Study-screen example; appearance varies by version.</p></div>
          <div>
            <p className={styles.eyebrow}>YOUR MATERIAL. YOUR PACE.</p>
            <h2>Fit reviews around your course.</h2>
            <ul>
              <li><Check /><span>Import your existing Anki decks.</span></li>
              <li><Check /><span>Choose session length, timing and study decks.</span></li>
              <li><Check /><span>Check and edit imported questions and answers.</span></li>
              <li><Check /><span>Keep cards and progress on your phone.</span></li>
            </ul>
            <a className={styles.secondaryCta} href="#medical-download">Get the Android beta <Arrow /></a>
          </div>
        </section>

        <section className={styles.faq} id="medical-faq">
          <div className={styles.faqIntro}>
            <p className={styles.eyebrow}>STILL THINKING</p>
            <h2>The questions med students ask.</h2>
          </div>
          <div className={styles.faqList}>
            {medicalFaqs.map(([q, a]) => (
              <details className={styles.faqItem} key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.download} id="medical-download">
          <p className={styles.eyebrow}>FLASHLOCK FOR ANDROID</p>
          <h2>Your study deck.<br/><span>Your daily apps.</span></h2>
          <a href={androidBetaUrl("medical")}>Get the beta on Google Play <Arrow /></a>
          <p>Android beta · Choose your own study material</p>
          <div className={styles.waitlist}>
            <p><strong>On iPhone?</strong><span>There is no iPhone release or open signup form yet.</span></p>
            <a className={styles.waitlistCta} href={sitePath("/guides/")}>Read the Android guides <Arrow /></a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.brand} href={sitePath("/")}><img src={sitePath("/app/flashlock-icon.svg")} width="30" height="30" alt="" />FlashLock</a>
        <p><a href={sitePath("/guides/")}>Setup and import guides</a></p>
        <span>Educational recall only—not clinical guidance.</span>
        <a href={sitePath("/privacy/")}>Privacy</a>
      </footer>
    </div>
  );
}
