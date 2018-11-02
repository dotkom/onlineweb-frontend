
const defaults = require('jest-config');


module.exports = {
  setupFiles: [
    "<rootDir>/config/testing/enzyme.setup.js",
    "<rootDir>/config/testing/misc.mock.js"
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx,js,jsx,mjs}",
    "<rootDir>/src/**/?(*.)(spec|test).{ts,tsx,js,jsx,mjs}"
  ],
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(ts|tsx|js|jsx|mjs)$"
  ],
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  moduleFileExtensions: [
    "tsx", "ts", "jsx", "js", "mjs"
  ],
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx,js,jsx,mjs}",
    "!src/**/*.mock.{ts,tsx,js,jsx,mjs}"
  ],

}
