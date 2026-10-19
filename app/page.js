"use client";

import { useEffect, useRef, useState } from "react";
import { sitePath } from "../lib/site";
import styles from "./home.module.css";
import FlipCard from "./FlipCard";

const PLAY_TESTING_URL = "https://play.google.com/apps/testing/com.flashlock.app";
const SIGNUPS_ENABLED = false; // Enable after public HTTPS signup verification.
function IosWaitlist() {
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  async function join(event) {
    event.preventDefault();
    if (!SIGNUPS_ENABLED || state === 'saving' || state === 'saved') return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setState('saving'); setError('');
    try {
      const response = await fetch('https://sasuclaw.tail274696.ts.net:8443/signup', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: fields.get('email'), website: fields.get('website')}),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('save failed');
      setState('saved'); form.reset();
    } catch {
      setState('idle');
      setError('We couldn’t save your email. Please try again.');
    }
  }
  return <div className={styles.waitlistArea}>
    <h2 className={styles.waitlistHeading}>iOS waitlist</h2>
    <form id="ios-signup" className={styles.emailSignup} onSubmit={join}>
      {state === 'saved' ? <p role="status">You’re on the list. We’ll email you when FlashLock is ready for iOS.</p> : <>
        <label htmlFor="ios-email">Email address</label>
        <div className={styles.emailRow}>
          <input id="ios-email" type="email" name="email" required maxLength={254} autoComplete="email" inputMode="email" placeholder="you@example.com" aria-describedby="ios-signup-note" disabled={state === 'saving'} />
          <button type="submit" disabled={!SIGNUPS_ENABLED || state === 'saving'}>{state === 'saving' ? 'Saving…' : 'Notify me'}</button>
        </div>
        <div className={styles.signupTrap} aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <p id="ios-signup-note">{SIGNUPS_ENABLED ? 'Only iOS launch updates.' : 'Signups aren’t open yet. Please check back soon.'} <a href={sitePath('/privacy/')}>Privacy</a></p>
        {error && <p role="alert">{error}</p>}
      </>}
    </form>
  </div>;
}

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function Check() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function PlayIcon() {
  return <svg viewBox="0 0 24 26" fill="none" aria-hidden="true"><path d="M3 2v22l18-11L3 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="m3 2 12 15M3 24 15 9" stroke="currentColor" strokeWidth="1.4"/></svg>;
}
// Decorative local preview: no login or external Instagram navigation.
function SocialIcon({ name }) {
 const paths = {
 heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
 comment:'M21 11.5a9 9 0 1 1-4.5-7.8A9 9 0 0 1 21 11.5ZM6 19l-3 2 1-5',
 share:'m22 2-7 20-4-9L2 9 22 2ZM11 13 22 2',
 save:'M5 3h14v19l-7-5-7 5V3Z',
 home:'m3 10 9-8 9 8v11h-6v-7H9v7H3V10Z',
 search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
 plus:'M12 7v10M7 12h10M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z',
 reels:'M3 8h18M6 2l4 6m5-6 4 6M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 10 6 4-6 4v-8Z',
 camera:'M3 6h5l2-3h4l2 3h5v15H3V6Zm13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
 };
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]}/></svg>;
}
function InstagramReel() {
 return <div className={styles.mockInstagram} data-testid="instagram-celebration" aria-label="Instagram Reels preview, fictional demo account">
  <div className={styles.instagramHeader}><strong>Instagram</strong><span>PREVIEW</span><SocialIcon name="heart"/></div>
  <div className={styles.celebrationReel}>
   <div className={styles.reelHeader} aria-hidden="true"><b>Reels <span>⌄</span></b><SocialIcon name="camera"/></div>
   <div className={styles.fireworks} aria-hidden="true">{[0,1,2,3].map(n => <span key={n} className={styles.firework}>{Array.from({length:16},(_,i)=><i key={i} style={{'--ray':i}}/>)}</span>)}</div>
   <div className={styles.reelMessage}><strong>You just studied before scrolling!</strong></div>
   <div className={styles.reelActions} aria-hidden="true"><span><SocialIcon name="heart"/><small>1,284</small></span><span><SocialIcon name="comment"/><small>24</small></span><span><SocialIcon name="share"/><small>86</small></span><span><SocialIcon name="save"/></span><b>···</b></div>
   <div className={styles.reelCaption}><div><img src={sitePath('/demo/avatar.svg')} width="28" height="28" alt=""/><b>flashlock.app</b><span>Follow</span></div><p>One small win before the scroll. ✨</p><small>♫ Original audio · flashlock.app</small></div>
  </div>
  <div className={styles.instagramNav} aria-hidden="true"><SocialIcon name="home"/><SocialIcon name="search"/><SocialIcon name="plus"/><SocialIcon name="reels"/><img src={sitePath('/demo/avatar.svg')} width="22" height="22" alt=""/></div>
 </div>;
}
const demoCards = [
  { category: 'FlashLock', question: 'Get better grades.', answer: 'Without giving up your favourite apps.', repeatQuestion: false, promo: true },
  { category: 'Spanish', question: 'Learn Spanish.', answer: 'While scrolling Instagram.', repeatQuestion: false, promo: true },
  { category: 'Everyday life', question: 'Memorise Mum’s birthday.', answer: 'So you never forget it again.', repeatQuestion: false, promo: true },
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
  const [scene, setScene] = useState('app');
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [note, setNote] = useState('');
  const cardRef = useRef(null);
  const ratingRef = useRef(null);
  const actionRef = useRef(null);
  const shouldFocus = useRef(false);
  const card = demoCards[Math.min(cardIndex, demoCards.length - 1)];
  const unlocked = cardIndex > 0;
  const step = scene === 'app' ? 0 : scene === 'complete' ? 2 : 1;
  const labels = ['Open app', 'Do a card', 'Back to app'];
  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    const target = scene !== 'study' ? actionRef.current : revealed ? ratingRef.current : cardRef.current;
    target?.focus({ preventScroll: true });
  }, [scene, revealed, reviewed, unlocked, cardIndex]);
  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);
  function changeScene(next) {
    window.speechSynthesis?.cancel();
    setNote('');
    shouldFocus.current = true;
    setScene(next);
    if (next === 'app' || next === 'study') { setReviewed(0); setCardIndex(0); setRevealed(false); }
  }
  function reveal() {
    if (revealed) return;
    window.speechSynthesis?.cancel();
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
    advanceCard();
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
    speech.lang = revealed ? card.answerLang || 'en-AU' : 'en-AU';
    speech.rate = .85;
    speech.onerror = event => { if (!['canceled', 'interrupted'].includes(event.error)) setNote('Read aloud is not available in this browser.'); };
    setNote('');
    window.speechSynthesis.speak(speech);
  }
  function skipCard() {
    if (!revealed) return;
    window.speechSynthesis?.cancel();
    setNote(''); shouldFocus.current = true;
    advanceCard();
  }
  function advanceCard() {
    if (!revealed) return;
    setRevealed(false);
    if (cardIndex >= demoCards.length - 1) {
      setCardIndex(demoCards.length);
      setScene('complete');
    } else setCardIndex(value => value + 1);
  }
  return <div className={styles.demo} id="demo" role="group" aria-label="Interactive example of a FlashLock study break" data-demo-stage={scene === 'study' ? revealed ? 'answer' : unlocked ? 'ready' : 'card' : scene}>
    <h2 className={styles.demoHeading}>{scene === 'app' ? 'Try a learning break.' : scene === 'complete' ? 'Now enjoy your scroll.' : 'Tap the card. Try FlashLock.'}</h2>
    <p className={styles.demoInstructions}>{scene === 'app' ? 'Tap Instagram to try it' : scene === 'complete' ? 'Your learning break is complete.' : revealed ? 'Swipe right to move on →' : 'Tap to turn over'}</p>
    <ol className={styles.demoSteps} aria-label="Demo progress">{labels.map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} className={step === index ? styles.activeStep : ''}><span>{index < step ? <Check/> : index + 1}</span>{label}</li>)}</ol>
    <div className={styles.phoneStage}>
      <div className={styles.orbit} aria-hidden="true"/>
      <div className={`${styles.phone} ${scene === 'study' ? styles.studyPhone : scene === 'complete' ? styles.reelPhone : styles.launcherPhone}`}>
        {scene === 'complete' && <button className={styles.phoneReplay} aria-label="Restart demo to Android home" onClick={event => { event.preventDefault(); event.stopPropagation(); changeScene('app'); }}><span className={styles.srOnly}>Tap anywhere on the phone to try again</span></button>}
        <div className={styles.phoneStatus} aria-hidden="true"><span>9:41</span><i/><span className={styles.statusIcons}><svg viewBox="0 0 42 14"><path d="M1 4Q7-1 13 4L7 11Z" fill="currentColor"/><path d="M16 11 25 2v9Z" fill="currentColor"/><rect x="29" y="3" width="10" height="8" rx="1" fill="none" stroke="currentColor"/><path d="M31 5h6v4h-6zM40 5v4" stroke="currentColor"/></svg></span></div>
        <div className={styles.phoneBody}>
          {scene === 'complete' ? <div className={styles.demoComplete} data-testid="demo-complete">
            <InstagramReel/>
          </div> : scene === 'study' ? <div className={styles.nativeStudy} data-testid="study-screen">
            <span className={styles.srOnly} aria-live="polite" aria-atomic="true">{revealed ? `${card.question} Answer: ${card.answer}` : ""}</span>
            <div className={styles.nativeHeader}>
              {unlocked ? <button className={styles.nativeHome} onClick={() => changeScene('app')} aria-label="Leave the study demo"><AppIcon name="home"/><span>Home</span></button> : <span className={styles.homeSpace}/>}
              <span className={styles.sessionTitle}>{unlocked ? <>{card.category} ·<br/>Keep learning</> : <>🔒 0/{demoCards.length} —<br/>{card.category}</>}</span>
              <button className={`${styles.soundButton} ${muted ? styles.soundMuted : ''}`} aria-label={muted ? 'Unmute feedback sounds' : 'Mute feedback sounds'} aria-pressed={muted} onClick={() => setMuted(value => !value)}><AppIcon name={muted ? 'muted' : 'sound'}/></button>
            </div>
            <div className={styles.nativeProgress} role="progressbar" aria-label="Demo cards completed" aria-valuemin={0} aria-valuemax={demoCards.length} aria-valuenow={cardIndex}><span style={{ width: `${cardIndex / demoCards.length * 100}%` }}/></div>
            <div className={styles.nativeCount} aria-live="polite">Card {Math.min(cardIndex + 1, demoCards.length)} of {demoCards.length}</div>
            <div className={styles.cardStage}>
            <FlipCard key={cardIndex} onSwipe={skipCard} overlay={<div className={styles.nativeRatings} data-card-tool="true" aria-label="Rate your answer" data-disabled={!revealed}>{ratings.map((rating, index) => <div key={rating.label}><button ref={index === 0 ? ratingRef : null} style={{ backgroundColor: revealed ? rating.color : undefined }} disabled={!revealed} onClick={rate}>{rating.label}</button><span className={styles[`arrow${rating.direction}`]} aria-hidden="true"><Arrow/></span></div>)}</div>} revealed={revealed} className={`${styles.nativeCard} ${revealed ? styles.nativeAnswer : ''} ${card.promo ? styles.promoCard : ''}`} data-testid="study-card"
              front={<>
                <button ref={cardRef} className={styles.cardTap} aria-label="Reveal answer" aria-describedby="card-tap-hint" onClick={reveal}/>
                <div className={styles.nativeCardTop}><span>Question</span><div className={styles.cardTools} data-card-tool="true" aria-hidden="true"><span className={styles.editTool}><AppIcon name="edit"/></span><span><AppIcon name="delete"/></span></div></div>
                <div className={styles.nativeContent}>
                  <button className={styles.cardSpeaker} data-card-tool="true" aria-label="Listen to question" onClick={speak}><AppIcon name="sound"/></button>
                  <p className={styles.nativeQuestion}>{card.question}</p>
                  <div className={styles.cardPrompts}><span id="card-tap-hint" className={styles.tapPrompt}>Tap to turn over ↻</span></div>
                </div>
              </>}
              back={<>
                <div className={styles.nativeCardTop}><span>Answer</span><div className={styles.cardTools} data-card-tool="true" aria-hidden="true"><span className={styles.editTool}><AppIcon name="edit"/></span><span><AppIcon name="delete"/></span></div></div>
                <div className={styles.nativeContent}>
                  <button className={styles.cardSpeaker} data-card-tool="true" aria-label="Listen to answer" onClick={speak}><AppIcon name="sound"/></button>
                  <>{card.repeatQuestion !== false && <><p className={styles.nativeQuestion}>{card.question}</p><span className={styles.answerDivider}/></>}</><h2 className={styles.nativeAnswerText}>{card.answer}</h2>
                </div>
              </>}
            />

            </div>
            <div className={styles.helpSlot}>
              <button className={styles.nativeHelp} aria-expanded={Boolean(note)} aria-controls="demo-help" onClick={() => setNote(note ? '' : 'Tap to turn the card over. After revealing the answer, swipe right to move on or choose a rating. Keyboard: Enter or Space reveals the front; arrow keys move on after revealing. After three cards, you can download FlashLock.')}>Click here for help</button>
              {note && <p id="demo-help" className={styles.helpPanel} role="status">{note}</p>}
            </div>


          </div> : <div className={styles.homeScreen} data-testid="demo-home">
            <div className={styles.androidDate}>Monday, 19 Oct <span>☀ 22°</span></div>
            <div className={styles.androidClock} aria-label="9:41"><span>09</span><span>41</span></div>
            <button ref={actionRef} className={styles.instagramLaunch} aria-label="Open Instagram demo" aria-describedby="demo-home-note" onClick={() => changeScene('study')}>
              <img src={sitePath('/demo/instagram-app.svg')} alt="" width="58" height="58"/>
              <span>Instagram</span>
              <span className={styles.tryArrow} aria-hidden="true"><span>Try it out</span><svg viewBox="0 0 110 65" fill="none"><path d="M101 9C68 3 67 47 10 47M23 35 9 47l16 9"/></svg></span>
            </button>
            <span className={styles.launcherPageDot} aria-hidden="true"/>
          </div>}
          <span className={styles.phoneHome} aria-hidden="true"/>
        </div>
      </div>
    </div>
    {scene === 'complete' && <div className={styles.completionCta}>
      <h2><span>Stay consistent</span><span>without even trying</span></h2>
      <p>Make your next scroll count</p>
      <a ref={actionRef} className={styles.openApp} href={PLAY_TESTING_URL}>Download for android</a>
      <button className={styles.restartDemo} onClick={() => changeScene('app')}>Try the cards again</button>
    </div>}
    <p id="demo-home-note" className={styles.previewNote}>Interactive preview · not connected to Instagram</p>
    <div className={styles.demoFooter}><span>Interactive preview · {demoCards.length} cards</span><button onClick={() => changeScene('app')} aria-label="Start the demo over">↻ <span>Start over</span></button></div>
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
        <div className={styles.heroIntro}>
          <h1 id="hero-title">A learning break before you scroll</h1>
          <a className={styles.cta} href={PLAY_TESTING_URL}><PlayIcon/><span>Get Flashlock for Android</span><Arrow/></a>
        </div>
        <PhoneDemo/>
        <div className={styles.heroText}>
          <p className={styles.subheader}>FlashLock adds short flashcard breaks to the apps you love. Do a few cards, then get back to your app.</p>
          <a className={styles.cta} href={PLAY_TESTING_URL}><PlayIcon/><span>Get FlashLock for Android</span><Arrow/></a>
          <IosWaitlist/>
          <p className={styles.ctaNote}>Android beta <span>·</span> Google Play</p>
        </div>
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
