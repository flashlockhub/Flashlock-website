"use client";

import { useEffect, useRef, useState } from "react";
import { sitePath } from "../lib/site";
import styles from "./home.module.css";
import FlipCard from "./FlipCard";

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
    {complete && <div className={styles.backNote}><span><Check/></span><strong>You’re back.</strong><p>Study break done. Carry on.</p></div>}
  </div>;
}
const demoCards = [
  { question: 'What is “hello” in Spanish?', answer: 'Hola' },
  { question: 'What is “thank you” in Spanish?', answer: 'Gracias' },
];
const ratings = [
  { label: 'Again', direction: 'left', color: '#c62828' },
  { label: 'Hard', direction: 'down', color: '#9a3b00' },
  { label: 'Correct', direction: 'right', color: '#1b5e20' },
  { label: 'Easy', direction: 'up', color: '#1565c0' },
];
function AppIcon({ name }) {
  const paths = {
    sound: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
    muted: 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.43.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 12 10.73 4.27 3zM12 4 9.91 6.09 12 8.18V4z',
    edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    delete: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2-10h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4z',
    home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  };
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={paths[name]}/></svg>;
}
function PhoneDemo() {
  const [scene, setScene] = useState('study');
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [muted, setMuted] = useState(true);
  const [note, setNote] = useState('');
  const cardRef = useRef(null);
  const ratingRef = useRef(null);
  const actionRef = useRef(null);
  const shouldFocus = useRef(false);
  const card = demoCards[reviewed % demoCards.length];
  const unlocked = reviewed > 0;
  const step = scene === 'app' ? 0 : scene === 'back' ? 2 : 1;
  const labels = ['Open app', 'Do a card', 'Back to app'];
  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    const target = scene !== 'study' ? actionRef.current : revealed ? ratingRef.current : unlocked ? actionRef.current : cardRef.current;
    target?.focus({ preventScroll: true });
  }, [scene, revealed, reviewed, unlocked]);
  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);
  function changeScene(next) {
    window.speechSynthesis?.cancel();
    setNote('');
    shouldFocus.current = true;
    setScene(next);
    if (next === 'app' || next === 'study') { setReviewed(0); setRevealed(false); }
  }
  function reveal() {
    if (revealed) return;
    shouldFocus.current = true;
    setNote('');
    setRevealed(true);
  }
  function rate() {
    if (!revealed) return;
    window.speechSynthesis?.cancel();
    shouldFocus.current = true;
    setNote('');
    setReviewed(value => value + 1);
    setRevealed(false);
    if (!muted) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        try {
          const context = new AudioContext();
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          oscillator.connect(gain); gain.connect(context.destination);
          oscillator.frequency.value = 660;
          gain.gain.setValueAtTime(.035, context.currentTime);
          gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .1);
          oscillator.start(); oscillator.stop(context.currentTime + .12);
          oscillator.onended = () => { void context.close(); };
          if (context.state === 'suspended') void context.resume().catch(() => context.close());
        } catch { /* Feedback is optional; reviewing still works. */ }
      }
    }
  }
  function speak() {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      setNote('Read aloud is not available in this browser.'); return;
    }
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(revealed ? card.answer : card.question);
    speech.lang = revealed ? 'es-ES' : 'en-AU';
    speech.rate = .85;
    speech.onerror = event => { if (!['canceled', 'interrupted'].includes(event.error)) setNote('Read aloud is not available in this browser.'); };
    setNote('');
    window.speechSynthesis.speak(speech);
  }
  function turnCard(next) {
    window.speechSynthesis?.cancel();
    setNote('');
    shouldFocus.current = true;
    setRevealed(next);
  }
  return <div className={styles.demo} id="demo" role="group" aria-label="Interactive example of a FlashLock study break" data-demo-stage={scene === 'study' ? revealed ? 'answer' : unlocked ? 'ready' : 'card' : scene}>
    <div className={styles.demoHeading}><span className={styles.liveDot}/><span>TRY A STUDY BREAK</span></div>
    <ol className={styles.demoSteps} aria-label="Demo progress">{labels.map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} className={step === index ? styles.activeStep : ''}><span>{index < step ? <Check/> : index + 1}</span>{label}</li>)}</ol>
    <div className={styles.phoneStage}>
      <div className={styles.orbit} aria-hidden="true"/>
      <div className={`${styles.phone} ${scene === 'study' ? styles.studyPhone : ''}`}>
        <div className={styles.phoneStatus} aria-hidden="true"><span>9:41</span><i/><span>▴ ▰</span></div>
        <div className={styles.phoneBody}>
          {scene === 'study' ? <div className={styles.nativeStudy} data-testid="study-screen">
            <span className={styles.srOnly} aria-live="polite" aria-atomic="true">{revealed ? `${card.question} Answer: ${card.answer}` : ""}</span>
            <div className={styles.nativeHeader}>
              {unlocked ? <button className={styles.nativeHome} onClick={() => changeScene('app')} aria-label="Leave the study demo"><AppIcon name="home"/><span>Home</span></button> : <span className={styles.homeSpace}/>}
              <span className={styles.sessionTitle}>{unlocked ? <>Spanish ·<br/>Keep learning</> : <>🔒 0/1 —<br/>Spanish</>}</span>
              <button className={`${styles.soundButton} ${muted ? styles.soundMuted : ''}`} aria-label={muted ? 'Unmute feedback sounds' : 'Mute feedback sounds'} aria-pressed={muted} onClick={() => setMuted(value => !value)}><AppIcon name={muted ? 'muted' : 'sound'}/></button>
            </div>
            <div className={styles.nativeProgress} role="progressbar" aria-label="Cards reviewed to open your app" aria-valuemin={0} aria-valuemax={1} aria-valuenow={Math.min(reviewed, 1)}><span style={{ width: unlocked ? '100%' : '0%' }}/></div>
            <div className={styles.nativeCount} aria-live="polite">{unlocked ? `${reviewed} reviewed · ready to open` : '0 / 1'}</div>
            <FlipCard revealed={revealed} onRevealChange={turnCard} className={`${styles.nativeCard} ${revealed ? styles.nativeAnswer : ''}`} data-testid="study-card"
              front={<>
                <button ref={cardRef} className={styles.cardTap} aria-label="Reveal answer" onClick={reveal}/>
                <div className={styles.nativeCardTop}><span>Question</span><div className={styles.cardTools} data-card-tool="true" aria-hidden="true"><span className={styles.editTool}><AppIcon name="edit"/></span><span><AppIcon name="delete"/></span></div></div>
                <div className={styles.nativeContent}>
                  <button className={styles.cardSpeaker} data-card-tool="true" aria-label="Listen to question" onClick={speak}><AppIcon name="sound"/></button>
                  <p className={styles.nativeQuestion}>{card.question}</p>
                </div>
              </>}
              back={<>
                <div className={styles.nativeCardTop}><span>Answer</span><div className={styles.cardTools} data-card-tool="true" aria-hidden="true"><span className={styles.editTool}><AppIcon name="edit"/></span><span><AppIcon name="delete"/></span></div></div>
                <div className={styles.nativeContent}>
                  <button className={styles.cardSpeaker} data-card-tool="true" aria-label="Listen to answer" onClick={speak}><AppIcon name="sound"/></button>
                  <p className={styles.nativeQuestion}>{card.question}</p>
                  <span className={styles.answerDivider}/><h2 className={styles.nativeAnswerText}>{card.answer}</h2>
                </div>
              </>}
            />
            {note ? <p className={styles.nativeHint} role="status">{note}</p> : revealed ? <button className={styles.nativeHelp} onClick={() => setNote('Drag either way to turn the card. Choose a rating when you are ready.')}>Help</button> : <p className={styles.nativeHint}>Tap or drag the card to reveal the answer</p>}
            {revealed && <div className={styles.nativeRatings} aria-label="Rate your answer">{ratings.map((rating, index) => <div key={rating.label}><button ref={index === 0 ? ratingRef : null} style={{ backgroundColor: rating.color }} onClick={rate}>{rating.label}</button><span className={styles[`arrow${rating.direction}`]} aria-hidden="true"><Arrow/></span></div>)}</div>}
            {unlocked && <button ref={actionRef} className={styles.openApp} onClick={() => changeScene('back')}>Open app</button>}
          </div> : <div className={styles.feedScene}>
            <Feed complete={scene === 'back'}/>
            <span className={styles.srOnly} role="status">{scene === 'back' ? 'Study break finished. You are back in your app.' : 'Open your chosen app to start a study break.'}</span>
            <button ref={actionRef} className={styles.demoAction} onClick={() => changeScene(scene === 'back' ? 'app' : 'study')}>{scene === 'back' ? 'Try again' : 'Open my app'}<Arrow/></button>
          </div>}
          <span className={styles.phoneHome} aria-hidden="true"/>
        </div>
      </div>
    </div>
    <div className={styles.demoFooter}><span>Interactive preview · 1-card break</span><button onClick={() => changeScene('app')} aria-label="Start the demo over">↻ <span>Start over</span></button></div>
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
          <h1 id="hero-title">Get Better Grades<br/><span>Without Giving Up Your Favorite Apps</span></h1>
          <p className={styles.subheader}>FlashLock adds short flashcard breaks to the apps you love. Do a few cards, then get back to your app.</p>
          <a className={styles.cta} href={PLAY_TESTING_URL}><PlayIcon/><span>Get FlashLock for Android</span><Arrow/></a>
          <p className={styles.ctaNote}>Android beta <span>·</span> Google Play</p>
        </div>
        <PhoneDemo/>
      </section>
      <section className={styles.control} aria-labelledby="control-title">
        <div className={styles.controlIntro}><h2 id="control-title">Your apps.<br/><span>Your rules.</span></h2></div>
        <div className={styles.choices}>
          <div><span className={styles.choiceNumber}>01</span><h3>Pick your apps.</h3><div className={styles.appTiles}><span className={styles.tiktok}><img src={sitePath("/brands/tiktok.svg")} width="24" height="24" alt="TikTok"/></span><span className={styles.youtube}><img src={sitePath("/brands/youtube.svg")} width="26" height="24" alt="YouTube"/></span><span className={styles.instagram}><img src={sitePath("/brands/instagram.svg")} width="24" height="24" alt="Instagram"/></span></div></div>
          <div><span className={styles.choiceNumber}>02</span><h3>Choose your cards.</h3><p>Your own or ready-made.</p><div className={styles.miniCards} aria-hidden="true"><i/><i/><i>Hola.</i></div></div>
          <div><span className={styles.choiceNumber}>03</span><h3>Set your breaks.</h3><div className={styles.miniTimer} aria-hidden="true"><svg viewBox="0 0 54 54"><circle cx="27" cy="27" r="22" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M27 13v15l10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg><span>Your pace.</span></div></div>
        </div>
      </section>
      <section className={styles.questions} id="questions" aria-labelledby="questions-title"><h2 id="questions-title">Quick questions.</h2><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    </main>
    <footer className={styles.footer}><a className={styles.footerBrand} href={sitePath("/")}>FlashLock<span>✦</span></a><p>A few cards. Then carry on.</p><a href={sitePath("/privacy/")}>Privacy</a><span>© {new Date().getFullYear()} FlashLock</span></footer>
  </div>;
}
