import fs from "node:fs";
import { spawnSync } from "node:child_process";

const targetName = process.argv[2] || "pages";
const targets = {
  pages: {
    basePath: "/Flashlock-website",
    siteUrl: "https://flashlockhub.github.io/Flashlock-website/",
  },
  domain: {
    basePath: "",
    siteUrl: "https://flashlock.app/",
    domain: "flashlock.app",
  },
};
const target = targets[targetName];
if (!target) throw new Error(`Unknown deployment target: ${targetName}. Use pages or domain.`);

const build = spawnSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: target.basePath,
    NEXT_PUBLIC_SITE_URL: target.siteUrl,
  },
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status || 1);
fs.rmSync("docs", { recursive: true, force: true });
fs.cpSync("dist", "docs", { recursive: true });
fs.writeFileSync("docs/.nojekyll", "");
if (target.domain) fs.writeFileSync("docs/CNAME", `${target.domain}\n`);
console.log(`GitHub Pages files ready in docs/ for ${target.siteUrl} (main branch, /docs source).`);
