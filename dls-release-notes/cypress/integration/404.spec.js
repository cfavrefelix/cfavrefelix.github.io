/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />

import { waitForAnimationFrame } from "../utils";

describe("404 page", () => {
  before(() => {
    cy.visit(`http://localhost:3000/dls-release-notes#/release/en-GB/404`).then(
      () => cy.waitForReact(1000, "#dls-release-notes-root")
    );
  });

  it("should show the missing release component", () => {
    cy.getReact("MissingRelease").should("exist");
  });

  it("should show a not found message", () => {
    cy.getReact("MissingReleaseTitle").should("exist");
  });

  it("should display a back and latest button", () => {
    cy.get('main [data-component="link"]')
      .then(($links) => {
        expect($links).to.have.length(2);
        const [backLink, latestLink] = $links;
        latestLink.querySelector("button, a").click();
        return Cypress.Promise.resolve();
      })
      .then(waitForAnimationFrame)
      .then(() => cy.location("hash"))
      .should("be.equal", "#/release/en-GB/6.6.3");
  });

  // There is a bug in cypress that prevents this test from working with the hash router: https://github.com/cypress-io/cypress/issues/896
  // I have watched the thread and will come back and uncomment this test when it's resolved (famous last words...)
  // it("should go back if the back button is pressed", () => {
  //   cy.visit(`http://localhost:3000/#/release/en-GB/demo-not-found`)
  //     .then(() =>
  //       cy.visit(`http://localhost:3000/#/release/en-GB/demo-not-found-2`)
  //     )
  //     .then(waitForAnimationFrame)
  //     .then(waitForAnimationFrame);
  //   // .then(() => cy.get('main [data-component="link"]'))
  //   // .then(($links) => {
  //   //   const [backLink, latestLink] = $links;
  //   //   backLink.querySelector("a, button").click();
  //   //   return waitForAnimationFrame();
  //   // })
  //   cy.go("back").then(() => {
  //     cy.location("hash").should("be.equal", "#/release/en-GB/demo-not-found");
  //   });
  // });
});
