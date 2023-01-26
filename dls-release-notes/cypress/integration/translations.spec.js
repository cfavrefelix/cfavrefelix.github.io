/// <reference types="cypress" />

import mocks from "../mocks";

describe("Changing language", () => {

  let appWindow;
  // before called as we're only querying a single page and not changing the state at all with these tests
  beforeEach(() => {
    // mocks.setupFR();
    // cy.visit("/fr-FR/6.6.3");
    // cy.waitForReact(1000, "#dls-release-notes-root");
    // mocks.waitForInitialLoadFR();
    // mocks.waitForReleaseNoteLoadFR();
    // cy.window().then((win) => {
    //   appWindow = win;
    // });
  });

  it("should change language when using the language select", () => {});
  it("should change the language select value when changing language", () => {});
});
