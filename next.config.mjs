!process.env.SKIP_ENV_VALIDATION &&
  process.env.NODE_ENV !== "test" &&
  (await import("../env/server.mjs"));

const config = {
  reactStrictMode: true,
  distDir: ".next",
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  output: "standalone",
};
export default config;
