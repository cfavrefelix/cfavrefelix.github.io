/// <reference types="cypress" />

describe("Content Filters", () => {
  beforeEach(() => {
    cy.visit("/en-GB/6.6.3");
    cy.waitForReact(1000, "#dls-release-notes-root");
  });

  it("renders Filters Button", () => {
    return cy.get("[type='button']").contains("Filters");
  });

  it("renders Print Button", () => {
    return cy.get("[type='button']").contains("Print");
  });

  it("check all links", () => {
    cy.visit("/");
    cy.get("a").each((page) => {
      cy.request(page.prop("href"));
    });
  });
});
