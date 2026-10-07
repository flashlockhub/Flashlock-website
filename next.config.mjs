import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

export default {
  output: "export",
  trailingSlash: true,
  basePath,
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
};
