/// <reference types="cypress" />

export function waitForAnimationFrame(t = 1) {
  return new Cypress.Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

export function waitForTime(t = 0) {
  if (!t || typeof t !== "number") {
    return waitForAnimationFrame();
  }
  return new Cypress.Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
}

export function selectTaxonomy(taxonomy, option) {
  return cy
    .react("TaxonomyOptionSelector", { props: { title: taxonomy } })
    .then(($component) => {
      if ($component?.length < 1) {
        return;
      }
      const [component] = $component;

      const options = component.querySelectorAll(
        'input[type="checkbox"], li[role="menuitemcheckbox"]'
      );
      const correctOption = Array.from(options)?.find((thisOption) => {
        const value =
          thisOption.getAttribute("name") ||
          thisOption.getAttribute("data-value");
        return value === option;
      });
      if (correctOption) {
        correctOption.click();
      }
    });
}
