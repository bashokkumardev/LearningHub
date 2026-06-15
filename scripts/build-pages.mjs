import { rmSync } from "fs";
import { execSync } from "child_process";

rmSync("src/app/api", { recursive: true, force: true });

execSync("npm run build", {
  stdio: "inherit",
  env: { ...process.env, GITHUB_PAGES: "true" },
});
