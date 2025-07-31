class manageCompanyPage {
  elements = {
    getLeftMenuIcon(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".bi-buildings");
    },
    getPageTopButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.wrap-company-view>div>button`);
    },
    getCompanyModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-content");
    },
    getCloseModalButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-header>.btn-close`);
    },
    getCompanyModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-header>.modal-title");
    },
    getAddEditCompanyLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>.form-label`);
    },
    getCopyCompanyModalMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("form>.modal-body>h5");
    },
    getCopyCompanyLabel(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-body>div>label");
    },
    getCopyCompanyInput(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-body>div>input");
    },
    getCopyCompanyButtons(
      buttonIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-footer>:nth-child(${buttonIndex})`);
    },
    getCopyModalButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-footer>button`);
    },
    getAddEditCompanyInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>${fieldType}`);
    },
    getAddEditCompanyLogoInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.modal-body>:nth-child(${fieldIndex})>div>div>input[type='${fieldType}']`,
      );
    },
    getCompanyCards(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".wrap-company-view>.listing-company");
    },
    getCompanyCardName(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.wrap-company-view>:nth-child(${index})>.company-info>h6`);
    },
    getCompanyCardEmail(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.wrap-company-view>:nth-child(${index})>.company-info>.date>.email`,
      );
    },
    getCompanyCardDateTag(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.wrap-company-view>:nth-child(${index})>.company-info>.date>p`,
      );
    },
    getCompanyCardIcons(
      index: number,
      iconIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.wrap-company-view>:nth-child(${index})>.group-btns>:nth-child(${iconIndex})>i`,
      );
    },
    getCompanyEditBtn(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.wrap-company-view>:nth-child(${fieldIndex})>.group-btns>button>.bi-pencil-square`,
      );
    },
    getCompanyCopyBtn(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.wrap-company-view>:nth-child(${fieldIndex})>.group-btns>button>.bi-copy`,
      );
    },
    getCompanyDeleteBtn(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.wrap-company-view>:nth-child(${fieldIndex})>.group-btns>button>.bi-trash3`,
      );
    },
    getCompanyDetailsTabs(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.app-page>.nav>li`);
    },
    getCompanyQuestionPageButtons(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.btn-wrapper>.btn-primary`);
    },
    getAddQuestionModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-backdrop>#add-modal");
    },
    getQuestionModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-dialog>.modal-content>.modal-header>.modal-title");
    },
    getAddQuestionLabel(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-body>div>label");
    },
    getAddQuestionInput(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-body>div>textarea");
    },
    getQuestionModalSaveBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get("form>.modal-footer>button[type='submit']");
    },
    getCompanyQuestionCards(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".all-question>.question-card");
    },
    getCompanyQuestionCardQuestion(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.all-question>.question-card:nth-child(${index})>.question-wrapper>.question`,
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
    getEditQuestionModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-backdrop>#edit-modal");
    },
    getDeleteQuestionModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-backdrop>.modal");
    },
    getAddEmployeeButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".app-page>div>.btn-primary");
    },
    getFreezeUnfreezeButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".btn-wrapper>.btn-primary>span");
    },
    getEmployeeModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-content");
    },
    getEmployeeModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-header>.modal-title");
    },
    getEmployeeModalLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>.form-label`);
    },
    getModalSubmitBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-footer>button[type='submit']");
    },
    getEmployeeCardIndex(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-question>.question-card:nth-child(${index})`);
    },
    getEmployeeModalEmailInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>div>${fieldType}`);
    },
    getEmployeeModalInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>${fieldType}`);
    },
    getAddEmployeeSaveBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        '#add-modal>div>div>form>.modal-footer>button[type="submit"]',
      );
    },
    getEditEmployeeModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-backdrop>#edit-modal");
    },
    getEditEmployeeModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        "#edit-modal>.modal-dialog>.modal-content>.modal-header>.modal-title",
      );
    },
    getEditEmployeeLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#edit-modal>div>div>form>div>div:nth-child(${fieldIndex})>label`,
      );
    },
    getEditEmployeeInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#edit-modal>div>div>form>div>div:nth-child(${fieldIndex})>${fieldType}`,
      );
    },
    getEditEmployeeSubmitBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        '#edit-modal>div>div>form>.modal-footer>button[type="submit"]',
      );
    },
    getUsersCard(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".employees-list>.user-card");
    },
    getUserCardEmailIcon(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`:nth-child(${fieldIndex})>div>button>.bi-envelope`);
    },
    getUserCardName(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.employees-list>:nth-child(${fieldIndex})>div>.name`);
    },
  };

  /**
   * @returns
   */
  clickOnCompanyEditBtn(fieldIndex: number): void {
    this.elements.getCompanyEditBtn(fieldIndex).click();
  }
  /**
   * @returns
   */
  clickOnCompanyCopyBtn(fieldIndex: number): void {
    this.elements.getCompanyCopyBtn(fieldIndex).click();
  }
  /**
   * @returns
   */
  clickOnCompanyDeleteBtn(fieldIndex: number): void {
    this.elements.getCompanyDeleteBtn(fieldIndex).click();
  }

  /**
   * @returns
   */
  clickOnAddCompanySaveBtn(): void {
    this.elements.getModalSubmitBtn().click();
  }

  /**
   *
   * @param buttonLabel
   */
  clickOnCopyModalButton(buttonLabel: string): void {
    this.elements.getCopyModalButton().contains(buttonLabel).click();
  }

  /**
   * @returns
   */
  clickOnEditCompanySubmitBtn(): void {
    this.elements.getModalSubmitBtn().click();
  }

  /**
   * @param text
   */
  clickOnCompanyDetailsTab(text: string): void {
    this.elements.getCompanyDetailsTabs().contains(text).click();
  }

  /**
   * @returns
   */
  clickOnQuestionModalSaveBtn(): void {
    this.elements.getQuestionModalSaveBtn().click();
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

  /**
   * @returns
   */
  clickOnEmployeeModalSaveBtn(): void {
    this.elements.getAddEmployeeSaveBtn().click();
  }
}
export default new manageCompanyPage();
