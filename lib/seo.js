import { absoluteSiteUrl } from "./site";

export const shareImage = {
  url: absoluteSiteUrl("/app/flashlock-share.png"),
  width: 1200,
  height: 630,
  alt: "FlashLock — flashcards before apps on Android",
};

export function pageMetadata(path, title, description) {
  return {
    title,
    description,
    alternates: { canonical: absoluteSiteUrl(path) },
    openGraph: {
      title, description, url: absoluteSiteUrl(path),
      type: "website", siteName: "FlashLock", images: [shareImage],
    },
    twitter: {
      card: "summary_large_image", title, description,
      images: [shareImage],
    },
  };
}
