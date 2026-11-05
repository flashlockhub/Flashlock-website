import { absoluteSiteUrl, sitePath } from "../../lib/site";
import { androidBetaUrl } from "../../lib/download";
import styles from "./unsw.module.css";

const claimSubject = "Claim my UNSW FlashLock offer";
const claimBody = `Hi FlashLock,

Please record my UNSW Founding Student Offer.

Name:
UNSW student email:
Phone: Android / iPhone

I understand FlashLock may ask me to verify that I am a current UNSW student before applying the offer.`;
const claimUrl = `mailto:hello@flashlock.app?subject=${encodeURIComponent(claimSubject)}&body=${encodeURIComponent(claimBody)}`;

export const metadata = {
  title: "UNSW Founding Student Offer | FlashLock",
  description: "Claim free FlashLock beta access through June 2027, 12 months of FlashLock Pro from launch, and a practical flashcard guide.",
  alternates: { canonical: absoluteSiteUrl("/unsw/") },
  openGraph: {
    title: "UNSW Founding Student Offer | FlashLock",
    description: "Study now. Get 12 months of FlashLock Pro from launch.",
    type: "website",
    url: absoluteSiteUrl("/unsw/"),
    siteName: "FlashLock"
  }
};

function Check() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function UnswOfferPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#offer">Skip to offer</a>
      <div className={styles.offerBar}>UNSW FOUNDING STUDENT OFFER · CLAIM BY 31 MARCH 2027</div>

      <header className={styles.header}>
        <a className={styles.brand} href={sitePath("/")}>
          <img src={sitePath("/app/flashlock-icon.svg")} width="38" height="38" alt="" />
          FlashLock
        </a>
        <span className={styles.studentTag}>FOR UNSW STUDENTS</span>
        <a className={styles.headerCta} href="#claim">Claim offer <Arrow /></a>
      </header>

      <main id="offer">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>A FOUNDING STUDENT DEAL FOR 2027</p>
            <h1>Turn scrolling into <span>study time.</span></h1>
            <p className={styles.subhead}>FlashLock puts a short flashcard session in front of selected apps, then lets you carry on. Claim this UNSW offer now and keep the premium version free for your first year.</p>
            <a className={styles.primaryCta} href="#claim">Claim the UNSW offer <Arrow /></a>
            <p className={styles.deadline}>Takes about one minute · Claim by 31 March 2027</p>
          </div>

          <aside className={styles.dealCard} aria-label="UNSW student offer inclusions">
            <div className={styles.dealTop}><span>FOUNDING STUDENT OFFER</span><strong>$0</strong></div>
            <h2>Your study kit for 2027</h2>
            <ul>
              <li><Check /><span><strong>Free beta access</strong> through June 2027</span></li>
              <li><Check /><span><strong>12 months of FlashLock Pro</strong> from its public launch</span></li>
              <li><Check /><span><strong>The Flashcard Field Guide</strong> for writing cards you can actually recall</span></li>
            </ul>
            <p>No payment is required to claim this student offer.</p>
          </aside>
        </section>

        <section className={styles.how}>
          <div>
            <p className={styles.eyebrow}>HOW TO CLAIM</p>
            <h2>Lock in the offer now.</h2>
          </div>
          <ol>
            <li><span>1</span><div><strong>Use your UNSW student email.</strong><p>Send the pre-filled claim email so there is a dated record of your offer.</p></div></li>
            <li><span>2</span><div><strong>Get the Android beta.</strong><p>Install FlashLock now, or tell us you use iPhone and we will record your place.</p></div></li>
            <li><span>3</span><div><strong>Keep Pro free for 12 months.</strong><p>Your included year begins when FlashLock Pro launches publicly.</p></div></li>
          </ol>
        </section>

        <section className={styles.claim} id="claim">
          <div className={styles.claimCopy}>
            <p className={styles.eyebrow}>CLAIM YOUR PLACE</p>
            <h2>One email. Offer recorded.</h2>
            <p>Send the prepared message from your UNSW student email. We will reply to confirm that your founding offer has been recorded.</p>
            <a className={styles.primaryCta} href={claimUrl}>Record my free year <Arrow /></a>
            <small>If the button does not open your email app, write to <a href="mailto:hello@flashlock.app">hello@flashlock.app</a> with the subject “Claim my UNSW FlashLock offer”.</small>
          </div>
          <div className={styles.qrPanel}>
            <img src={sitePath("/unsw/flashlock-unsw-qr.png")} width="360" height="360" alt="QR code for the FlashLock UNSW offer page" />
            <strong>Share the student offer</strong>
            <span>flashlock.app/unsw</span>
          </div>
        </section>

        <section className={styles.android}>
          <div><p className={styles.eyebrow}>ANDROID BETA</p><h2>Ready to try it?</h2><p>Install the beta after recording your offer. FlashLock is currently available on Android.</p></div>
          <a href={androidBetaUrl("unsw_founders_2027")}>Get FlashLock on Google Play <Arrow /></a>
        </section>

        <section className={styles.terms} aria-labelledby="offer-terms">
          <h2 id="offer-terms">Offer terms</h2>
          <p>Open to current UNSW students who submit a claim by 31 March 2027 and can verify current student status. One offer per student. The offer is personal, non-transferable and has no cash value. The included Pro period begins on FlashLock Pro’s public launch date. FlashLock is an independent product and is not affiliated with or endorsed by UNSW.</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.brand} href={sitePath("/")}><img src={sitePath("/app/flashlock-icon.svg")} width="30" height="30" alt="" />FlashLock</a>
        <p>Make scrolling productive.</p>
        <a href={sitePath("/privacy/")}>Privacy</a>
      </footer>
    </div>
  );
}
