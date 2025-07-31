import { defineConfig } from "cypress";
import plugin from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportPageTitle: 'Trusted leaders 360 test-report',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    ignoreVideos: false,
    videoOnFailOnly: true
  },
  "viewportWidth": 1440,
  "viewportHeight": 1024,
  e2e: {
    setupNodeEvents(on, config) {
      plugin(on);
      config.baseUrl = config.env.BASE_URL;

      on("task", {
        customLog(message) {
          console.log(message);
          return null;
        },
      });

      return config;
    },
    specPattern: "cypress/tests/**",
    experimentalRunAllSpecs: true
  },
});
