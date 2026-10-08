import "./styles.css";
import { absoluteSiteUrl, sitePath } from "../lib/site";
const siteUrl = absoluteSiteUrl();
export const metadata = {
 metadataBase: new URL(siteUrl),
 title: "FlashLock — Get Better Grades Without Giving Up Your Favorite Apps",
 description: "FlashLock adds short flashcard breaks to the apps you love. Do a few cards, then get back to your app. Try the Android beta.",
 icons: { icon: sitePath("/app/flashlock-icon.svg") },
 alternates: { canonical: siteUrl },
 openGraph: { title: "FlashLock — Get Better Grades Without Giving Up Your Favorite Apps", description: "Short flashcard breaks for the apps you love. Do a few cards, then get back to your app.", type: "website", url: siteUrl, siteName: "FlashLock" },
 robots: { index: true, follow: true }
};
export default function RootLayout({children}) { return <html lang="en"><body>{children}</body></html>; }
