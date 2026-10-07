"use client";

import { useRef, useState } from "react";
import { sitePath } from "../lib/site";
import styles from "./home.module.css";

const PLAY_TESTING_URL = "https://play.google.com/apps/testing/com.flashlock.app";
function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function Check() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function PlayIcon() {
  return <svg viewBox="0 0 24 26" fill="none" aria-hidden="true"><path d="M3 2v22l18-11L3 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="m3 2 12 15M3 24 15 9" stroke="currentColor" strokeWidth="1.4"/></svg>;
}
function Feed({ complete = false }) {
  return <div className={styles.feed} aria-hidden="true">
    <div className={styles.feedHeader}><strong>Your feed</strong><span>✦</span></div>
    <div className={styles.feedByline}><i/><span>out & about<small>A little fresh air</small></span><b>•••</b></div>
    <div className={styles.landscape}><span className={styles.sun}/><span className={styles.hillBack}/><span className={styles.hillFront}/><span className={styles.trail}/><span className={styles.landscapeLabel}>THE SLOW WAY HOME</span></div>
    <div className={styles.feedReactions}><span>♡ &nbsp; ◯ &nbsp; ↗</span><span>⌑</span></div>
    <div className={styles.feedLines}><i/><i/></div>
    <div className={styles.feedNav}><span>⌂</span><span>⌕</span><span>⊞</span><span>○</span></div>
    {complete && <div className={styles.backNote}><span><Check/></span><strong>You’re back.</strong><p>One card done. Carry on.</p></div>}
  </div>;
}
function PhoneDemo() {
  const [stage, setStage] = useState("card");
  const actionRef = useRef(null);
  const step = stage === "app" ? 0 : stage === "back" ? 2 : 1;
  const labels = ["Open app", "Do a card", "Back to app"];
  const nextStage = { app: "card", card: "answer", answer: "back", back: "app" };
  const actions = { app: "Open my app", card: "Reveal answer", answer: "Back to my app", back: "Try again" };
  function restart() { setStage("app"); actionRef.current?.focus(); }
  return <div className={styles.demo} id="demo" role="group" aria-label="Interactive example of a FlashLock study break">
    <div className={styles.demoHeading}><span className={styles.liveDot}/><span>TRY A STUDY BREAK</span></div>
    <ol className={styles.demoSteps} aria-label="Demo progress">{labels.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className={step === index ? styles.activeStep : ""}><span>{index < step ? <Check/> : index + 1}</span>{label}</li>)}</ol>
    <div className={styles.phoneStage}>
      <div className={styles.orbit} aria-hidden="true"/>
      <div className={styles.phone}>
        <div className={styles.phoneStatus} aria-hidden="true"><span>9:41</span><i/><span>▴ ▰</span></div>
        <div className={styles.phoneBody}>
          <div className={styles.scene} aria-live="polite" aria-atomic="true">
            {stage === "app" || stage === "back" ? <><Feed complete={stage === "back"}/><span className={styles.srOnly}>{stage === "back" ? "Study break finished. You are back in your app." : "Open your chosen app to start a study break."}</span></> : <div className={styles.study}>
              <div className={styles.studyBrand}><img src={sitePath("/app/flashlock-icon.svg")} alt="" width="23" height="23"/><strong>FlashLock</strong><span>1-card demo</span></div>
              <div className={styles.studyProgress}><span/></div>
              <div className={`${styles.flashcard} ${stage === "answer" ? styles.revealed : ""}`}>
                <div className={styles.cardTop}><span>SPANISH</span><span>01 / 01</span></div>
                <div className={styles.cardContent}>{stage === "answer" ? <><span className={styles.cardSpark}>✦</span><h2>Hola</h2><p>Hello. One word at a time.</p></> : <><span className={styles.cardSpark}>✦</span><h2>What is “hello”<br/>in Spanish?</h2><p>Give it a guess.</p></>}</div>
              </div>
            </div>}
          </div>
          <button ref={actionRef} className={styles.demoAction} onClick={() => setStage(nextStage[stage])}>{actions[stage]}<Arrow/></button>
          <span className={styles.phoneHome} aria-hidden="true"/>
        </div>
      </div>
    </div>
    <div className={styles.demoFooter}><span>Interactive demo · Your cards, your pace</span><button onClick={restart} aria-label="Start the demo over">↻ <span>Start over</span></button></div>
    <noscript><p>Open an app → do a few cards → back to your app. Turn on JavaScript to try the demo.</p></noscript>
  </div>;
}
const faqs = [
  ["Can I use my own cards?", "Yes. Make your own, import Anki cards, or pick a ready-made deck."],
  ["Do I choose when breaks start?", "Yes. Pick the apps, set when breaks start, and choose how many cards to do."],
  ["Does it work on my phone?", "FlashLock is for Android 8.0 and up. Join the beta on Google Play, then install the app. There’s no iPhone app yet."]
];
export default function Home() {
  return <div className={styles.page}>
    <a className={styles.skip} href="#main">Skip to content</a>
    <header className={styles.header}>
      <a className={styles.brand} href={sitePath("/")} aria-label="FlashLock home"><img src={sitePath("/app/flashlock-icon.svg")} width="35" height="35" alt=""/>FlashLock<span className={styles.beta}>BETA</span></a>
      <nav aria-label="Main navigation"><a href="#demo">Try it</a><a href="#questions">Quick questions <span aria-hidden="true">↗</span></a></nav>
    </header>
    <main id="main">
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <h1 id="hero-title">Learn something.<br/><span>Then keep<br className={styles.desktopBreak}/> scrolling.</span></h1>
          <p className={styles.subheader}>FlashLock adds short flashcard breaks to the apps you pick. Do a few cards, then get back to your app.</p>
          <a className={styles.cta} href={PLAY_TESTING_URL}><PlayIcon/><span>Get FlashLock for Android</span><Arrow/></a>
          <p className={styles.ctaNote}>Android beta <span>·</span> Google Play</p>
        </div>
        <PhoneDemo/>
      </section>
      <section className={styles.control} aria-labelledby="control-title">
        <div className={styles.controlIntro}><h2 id="control-title">Your apps.<br/><span>Your rules.</span></h2></div>
        <div className={styles.choices}>
          <div><span className={styles.choiceNumber}>01</span><h3>Pick your apps.</h3><div className={styles.appTiles} aria-hidden="true"><span>▶</span><span>◎</span><span>♪</span><span>+</span></div></div>
          <div><span className={styles.choiceNumber}>02</span><h3>Choose your cards.</h3><p>Your own or ready-made.</p><div className={styles.miniCards} aria-hidden="true"><i/><i/><i>Hola.</i></div></div>
          <div><span className={styles.choiceNumber}>03</span><h3>Set your breaks.</h3><div className={styles.miniTimer} aria-hidden="true"><svg viewBox="0 0 54 54"><circle cx="27" cy="27" r="22" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M27 13v15l10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg><span>Your pace.</span></div></div>
        </div>
      </section>
      <section className={styles.questions} id="questions" aria-labelledby="questions-title"><h2 id="questions-title">Quick questions.</h2><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    </main>
    <footer className={styles.footer}><a className={styles.footerBrand} href={sitePath("/")}>FlashLock<span>✦</span></a><p>A few cards. Then carry on.</p><a href={sitePath("/privacy/")}>Privacy</a><span>© {new Date().getFullYear()} FlashLock</span></footer>
  </div>;
}
