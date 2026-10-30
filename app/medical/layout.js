import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata(
  "/medical/",
  "Medical Study Flashcards Before Apps | FlashLock for Android",
  "Use your medical course flashcards in short reviews before everyday Android apps. Bring an Anki deck, check your cards and choose your study break."
);

export default function MedicalLayout({ children }) {
  return children;
}
