class manageQuestionPage {
  elements = {
    getLeftMenuIcon(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".bi-list-task");
    },
    getQuestionListContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".all-question");
    },
    getQuestionCards(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".all-question>.question-card");
    },
    getQuestionCardIndex(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-question>.question-card:nth-child(${index})`);
    },
    getQuestionCardIndexNumber(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-question>.question-card:nth-child(${index})>.index`);
    },
    getQuestionCardIndexQuestion(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.all-question>.question-card:nth-child(${index})>.question-wrapper>.question`,
      );
    },
    getQuestionCardIndexTag(
      index: number,
      tagNumber: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.all-question>.question-card:nth-child(${index})>.question-wrapper>.tags>span:nth-child(${tagNumber})`,
      );
    },
    getAddQuestionModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-backdrop>#add-modal");
    },
    getAddQuestionModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        "#add-modal>.modal-dialog>.modal-content>.modal-header>.modal-title",
      );
    },
    getAddQuestionLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#add-modal>div>div>form>div>div:nth-child(${fieldIndex})>label`,
      );
    },
    getAddQuestionInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#add-modal>div>div>form>div>div:nth-child(${fieldIndex})>${fieldType}`,
      );
    },
    getAddQuestionSaveBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        '#add-modal>div>div>form>.modal-footer>button[type="submit"]',
      );
    },
    getEditQuestionModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-backdrop>#edit-modal");
    },
    getEditQuestionModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        "#edit-modal>.modal-dialog>.modal-content>.modal-header>.modal-title",
      );
    },
    getEditQuestionLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#edit-modal>div>div>form>div>div:nth-child(${fieldIndex})>label`,
      );
    },
    getEditQuestionInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#edit-modal>div>div>form>div>div:nth-child(${fieldIndex})>${fieldType}`,
      );
    },
    getEditQuestionSubmitBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        '#edit-modal>div>div>form>.modal-footer>button[type="submit"]',
      );
    },
    getQuestionThreeDotBtn(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.all-question>.question-card:nth-child(${fieldIndex})>.dropdown>button`,
      );
    },
    getQuestionThreeDotActionBtn(
      fieldIndex: number,
      actionLabel: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy
        .get(
          `.all-question>.question-card:nth-child(${fieldIndex})>.dropdown>ul>li`,
        )
        .contains(actionLabel);
    },
  };

  /**
   * @returns
   */
  clickOnAddQuestionSaveBtn(): void {
    this.elements.getAddQuestionSaveBtn().click();
  }

  /**
   * @returns
   */
  clickOnEditQuestionSubmitBtn(): void {
    this.elements.getEditQuestionSubmitBtn().click();
  }

  /**
   * @returns
   */
  clickOnQuestionThreeDotBtn(fieldIndex: number): void {
    this.elements.getQuestionThreeDotBtn(fieldIndex).click();
  }

  /**
   * @returns
   */
  clickOnQuestionThreeDotActionBtn(
    fieldIndex: number,
    actionLabel: string,
  ): void {
    this.elements.getQuestionThreeDotActionBtn(fieldIndex, actionLabel).click();
  }
}

export default new manageQuestionPage();
