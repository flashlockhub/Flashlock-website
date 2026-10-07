import fs from "node:fs";
import { spawnSync } from "node:child_process";

const build = spawnSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: "/Flashlock-website",
    NEXT_PUBLIC_SITE_URL: "https://flashlockhub.github.io/Flashlock-website/",
  },
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status || 1);
fs.rmSync("docs", { recursive: true, force: true });
fs.cpSync("dist", "docs", { recursive: true });
fs.writeFileSync("docs/.nojekyll", "");
console.log("GitHub Pages ready in docs/ (main branch, /docs source).");
