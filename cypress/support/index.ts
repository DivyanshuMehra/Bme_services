// @ts-check
///<reference types="../global.d.ts" />

Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});
