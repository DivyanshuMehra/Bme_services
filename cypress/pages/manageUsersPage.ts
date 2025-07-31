class ManageUsersPage {
  elements = {
    getLeftMenuIcon(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".bi-person-check");
    },
    getPageTopButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".app-page>.justify-content-between >div>.btn-primary");
    },
    getSearchBar(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".search-wrapper>input");
    },
    getSearchBarButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".search-wrapper>button");
    },
    getUserTabs(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".nav-pills >li");
    },
    getUserTablabel(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.nav-pills >:nth-child(${index})>div`);
    },
    getUserTabIcon(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.nav-pills >:nth-child(${index})>div>i`);
    },
    getSelectedUserTab(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".nav-pills >li.active");
    },
    getUsersCards(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".all-users>.user-card");
    },
    getUserCardIcon(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-users>:nth-child(${index})>div>i`);
    },
    getUserCardName(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-users>:nth-child(${index})>div>.name`);
    },
    getUserCardEmail(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-users>:nth-child(${index})>div>.email`);
    },
    getUserCardRole(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`:nth-child(${index})>div>.role-wrapper>.text-capitalize`);
    },
    getUserCardTag1(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`:nth-child(${index})>div>.role-wrapper>:nth-child(3)`);
    },
    getSendEmailButton(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `:nth-child(${index})>.action-items>[title='Send Invitation Email']`,
      );
    },
    getEditUserButton(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`:nth-child(${index})>.action-items>[title='Edit User']`);
    },
    getDeleteUserButton(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `:nth-child(${index})>.action-items>[title='Delete Invitation']`,
      );
    },
    getPageButtonWithText(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".justify-content-between>div>button");
    },
    getUserModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-content");
    },
    getUserModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-header>.modal-title");
    },
    getUserModalLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>.form-label`);
    },
    getModalSubmitBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-footer>button[type='submit']");
    },
    getUserCardIndex(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.all-question>.question-card:nth-child(${index})`);
    },
    getUserModalEmailInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>div>${fieldType}`);
    },
    getUserModalEmailValidation(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>div>.text-danger`);
    },
    getUserModalInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>${fieldType}`);
    },
    getUserModalInputValidation(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-body>:nth-child(${fieldIndex})>.text-danger`);
    },
    getModalUserTypeDropdown(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-body>:nth-child(4)>select");
    },
    getModalSelectAdminParticipantDropdown(): Cypress.Chainable<
      JQuery<HTMLElement>
    > {
      return cy.get(".modal-body>:nth-child(5)>select");
    },
    getAddUserSaveBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        '#add-modal>div>div>form>.modal-footer>button[type="submit"]',
      );
    },
    getEditUserModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-backdrop>#edit-modal");
    },
    getEditUserModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        "#edit-modal>.modal-dialog>.modal-content>.modal-header>.modal-title",
      );
    },
    getEditUserLabel(
      fieldIndex: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#edit-modal>div>div>form>div>div:nth-child(${fieldIndex})>label`,
      );
    },
    getEditUserInput(
      fieldIndex: number,
      fieldType: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `#edit-modal>div>div>form>div>div:nth-child(${fieldIndex})>${fieldType}`,
      );
    },
    getEditUserSubmitBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        '#edit-modal>div>div>form>.modal-footer>button[type="submit"]',
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
  clickOnUserEditBtn(fieldIndex: number): void {
    this.elements.getEditUserButton(fieldIndex).click();
  }

  /**
   * @returns
   */
  clickOnUserDeleteBtn(fieldIndex: number): void {
    this.elements.getDeleteUserButton(fieldIndex).click();
  }
}
export default new ManageUsersPage();

// if (AddUserData.user_type === "participant") {
//   this.manageUsersData.add_participant_form_fields.forEach(function (
//     field: UserFormField,
//     index: number,
//   ) {
//     const fieldIndex = index + 5;
//     //label
//     commonPage.verifyIfElementVisible(
//       manageUsersPage.elements.getUserModalLabel(fieldIndex),
//     );

//     commonPage.verifyElementText(
//       manageUsersPage.elements.getUserModalLabel(fieldIndex),
//       field.label,
//     );

//     //input
//     commonPage.verifyIfElementVisible(
//       manageUsersPage.elements.getUserModalLabel(fieldIndex),
//     );
//     commonPage.verifyIfElementEnabled(
//       manageUsersPage.elements.getUserModalLabel(fieldIndex),
//     );
//   });
// }
// if (AddUserData.user_type === "rater") {
//   this.manageUsersData.add_rater_form_fields.forEach(function (
//     field: UserFormField,
//     index: number,
//   ) {
//     const fieldIndex = index + 5;
//     //label
//     commonPage.verifyIfElementVisible(
//       manageUsersPage.elements.getUserModalLabel(fieldIndex),
//     );

//     commonPage.verifyElementText(
//       manageUsersPage.elements.getUserModalLabel(fieldIndex),
//       field.label,
//     );

//     //input
//     commonPage.verifyIfElementVisible(
//       manageUsersPage.elements.getUserModalLabel(fieldIndex),
//     );
//     commonPage.verifyIfElementEnabled(
//       manageUsersPage.elements.getUserModalLabel(fieldIndex),
//     );
//   });
// }
