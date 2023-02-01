const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    "cypress-react-selector": {
      root: "#__cy_root",
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000/dls-release-notes#/release/",
    specPattern: "cypress/integration/**/*.spec.js",
    excludeSpecPattern: ["**/__snapshots__/*", "**/__image_snapshots__/*"],
  },
  video: false,
});
