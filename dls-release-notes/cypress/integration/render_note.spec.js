/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />

import { waitForAnimationFrame, waitForTime } from "../utils";
import mocks from "../mocks";

/**
 * These tests load mock data by overwriting the archive.json response and then checking the rendered static content
 * These tests don't check interactive behaviour, just that everything is rendered correctly.
 */

describe("Test rendering release note Version 6.6.3", () => {
  let appWindow;
  // before called as we're only querying a single page and not changing the state at all with these tests
  beforeEach(() => {
    mocks.setup();
    cy.visit("/en-GB/6.6.3");
    cy.waitForReact(1000, "#dls-release-notes-root");
    mocks.waitForInitialLoad();
    mocks.waitForReleaseNoteLoad();
    cy.window().then((win) => {
      appWindow = win;
    });
  });

  describe("Article Header", () => {
    it("should render the title of the page with the version title and date in brackets", () => {
      cy.react("ReleaseNoteTitle").then(([component]) => {
        const h2 = component.querySelector("h2");
        expect(h2).to.have.text("6.6.3 (Date)");
      });
    });

    it("should render a subtitle with the prefix and product name", () => {
      cy.react("ReleaseNoteTitle").then(([component]) => {
        const div = component.querySelector("h1");
        expect(div).to.have.text("subtitle.prefix Example Product Name");
      });
    });

    it("should render a previous button and not a next button inside the pagination", () => {
      cy.react("Pagination").then(([component]) => {
        const links = component.querySelectorAll('[data-component="link"]');
        expect(links.length).to.equal(1);
        expect(links[0].innerText).to.equal("buttons.previous");
      });
    });
  });

  describe("Article Modules", () => {
    it("should render seven TitledParts", () => {
      cy.react("TitledPart").then(($query) => {
        expect($query.length).to.equal(7);
      });
    });

    it("should render have the correct pills for each of the titled parts", () => {
      cy.react("TitledPart", { props: { title: "Feature title 1" } }).then(
        ([component]) => {
          const pills = component.querySelectorAll('[data-component="pill"]');
          expect(Array.from(pills).map((pill) => pill.innerText)).to.deep.eq([
            "Red",
            "Square",
          ]);
        }
      );

      cy.react("TitledPart", { props: { title: "Feature title 2" } }).then(
        ([component]) => {
          const pills = component.querySelectorAll('[data-component="pill"]');
          expect(Array.from(pills).map((pill) => pill.innerText)).to.deep.eq([
            "Red",
            "Square",
          ]);
        }
      );

      cy.react("TitledPart", { props: { title: "Feature title 3" } }).then(
        ([component]) => {
          const pills = component.querySelectorAll('[data-component="pill"]');
          expect(Array.from(pills).map((pill) => pill.innerText)).to.deep.eq([
            "Blue",
            "Circle",
          ]);
        }
      );

      cy.react("TitledPart", { props: { title: "Feature title 4" } }).then(
        ([component]) => {
          const pills = component.querySelectorAll('[data-component="pill"]');
          expect(Array.from(pills).map((pill) => pill.innerText)).to.deep.eq([
            "Blue",
            "Circle",
          ]);
        }
      );

      cy.react("TitledPart", { props: { title: "Feature title 6" } }).then(
        ([component]) => {
          const pills = component.querySelectorAll('[data-component="pill"]');
          expect(Array.from(pills).map((pill) => pill.innerText)).to.deep.eq([
            "Green",
            "Square",
          ]);
        }
      );
    });

    it("should render two tab parts", () => {
      cy.get("article").find("ul").children().should("have.length", 3);
    });

    it("should change tab when selecting a different tab", () => {
      cy.get("article")
        .find("ul")
        .children()
        .eq(0)
        .find("a")
        .should("have.css", "border-left-color", "rgb(0, 126, 69)");

      cy.get("article")
        .find("ul")
        .children()
        .eq(1)
        .find("a")
        .should("have.css", "border-left-color", "rgba(0, 0, 0, 0.1)")
        .click()
        .should("have.css", "border-left-color", "rgb(0, 126, 69)");
    });
  });

  describe("Article footer", () => {
    it("should not display the footer when the user loads the page", () => {
      cy.scrollTo(0, 0)
        .then(() => waitForTime(400))
        .then(() => cy.react("ArticleFooter"))
        .then(([component]) => {
          const componentStyles = appWindow.getComputedStyle(component);
          expect(componentStyles.opacity).to.equal("0");
          expect(componentStyles.pointerEvents).to.equal("none");
        });
    });

    it("should display the footer when the user scrolls down the page", () => {
      cy.scrollTo(0, 200)
        .then(() => waitForTime(400))
        .then(() => cy.react("ArticleFooter"))
        .then(([component]) => {
          const componentStyles = window.getComputedStyle(component);
          expect(componentStyles.opacity).to.equal("1");
          expect(componentStyles.pointerEvents).to.equal("auto");
        });
    });

    it("should contain a link to the top of the page", () => {
      cy.react("ArticleFooter").then(([component]) => {
        const links = component.querySelectorAll('[data-component="link"]');
        const linkToTop = Array.from(links).findIndex((link) => {
          return link.innerText === "links.back-to-top";
        });
        expect(linkToTop).not.to.equal(-1);
      });
    });

    it("should scroll to the top of the page if the link to the top was clicked", () => {
      cy.react("ArticleFooter").then(([component]) => {
        const links = component.querySelectorAll('[data-component="link"]');
        const linkToTop = Array.from(links).findIndex((link) => {
          return link.innerText === "links.back-to-top";
        });

        const spy = cy
          .spy(appWindow, "scrollTo")
          .withArgs({ top: 0, behavior: "smooth" })
          .as("scrollToTop");
        links[linkToTop].querySelector("button").click();

        expect(spy).to.be.called;
      });
    });
  });

  describe("Sidebar", () => {
    it("should have a language selector with two options", () => {
      cy.react("LanguageSelector").then(([component]) => {
        // Check label
        const label = component.querySelector("label");
        expect(label).to.have.text("titles.language");

        // Click the label to open
        label.click();

        waitForAnimationFrame().then(() => {
          const options = component.querySelectorAll(
            '[data-component="option"]'
          );
          expect(options.length).to.equal(2);
        });
      });
    });

    it("should have a version selector with three options", () => {
      cy.react("VersionSelector").then(([component]) => {
        // Check label
        const label = component.querySelector("label");
        expect(label).to.have.text("titles.version");

        // Click the label to open
        label.click();

        waitForAnimationFrame().then(() => {
          const options = component.querySelectorAll(
            '[data-component="option"]'
          );
          expect(options.length).to.equal(3);
        });
      });
    });

    it.skip("should have two taxonomies to select from", () => {
      cy.react("TaxonomyOptionSelector").then(($query) => {
        expect($query.length).to.equal(2);

        expect($query[0].querySelector("legend")).to.have.text("Color");
        expect($query[1].querySelector("legend")).to.have.text("Shape");
      });
    });

    it.skip("should render a drop down for the color options", () => {
      cy.react("TaxonomyOptionSelector").then(([colorTaxonomy]) => {
        const menu = colorTaxonomy.querySelector('ul[role="menu"]');
        expect(menu).to.exist;
        const items = menu.querySelectorAll('[role="menuitemcheckbox"]');
        expect(items).to.have.length(4);
        const inputs = colorTaxonomy.querySelectorAll('[type="checkbox"]');
        expect(inputs).to.have.length(0);
      });
    });

    it.skip("should render shape options as checkboxes", () => {
      cy.react("TaxonomyOptionSelector").then(([_, shapeTaxonomy]) => {
        const menu = shapeTaxonomy.querySelector('ul[role="menu"]');
        expect(menu).not.to.exist;
        const inputs = shapeTaxonomy.querySelectorAll('[type="checkbox"]');
        expect(inputs).to.have.length(2);
      });
    });

    it("Should not have any filter selected by default", () => {
      cy.document().then((doc) => {
        const selectedOptions = doc.querySelectorAll(
          'input[type="checkbox"]:checked, [role="menuitemcheckbox"][aria-checked="true"]'
        );
        expect(selectedOptions).to.have.length(0);
      });
    });
  });
});
