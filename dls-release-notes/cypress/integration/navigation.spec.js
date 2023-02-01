/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />
import { waitForAnimationFrame, waitForTime } from "../utils";
import mocks from "../mocks";

describe("Release Notes", () => {
  it("displays components on a page", () => {
    cy.visit("/en-GB/6.6.2");
  });
});

function visitVersion(v = "3") {
  return cy
    .visit(`/en-GB/6.6.${v}`)
    .then(() => cy.waitForReact(1000, "#dls-release-notes-root"))
    .then(() => mocks.waitForInitialLoad())
    .then(() => mocks.waitForReleaseNoteLoad(v));
}

describe("Navigation", () => {
  beforeEach(() => {
    mocks.setup();
  });

  it("should navigate to release note 2 when clicking previous from note 3", () => {
    visitVersion(3)
      .then(() => cy.react("Pagination"))
      .then(([pagination]) => {
        const link = pagination.querySelector("button, a");
        link.click();
        return mocks.waitForReleaseNoteLoad(2);
      })
      // This waits for everything to finish rendering
      .then(waitForAnimationFrame)
      .then(waitForAnimationFrame)
      .then(() => cy.react("ReleaseNoteTitle"))
      .then(([component]) => {
        const h2 = component.querySelector("h2");
        expect(h2).to.have.text("6.6.2 (Date)");
        cy.location("hash").should("be.equal", "#/release/en-GB/6.6.2");
      });
  });

  it("should navigate to release note 3 when clicking next from note 2", () => {
    visitVersion(2)
      .then(() => cy.react("Pagination"))
      .then(([pagination]) => {
        const link = pagination.querySelectorAll("button, a")[1];
        link.click();
        return mocks.waitForReleaseNoteLoad(3);
      })
      // This waits for everything to finish rendering
      .then(waitForAnimationFrame)
      .then(waitForAnimationFrame)
      .then(() => cy.react("ReleaseNoteTitle"))
      .then(([component]) => {
        const h2 = component.querySelector("h2");
        expect(h2).to.have.text("6.6.3 (Date)");
        cy.location("hash").should("be.equal", "#/release/en-GB/6.6.3");
      });
  });

  it("should update the version select when changing page", () => {
    visitVersion(2)
      .then(() => cy.react("VersionSelector"))
      .then(([versionSelector]) => {
        expect(versionSelector.querySelector("input").value).to.equal("6.6.2");
        return cy.visit("/en-GB/6.6.1");
      })
      .then(() => mocks.waitForReleaseNoteLoad(1))
      // This waits for everything to finish rendering
      .then(waitForAnimationFrame)
      .then(waitForAnimationFrame)
      .then(() => cy.react("VersionSelector"))
      .then(([versionSelector]) => {
        expect(versionSelector.querySelector("input").value).to.equal("6.6.1");
      });
  });

  it.skip("should disable unused taxonomies when changing version", () => {
    visitVersion(2)
      .then(() => cy.react("Checkbox"))
      .then(() => cy.getReact("Checkbox"))
      .nthNode(0)
      .getProps("disabled")
      .should("eq", false)
      .then(() => cy.visit("/en-GB/6.6.1"))
      .then(() => mocks.waitForReleaseNoteLoad(1))
      // This waits for everything to finish rendering
      .then(waitForAnimationFrame)
      .then(waitForAnimationFrame)
      .then(() => cy.getReact("Checkbox"))
      .nthNode(0)
      .getProps("disabled")
      .should("eq", true);
  });
});
