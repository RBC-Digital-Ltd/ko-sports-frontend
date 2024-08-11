/// <reference types="vitest" />

import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryVitePlugin } from "@sentry/vite-plugin";

installGlobals();

export default defineConfig({
  test: {
    include: ["app/**/*.{spec,test}.{js,ts,tsx}"],
    setupFiles: ["./vitest-setup.ts"],
    environment: "jsdom",
    globals: true,
  },
  server: {
    port: 3000,
  },
  plugins: [
    !process.env.VITEST && remix(),
    tsconfigPaths(),
    sentryVitePlugin({
      // If you use .sentryclirc or environment variables,
      // you don't need to specify these options
      org: "ray-parkar",
      project: "ko-sports-frontend",
      sourcemaps: {
        filesToDeleteAfterUpload: ["**/*.map"],
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
});
