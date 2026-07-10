import { defineConfig } from "vitest/config";
import { config as loadEnv } from "dotenv";
import path from "path";

// Loaded explicitly into `test.env` (rather than relying on side effects)
// so the DATABASE_URL override reliably reaches every test worker.
const testEnv = loadEnv({ path: path.resolve(__dirname, ".env.test") }).parsed ?? {};

export default defineConfig({
  test: {
    environment: "node",
    env: testEnv,
    hookTimeout: 30000,
    testTimeout: 30000,
    // These are integration tests sharing one real database; running test
    // files in parallel causes one file's resetDb() to wipe rows another
    // file's test is mid-use with.
    fileParallelism: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
