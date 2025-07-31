class profilePage {
  elements = {
    getBasicInfoTab(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("#pills-basic-info-tab");
    },
    getUpdatePasswordTab(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("#pills-update-password-tab");
    },
    getBasicInfoContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("#basic-info");
    },
    getUpdatePasswordContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("#update-password");
    },
    getBasicLabel(fieldIndex: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`#basic-info>form>div:nth-child(${fieldIndex})>label`);
    },
    getBasicInput(fieldIndex: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`#basic-info>form>div:nth-child(${fieldIndex})>div>input`);
    },
    getBasicUpdateBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get('#basic-info>form>button[type="submit"]');
    },
    getChangePasswordHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("#update-password>form>h5");
    },
    getChangePasswordRules(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#update-password>form>.notes>ul>li:nth-child(${fieldIndex})`,
      );
    },
    getChangePasswordLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`#update-password>form>div:nth-child(${fieldIndex})>label`);
    },
    getChangePasswordInput(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#update-password>form>div:nth-child(${fieldIndex})>div>div>input`,
      );
    },
    getUpdatePasswordBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get('#update-password>form>button[type="submit"]');
    },
  };

  /**
   * @returns
   */
  clickOnBasicInfoTab(): void {
    this.elements.getBasicInfoTab().click();
  }

  /**
   * @returns
   */
  clickOnUpdatePasswordTab(): void {
    this.elements.getUpdatePasswordTab().click();
  }

  /**
   * @returns
   */
  clickOnBasicUpdateBtn(): void {
    this.elements.getBasicUpdateBtn().click();
  }

  /**
   * @returns
   */
  clickOnUpdatePasswordBtn(): void {
    this.elements.getUpdatePasswordBtn().click();
  }
}

export default new profilePage();
