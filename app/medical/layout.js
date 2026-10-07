import { absoluteSiteUrl } from "../../lib/site";

export const metadata = {
  title: "FlashLock for Medical Students — Walk into every exam ready",
  description: "Turn the apps you already open into fast medical recall. Ten first-year medicine decks, 1,000 cards and Anki import for Android.",
  openGraph: {
    title: "FlashLock for Medical Students",
    description: "Make every spare scroll part of becoming the doctor you want to be.",
    type: "website",
    url: absoluteSiteUrl("/medical/")
  },
  alternates: { canonical: absoluteSiteUrl("/medical/") },
  robots: { index: true, follow: true }
};

export default function MedicalLayout({ children }) {
  return children;
}
