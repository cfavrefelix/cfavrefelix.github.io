/// <reference types="cypress" />
const API_BASE = "http://localhost:3000/dls-release-notes/api";
class Mocks {
  setup() {
    cy.intercept(`${API_BASE}/en-GB/archive.json`, {
      fixture: "en-archive",
    }).as("getArchive");

    cy.intercept(`${API_BASE}/en-GB/taxonomies.json`, {
      fixture: "en-taxonomies",
    }).as("getTaxonomies");

    cy.intercept(`${API_BASE}/en-GB/labels.json`, {
      fixture: "en-labels",
    }).as("getLabels");

    cy.intercept(`${API_BASE}/en-GB/6.6.3/data.json`, {
      fixture: "en-6.6.3",
    }).as("getVersion3");

    cy.intercept(`${API_BASE}/en-GB/6.6.2/data.json`, {
      fixture: "en-6.6.2",
    }).as("getVersion2");

    cy.intercept(`${API_BASE}/en-GB/6.6.1/data.json`, {
      fixture: "en-6.6.1",
    }).as("getVersion1");
  }

  setupFR() {
    cy.intercept(`${API_BASE}/fr-FR/archive.json`, {
      fixture: "fr-archive",
    }).as("getFRArchive");

    cy.intercept(`${API_BASE}/fr-FR/taxonomies.json`, {
      fixture: "fr-taxonomies",
    }).as("getFRTaxonomies");

    cy.intercept(`${API_BASE}/fr-FR/labels.json`, {
      fixture: "fr-labels",
    }).as("getFRLabels");

    cy.intercept(`${API_BASE}/fr-FR/6.6.3/data.json`, {
      fixture: "fr-6.6.3",
    }).as("getFRVersion3");

    cy.intercept(`${API_BASE}/fr-FR/6.6.2/data.json`, {
      fixture: "fr-6.6.2",
    }).as("getFRVersion2");

    cy.intercept(`${API_BASE}/fr-FR/6.6.1/data.json`, {
      fixture: "fr-6.6.1",
    }).as("getFRVersion1");
  }

  waitForInitialLoad() {
    return cy.wait(["@getArchive", "@getTaxonomies", "@getLabels"]);
  }

  waitForReleaseNoteLoad(note = 3) {
    return cy.wait(`@getVersion${note}`);
  }

  waitForInitialLoadFR() {
    return cy.wait(["@getFRArchive", "@getFRTaxonomies", "@getFRLabels"]);
  }

  waitForReleaseNoteLoadFR(note = 3) {
    return cy.wait(`@getFRVersion${note}`);
  }
}

const mocks = new Mocks();

export default mocks;
