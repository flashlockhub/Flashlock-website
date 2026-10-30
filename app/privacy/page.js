import { sitePath } from "../../lib/site";
import { pageMetadata } from "../../lib/seo";
import Breadcrumbs from "../Breadcrumbs";

export const metadata = pageMetadata(
  "/privacy/",
  "FlashLock Privacy: Study Data, Permissions and Website",
  "A short guide to FlashLock study data, community sharing and website referrals, with links to the full app privacy policy and deletion process."
);

export default function Privacy() {
  return <main className="policyPage">
    <a className="brand" href={sitePath("/")}><img src={sitePath("/app/flashlock-icon.svg")} width="36" height="36" alt="" />FlashLock</a>
    <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy/" }]} />
    <p className="eyebrow">YOUR LEARNING IS PERSONAL</p>
    <h1>Privacy in FlashLock</h1>
    <p>Summary reviewed 30 October 2026.</p>
    <p className="policyNote">This is a short overview, not a replacement for the <a href="https://flashlockhub.github.io/flashlock-privacy/">full app privacy policy linked from Google Play</a>.</p>
    <h2>Study data and community features</h2>
    <p>Study data is stored locally. Choosing to submit a community deck, send feedback or use an account also sends information to FlashLock’s services. Local storage does not mean every feature stays offline.</p>
    <h2>Permissions and optional sharing</h2>
    <p>Accessibility and Usage Access support selected-app learning breaks. You can revoke access in Android Settings. Optional product analytics starts off; account, security and SDK services are separate. ML Kit operational telemetry is not controlled by that analytics switch. Speech providers may process text online, depending on the voice.</p>
    <h2>Backups and deletion</h2>
    <p>Android backup depends on device settings. Signing in is not a FlashLock study-backup service. Uninstalling does not erase server records. See the <a href="https://flashlockhub.github.io/flashlock-privacy/delete-account.html">account-deletion process</a>, or contact <a href="mailto:hello@flashlock.app">hello@flashlock.app</a>. A request is not confirmation of deletion.</p>
    <h2>This website</h2>
    <p>The website does not add advertising or visitor-analytics scripts. Its interactive card demo does not save study progress. GitHub Pages hosts the site and processes the requests needed to serve pages and files.</p>
    <p>Google Play links include a fixed page or demo label. When you follow one, that label goes to Google to help measure referrals. The labels contain no personal identifiers, and this site does not send a separate tracking request.</p>
    <h2>iOS email signups</h2>
    <p>Signups are currently closed: the homepage does not accept an email submission. If you previously joined and want your details removed, contact <a href="mailto:hello@flashlock.app">hello@flashlock.app</a>.</p>
    <p><a href={sitePath("/")}>← Back to FlashLock</a></p>
  </main>;
}
