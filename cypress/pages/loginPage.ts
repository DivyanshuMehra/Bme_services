class loginPage {
  elements = {
    getStartButton(): Cypress.Chainable<undefined> {
      return cy.contains("Let's Get Started");
    },
    getLandingPageImage(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".logo-wrapper>img");
    },
    getFormHeading1(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".login-form>h1");
    },
    getFormHeading2(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".login-form>h6");
    },
    getEmailLabel(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("label[for='email']");
    },
    getEmailField(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("input[type='email']");
    },
    getPasswordLabel(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("label[for='password']");
    },
    getPasswordField(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("#password");
    },
    getEyeIcon(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".bi-eye-slash-fill");
    },
    getLoginButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get('button[type="submit"]');
    },
    getForgotPasswordLink(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".mt-3.d-block.no-underline.text-center");
    },
    getPrivacyLink(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".terms-btn>button:nth-child(2)");
    },
    getTermsLink(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".terms-btn>button:nth-child(1)");
    },
    getPrivacyPolicyModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("#privacyModal>div>div>.modal-body>iframe");
    },
    getTermsConditionsModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("#terms-conditionModal>div>div>.modal-body>iframe");
    },
    getPrivacyCloseModalButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("#privacyModal>div>div>.modal-header>.btn-close");
    },
    getTermsCloseModalButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("#terms-conditionModal>div>div>.modal-header>.btn-close");
    },
  };

  /**
   * @returns
   */
  clickOnGetStartButton(): void {
    this.elements.getStartButton().click();
  }

  /**
   * @returns
   */
  clickOnEyeIcon(): void {
    this.elements.getEyeIcon().click();
  }

  /**
   * @returns
   */
  clickOnLoginButton(): void {
    this.elements.getLoginButton().click();
  }

  /**
   * @returns
   */
  clickOnPrivacyButton(): void {
    this.elements.getPrivacyLink().click();
  }

  /**
   * @returns
   */
  clickOnTermsButton(): void {
    this.elements.getTermsLink().click();
  }

  /**
   * @returns
   */
  clickOnPrivacyModalCloseButton(): void {
    this.elements.getPrivacyCloseModalButton().click();
  }
  /**
   * @returns
   */
  clickOnTermsModalCloseButton(): void {
    this.elements.getTermsCloseModalButton().click();
  }
}

export default new loginPage();
