class manageRaterPage {
  elements = {
    getRoleRadioButton(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.user-listing>:nth-child(${index})>input.form-check-input`,
      );
    },

    getUserRolesCard(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".user-listing>.user-card");
    },
    getUserRolesCardRole(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.user-listing>:nth-child(${index})>.user-info>div>div>p.text-capitalize`,
      );
    },
    getUserRolesCardInvitedFor(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.user-listing>.:nth-child(${index})>.user-info>div>div>small`,
      );
    },
    getUserRolesCardCompany(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("input.form-check-input");
    },
    getProceedButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".accounts-card>div>.btn-primary");
    },
    getParticipantOfUserButton(
      text: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("div.role-list").contains(text);
    },
    chooseRoleButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("button.btn-primary");
    },
    getLeftMenuIcon(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".bi-person-plus");
    },
    getRaterCards(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".all-raters>.user-card");
    },
    getRaterCardIndex(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-raters>:nth-child(${index})`);
    },
    getRaterCardIcon(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-raters>:nth-child(${index})>div>i`);
    },
    getRaterCardEmail(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-raters>:nth-child(${index})>div>.email`);
    },
    getSendEmailButton(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `:nth-child(${index})>.action-items>[title='Send Invitation Email']`,
      );
    },
    getEditRaterButton(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`:nth-child(${index})>.action-items>[title='Edit User']`);
    },
    getDeleteRaterButton(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `:nth-child(${index})>.action-items>[title='Delete Invitation']`,
      );
    },
    getRaterModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-content");
    },
    getRaterModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-header>.modal-title");
    },
    getAddRaterButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".btn-wrapper>.btn-primary");
    },
    getRaterModalLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>.form-label`);
    },
    getRaterModalSubmitBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-footer>button[type='submit']");
    },
    getRaterModalEmailInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>div>${fieldType}`);
    },
    getRaterModalInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>${fieldType}`);
    },
    getEditRaterModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-backdrop>#edit-modal");
    },
    getEditRaterModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        "#edit-modal>.modal-dialog>.modal-content>.modal-header>.modal-title",
      );
    },
    getEditRaterLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#edit-modal>div>div>form>div>div:nth-child(${fieldIndex})>label`,
      );
    },
    getEditRaterInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#edit-modal>div>div>form>div>div:nth-child(${fieldIndex})>${fieldType}`,
      );
    },
    getEditRaterSubmitBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        '#edit-modal>div>div>form>.modal-footer>button[type="submit"]',
      );
    },
  };
  /**
   * @returns
   */
  clickOnModalSubmitBtn(): void {
    this.elements.getRaterModalSubmitBtn().click();
  }
  /**
   * @returns
   */
  clickOnChooseRoleBtn(text: string): void {
    this.elements.getParticipantOfUserButton(text).click();
    this.elements.chooseRoleButton().click();
  }
  /**
   * @returns
   */
  clickOnRaterEditBtn(fieldIndex: number): void {
    this.elements.getEditRaterButton(fieldIndex).click();
  }

  /**
   * @returns
   */
  clickOnRaterDeleteBtn(fieldIndex: number): void {
    this.elements.getDeleteRaterButton(fieldIndex).click();
  }

  /**
   * @param buttonLabel
   */
  clickOnAddRaterBtn(buttonLabel: string): void {
    this.elements.getAddRaterButton().contains(buttonLabel).click();
  }
  /**
   * @returns
   */
  clickOnProceedButton(): void {
    this.elements.getProceedButton().click();
  }
  /**
   * @param value
   */
  verifyUrlIncludes(value: string) {
    return cy.url().then(function ($url): boolean {
      return $url.includes(value) ? true : false;
    });
  }
}
export default new manageRaterPage();
