class ManageReportsPage {
  elements = {
    getLeftMenuIcon(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".bi-file-earmark-spreadsheet");
    },
    getPageHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".app-page>h2");
    },
    getPageSubHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".app-page>h3");
    },
    getAdminCards(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".app-page>.user-card");
    },
    getAdminCardName(
      indexNumber: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.app-page>:nth-child(${indexNumber})>div>span.name`);
    },
    getAdminCardEmail(
      indexNumber: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.app-page>:nth-child(${indexNumber})>div>span.email`);
    },
    getParticipantCards(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".app-page>div>.user-card");
    },
    getParticipantCardName(
      indexNumber: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.app-page>div>:nth-child(${indexNumber})>div>span.name`);
    },
    getParticipantCardOptions(
      indexNumber: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`div>.user-card:nth-child(${indexNumber})>.action-items`);
    },
    getParticipantCardDownloadOption(
      indexNumber: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `div>.user-card:nth-child(${indexNumber})>.action-items>a.btn`,
      );
    },
  };
  /**
   * @returns
   */
  clickOnDownloadBtn(fieldIndex: number): void {
    this.elements.getParticipantCardDownloadOption(fieldIndex).click();
  }
}
export default new ManageReportsPage();
