// Shared destination for every Android download CTA, including demo completion.
export const ANDROID_BETA_URL = "https://play.google.com/store/apps/details?id=com.flashlock.app";

// Static page labels only: no visitor IDs, URL queries, cookies or analytics calls.
// Direct UTMs identify the campaign in Play Console; the encoded referrer carries
// the same labels through supported Play install flows. Neither proves an install.
export function androidBetaUrl(campaign) {
  const attribution = new URLSearchParams({
    utm_source: "flashlock.app",
    utm_medium: "website",
    utm_campaign: campaign,
  });
  const url = new URL(ANDROID_BETA_URL);
  for (const [name, value] of attribution) url.searchParams.set(name, value);
  url.searchParams.set("referrer", attribution.toString());
  return url.toString();
}
