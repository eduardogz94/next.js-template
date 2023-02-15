/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "./__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "./__mocks__/fileMock.js",
    "^~/(.*)": "<rootDir>/$1",
    "^pages(.*)$": "<rootDir>/pages$1",
    "^components(.*)$": "<rootDir>/components$1",
    "^styles(.*)$": "<rootDir>/styles$1",
    "^providers(.*)$": "<rootDir>/providers$1",
  },
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
  preset: "ts-jest",
  coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "providers/**/*.{js,jsx,ts,tsx}",
    "styles/**/*.{js,jsx,ts,tsx}",
    "!**/*.stories.{js,jsx,ts,tsx}",
    "!**/*.mocks.{js,jsx,ts,tsx}",
    "!**/index.{js,jsx,ts,tsx}",
    "pages/**/!(_)*.{js,jsx,ts,tsx}",
    "tests/**/*.{js,jsx,ts,tsx}",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
