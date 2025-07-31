class manageParticipantPage {
  elements = {
    getLeftMenuIcon(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".bi-person-check");
    },
    getParticipantCards(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".all-participant>.user-card");
    },
    getParticipantCardIndex(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-participant>:nth-child(${index})`);
    },
    getParticipantCardIcon(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-participant>:nth-child(${index})>div>i`);
    },
    getParticipantCardName(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-participant>:nth-child(${index})>div>.name`);
    },
    getParticipantCardEmail(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-participant>:nth-child(${index})>div>.email`);
    },
    getSendEmailButton(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `:nth-child(${index})>.action-items>[title='Send Invitation Email']`,
      );
    },
    getEditParticipantButton(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`:nth-child(${index})>.action-items>[title='Edit User']`);
    },
    getDeleteParticipantButton(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `:nth-child(${index})>.action-items>[title='Delete Invitation']`,
      );
    },
    //   getPageButtonWithText(): Cypress.Chainable<JQuery<HTMLElement>> {
    //     return cy.get(".justify-content-between>div>button");
    //   },
    getParticipantModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-content");
    },
    getParticipantModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-header>.modal-title");
    },
    getParticipantModalLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>.form-label`);
    },
    getModalSubmitBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-footer>button[type='submit']");
    },
    getParticipantModalEmailInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>div>${fieldType}`);
    },
    getParticipantModalEmailValidation(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>div>.text-danger`);
    },
    getParticipantModalInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>${fieldType}`);
    },
    getParticipantModalInputValidation(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>.text-danger`);
    },
    getAddParticipantSaveBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        '#add-modal>div>div>form>.modal-footer>button[type="submit"]',
      );
    },
    getEditParticipantModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-backdrop>#edit-modal");
    },
    getEditParticipantModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        "#edit-modal>.modal-dialog>.modal-content>.modal-header>.modal-title",
      );
    },
    getEditParticipantLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#edit-modal>div>div>form>div>div:nth-child(${fieldIndex})>label`,
      );
    },
    getEditParticipantInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#edit-modal>div>div>form>div>div:nth-child(${fieldIndex})>${fieldType}`,
      );
    },
    getEditParticipantSubmitBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        '#edit-modal>div>div>form>.modal-footer>button[type="submit"]',
      );
    },
    getAddRaterButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".btn-wrapper>.btn-primary");
    },
    getRaterModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-content");
    },
    getRaterModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-header>.modal-title");
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
    getAddRatertSaveBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        '#add-modal>div>div>form>.modal-footer>button[type="submit"]',
      );
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
    getRaterCards(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".user-list>.user-card");
    },

    getRaterCardEmail(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.user-list>:nth-child(${index})>div>.email`);
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
  };

  /**
   * @returns
   */
  clickOnModalSubmitBtn(): void {
    this.elements.getModalSubmitBtn().click();
  }

  /**
   * @returns
   */
  clickOnParticipantCard(fieldIndex: number): void {
    this.elements.getParticipantCardIndex(fieldIndex).click();
  }

  /**
   * @returns
   */
  clickOnParticipantEditBtn(fieldIndex: number): void {
    this.elements.getEditParticipantButton(fieldIndex).click();
  }

  /**
   * @returns
   */
  clickOnParticipantDeleteBtn(fieldIndex: number): void {
    this.elements.getDeleteParticipantButton(fieldIndex).click();
  }

  /**
   * @returns
   */
  clickOnRaterEditBtn(fieldIndex: number): void {
    this.elements.getEditParticipantButton(fieldIndex).click();
  }

  /**
   * @returns
   */
  clickOnRaterDeleteBtn(fieldIndex: number): void {
    this.elements.getDeleteParticipantButton(fieldIndex).click();
  }

  /**
   * @param buttonLabel
   */
  clickOnAddRaterBtn(buttonLabel: string): void {
    this.elements.getAddRaterButton().contains(buttonLabel).click();
  }
}
export default new manageParticipantPage();
