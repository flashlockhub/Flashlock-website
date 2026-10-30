import { sitePath } from "../lib/site";

export const metadata = {
  title: "Page not found — FlashLock",
  description: "This FlashLock page could not be found.",
  alternates: { canonical: null },
  robots: { index: false, follow: true },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return <main className="policyPage">
    <h1>Page not found</h1>
    <p>Try the <a href={sitePath("/")}>homepage</a> or <a href={sitePath("/guides/")}>guides</a>.</p>
  </main>;
}
