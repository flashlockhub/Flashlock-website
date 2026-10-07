"use client";

import { useState } from "react";
import { sitePath } from "../../lib/site";
import styles from "./medical.module.css";

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

const PLAY_TESTING_URL = "https://play.google.com/apps/testing/com.flashlock.app";

const medicalFaqs = [
  ["Why not just use Anki?", "Anki is free and its spacing is great — but it’s the best flashcard app most students never open. FlashLock doesn’t ask you to visit a new app out of habit. It comes to you, inside the apps you’re already opening."],
  ["Is it really free?", "Free during the beta — and the first 500 students keep it free forever. The 1,000-card first-year library is included with every account."],
  ["Can I import my own Anki decks?", "Yes. Import an Anki deck from your device, preview the cards and add it as a local FlashLock deck. You can edit it without changing the original file."],
  ["Where do my cards live?", "Your card text, decks and progress stay on your device. Optional usage analytics are off by default and never include card text or deck names."],
  ["Is there an iPhone version?", "In progress. Join the iPhone waitlist at the bottom of this page and we’ll email you the moment it ships."]
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
      <div className={styles.announcement}>ANDROID BETA · FREE FOR THE FIRST 500 STUDENTS · 1,000 MED CARDS INCLUDED</div>
      <header className={styles.header}>
        <a className={styles.brand} href={sitePath("/")}><img src={sitePath("/app/flashlock-icon.svg")} width="38" height="38" alt="" />FlashLock</a>
        <span className={styles.forMedicine}>FOR MEDICAL STUDENTS</span>
        <a className={styles.headerCta} href="#medical-download">Get the beta <Arrow /></a>
      </header>

      <main id="medical-main">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>FLASHCARDS FOR THE APPS YOU ALREADY OPEN</p>
            <h1>You don’t need more<br/>{" "}<span>flashcards.</span></h1>
            <p className={styles.subhead}>You need to do the ones you have. FlashLock pops up where you’re already scrolling — 3 cards, 45 seconds, then you’re back. Anki is the best flashcard app you never open. FlashLock comes to you.</p>
            <a className={styles.mainCta} href="#medical-download">Get the beta — free <Arrow /></a>
            <div className={styles.heroProof}>
              <span><Check /> 1,000 med cards included</span>
              <span><Check /> Import your Anki decks</span>
              <span><Check /> Free for the first 500 students</span>
            </div>
            <blockquote className={styles.testimonial}><p>“Genuinely the best app blocker I’ve tried.”</p><cite>— early beta tester</cite></blockquote>
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
            <p className={styles.demoCaption}>Try one. Feel the difference. <span>↗</span></p>
          </div>
        </section>

        <section className={styles.outcomeStrip} aria-label="Benefits">
          <div><strong>Recall it on exam day.</strong><span>Short reviews keep important concepts in reach.</span></div>
          <div><strong>Find gaps sooner.</strong><span>Know what needs another pass before the stakes rise.</span></div>
          <div><strong>Keep your momentum.</strong><span>Study in the small windows a full timetable leaves behind.</span></div>
        </section>

        <section className={styles.mechanism}>
          <div className={styles.mechanismIntro}>
            <p className={styles.eyebrow}>REVISION THAT FITS THE DAY YOU ACTUALLY HAVE</p>
            <h2>Every scroll can move you forward.</h2>
          </div>
          <ol>
            <li><span>1</span><div><strong>Open the app you were going to open anyway.</strong><p>FlashLock appears on the apps and websites you choose.</p></div></li>
            <li><span>2</span><div><strong>Retrieve a few medical concepts.</strong><p>Use the included foundations or bring your own Anki decks.</p></div></li>
            <li><span>3</span><div><strong>Carry on—with one less thing to forget.</strong><p>Finish the short session and return to your app.</p></div></li>
          </ol>
        </section>

        <section className={styles.library}>
          <div className={styles.libraryCopy}>
            <p className={styles.eyebrow}>START WITH THE FOUNDATIONS</p>
            <h2>First year.<br/>Already organised.</h2>
            <p>Ten first-year decks — part of the full 136-deck library — cover the language and core sciences that recur across early medical curricula.</p>
            <div className={styles.libraryTotal}><strong>1,000</strong><span>medical flashcards<br/>ready to preview</span></div>
          </div>
          <div className={styles.deckGrid}>
            {medicineDecks.map((deck, index) => <article key={deck}><span>{["🫀","🫁","⚗️","🔬","🧬","🛡️","🦠","💊","🩺","📋"][index]}</span><strong>{deck}</strong><small>100 cards</small></article>)}
          </div>
        </section>

        <section className={styles.control}>
          <div className={styles.phone}><img src={sitePath("/app/study.png")} width="720" height="1280" alt="FlashLock study screen" loading="lazy" /></div>
          <div>
            <p className={styles.eyebrow}>YOUR MATERIAL. YOUR PACE.</p>
            <h2>Build recall around your course.</h2>
            <ul>
              <li><Check /><span>Import your existing Anki decks.</span></li>
              <li><Check /><span>Choose session length, timing and study decks.</span></li>
              <li><Check /><span>Edit cards and track reviews, accuracy and mastery.</span></li>
              <li><Check /><span>Keep cards and progress on your phone.</span></li>
            </ul>
            <a className={styles.secondaryCta} href="#medical-download">Get the beta — free <Arrow /></a>
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
          <h2>Make every spare scroll<br/><span>part of becoming a doctor.</span></h2>
          <a href={PLAY_TESTING_URL}>Get the beta on Google Play <Arrow /></a>
          <p>Free for the first 500 students · Your cards stay on your device</p>
          <div className={styles.waitlist}>
            <p><strong>iPhone version coming soon.</strong><span>iOS build is in progress — grab a spot in line.</span></p>
            <a className={styles.waitlistCta} href="mailto:hello@flashlock.app?subject=iPhone%20waitlist">Join the iPhone waitlist <Arrow /></a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.brand} href={sitePath("/")}><img src={sitePath("/app/flashlock-icon.svg")} width="30" height="30" alt="" />FlashLock</a>
        <p>Make scrolling productive.</p>
        <span>Educational recall only—not clinical guidance.</span>
        <a href={sitePath("/privacy/")}>Privacy</a>
      </footer>
    </div>
  );
}
