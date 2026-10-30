import "./styles.css";
import { absoluteSiteUrl, sitePath } from "../lib/site";
import { pageMetadata } from "../lib/seo";
const siteUrl = absoluteSiteUrl();
export const metadata = {
 metadataBase: new URL(siteUrl),
 ...pageMetadata("/", "FlashLock — Flashcards Before Apps on Android", "Use your own flashcards before opening everyday apps. Build a study habit with FlashLock’s Android beta."),
 icons: { icon: sitePath("/app/flashlock-icon.svg") },
 robots: { index: true, follow: true }
};
export default function RootLayout({children}) { return <html lang="en"><body>{children}</body></html>; }
