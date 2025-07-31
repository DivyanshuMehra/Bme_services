class dashboardPage {
  elements = {
    getParticipantCount(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".stats-card>.value");
    },
  };
}
export default new dashboardPage();
