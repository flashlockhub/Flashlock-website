// Keep raw links and public assets aligned with Next's build-time basePath.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://flashlock.app").replace(/\/+$/, "") + "/";

export function sitePath(path = "/") {
  return `${basePath}${path}`;
}

export function absoluteSiteUrl(path = "/") {
  return new URL(path.replace(/^\/+/, ""), siteUrl).toString();
}
