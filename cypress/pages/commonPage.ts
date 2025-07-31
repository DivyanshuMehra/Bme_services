class commonPage {
  elements = {
    getEyeIcon(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".bi-eye-slash-fill");
    },
    getProfileNameLink(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".page-header>.ms-auto>button");
    },
    getValidationErrorContainerHeading(): Cypress.Chainable<
      JQuery<HTMLHeadingElement>
    > {
      return cy
        .get(".login-form")
        .find('div[class="alert alert-danger"]')
        .find("h4");
    },
    getValidationErrorLists(): Cypress.Chainable<JQuery<HTMLLIElement>> {
      return cy
        .get(".login-form")
        .find('div[class="alert alert-danger"]')
        .find("ul")
        .find("li");
    },
    getSuccessToastMessageContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".v-toast__item--success>.v-toast__text");
    },
    getErrorToastMessageContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".v-toast__item--error>.v-toast__text");
    },
    getDeleteUserModalMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".modal-body>p");
    },
    getLeftMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".navbar-nav>li>a");
    },
    getLeftMenuLogo(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".aside-sidebar>div>a>img");
    },
    getSelectedLeftMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".navbar-nav>li.active");
    },
    getPageHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".justify-content-between>h2");
    },
    getPageTopButtons(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.app-page>.justify-content-between>div>button:nth-child(${index})`,
      );
    },
    getPageTopButtonWithText(
      buttonLabel: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy
        .get(`.app-page>.justify-content-between>div>button`)
        .contains(buttonLabel);
    },
    getPaginationFirstIndex(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".pagination>:first-child>.page-link");
    },
    getPaginationLastButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(".pagination>:last-child>.page-link");
    },
    getPaginationIndex(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.pagination>:nth-child(${index})>.page-link`);
    },
    getPaginationLastIndex(
      index: number,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.pagination>:nth-last-child(${index})>.page-link`);
    },
    getPaginationActiveIndex(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.pagination>li>.active`);
    },
    getChooseAccountRole(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`form>.role-list`);
    },
    getCloseModalButton(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-header>.btn-close`);
    },
    getConfirmationModal(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(`.modal-backdrop>.modal>.modal-dialog`);
    },
    getConfirmationModalMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy.get(
        `.modal-backdrop>.modal>.modal-dialog>.modal-content>.modal-body>h5`,
      );
    },
    getConfirmationModalButton(
      buttonLabel: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy
        .get(
          `.modal-backdrop>.modal>.modal-dialog>.modal-content>.modal-body>div>button`,
        )
        .contains(buttonLabel);
    },
  };

  /**
   * @param buttonLabel
   */
  clickOnConfirmationModalButton(buttonLabel: string): void {
    this.elements.getConfirmationModalButton(buttonLabel).click();
  }

  /**
   *
   * @param buttonLabel
   */
  clickOnPageTopButtonWithText(buttonLabel: string): void {
    this.elements.getPageTopButtonWithText(buttonLabel).click();
  }

  /**
   * @returns
   */
  clickOnProfileNameLink(): void {
    this.elements.getProfileNameLink().click();
  }

  /**
   * @returns
   */
  clickOnPaginationFirstIndex(): void {
    this.elements.getPaginationFirstIndex().click();
  }

  /**
   *
   * @returns
   */
  clickOnPaginationLastButton(): void {
    this.elements.getPaginationLastButton().click();
  }

  /**
   * @param index
   */
  clickOnPaginationIndex(index: number): void {
    this.elements.getPaginationIndex(index).click();
  }

  /**
   * @param text
   */
  clickOnChooseRoleButton(text: string): void {
    this.elements.getChooseAccountRole().contains(text).click();
  }

  /**
   * @returns
   */
  clickOnCloseModalButton(): void {
    this.elements.getCloseModalButton().click();
  }

  /**
   * @param pageUrl
   */
  openPageUrl(pageUrl: string): void {
    cy.visit(pageUrl);
  }

  /**
   * @param element
   */
  verifyIFPaginationPageIsActive(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
  ): void {
    element.should("have.class", "active");
  }

  /**
   * @param url
   */
  verifyPageUrl(url: string): void {
    cy.url().should("include", url);
  }

  /**
   * @returns
   */
  verifyIfLeftMenuLogoIsVisible() {
    this.elements
      .getLeftMenuLogo()
      .should("have.attr", "src", "/assets/logo-DD4Vzk6N.png");
  }

  /**
   * @param buttonLabel
   */
  clickOnLeftMenuWithText(buttonLabel: string) {
    this.elements.getLeftMenu().contains(buttonLabel).click();
  }

  /**
   * @param title
   */
  verifyPageTitle(title: string): void {
    cy.title().should("include", title);
  }
  /**
   * @param element
   * @param value
   */
  verifyPlaceholder(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    value: string,
  ): void {
    element.should("have.attr", "placeholder", value);
  }

  /**
   * @returns void
   */
  loaderVisible(): void {
    cy.get(".vl-icon").should("exist");
  }

  /**
   * @return
   */
  loaderNotVisible(): void {
    cy.get(".vl-icon").should("not.exist");
  }

  /**
   *
   * @returns
   */
  verfiyValidationErrorContainer(): void {
    this.elements
      .getValidationErrorContainerHeading()
      .should("contain", "Error");
  }

  /**
   *
   * @param element
   */
  verifyIfElementVisible(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
  ): void {
    element.should("be.visible");
  }

  /**
   *
   * @param element
   */
  verifyElementNotExist(element: Cypress.Chainable<JQuery<HTMLElement>>): void {
    element.should("not.exist");
  }

  /**
   *
   * @param element
   */
  verifyIfElementEnabled(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
  ): void {
    element.should("be.enabled");
  }

  /**
   *
   * @param element
   */
  verifyIfElementIsNotEnabled(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
  ): void {
    element.should("not.be.enabled");
  }

  /**
   *
   * @param element
   */
  verifyIfElementDisabled(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
  ): void {
    element.should("be.disabled");
  }

  /**
   *
   * @param element
   */
  verifyIfElementIsNotDisabled(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
  ): void {
    element.should("not.be.disabled");
  }

  /**
   *
   * @param element
   * @param className
   */
  verifyIfElementHaveClass(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    className: string,
  ): void {
    element.should("have.class", className);
  }

  /**
   *
   * @param element
   * @param value
   */
  verifyMaximumLength(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    value: number,
  ) {
    element.should("have.length.at.most", value);
  }
  /**
   *
   * @param element
   * @param attr
   * @param value
   */
  verifyElementAttributeValue(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    attr: string,
    value: string | boolean,
  ): void {
    element.should("have.attr", attr, value);
  }

  /**
   * @param element
   * @param text
   */
  verifyElementText(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    text: string | number,
  ): void {
    element.should("have.text", text);
  }

  /**
   * @param element
   * @param text
   */
  verifyElementContainsText(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    text: string | number,
  ): void {
    element.should("contain", text);
  }

  /**
   *
   * @param element
   * @param text
   */
  verifyIfElementContainText(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    text: string | number,
  ): void {
    element.should("contain.text", text);
  }

  /**
   *
   * @param element
   * @param value
   */
  verifyElementValue(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    value: string,
  ): void {
    element.should("have.value", value);
  }

  /**
   *
   * @param element
   * @param value
   */
  typeValueInField(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    value: any,
  ): void {
    element.clear();
    element.type(value);
  }

  /**
   *
   * @param element
   * @param path
   */
  uploadFileInField(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    path: string,
  ): void {
    element.selectFile(path);
  }

  /**
   *
   * @param element
   * @param value
   */
  selectDropdownText(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    text: any,
  ): void {
    element.select(text);
  }

  /**
   *
   * @param element
   * @param buttonText
   */
  clickOnElementWithText(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    buttonText: string,
  ): void {
    element.contains(buttonText).click();
  }

  /**
   *
   * @param message
   */
  verifySucessToastMessage(message: string) {
    this.elements
      .getSuccessToastMessageContainer()
      .should("have.text", message);
  }

  /**
   *
   * @param message
   */
  verifyErrorToastMessage(message: string) {
    this.elements.getErrorToastMessageContainer().should("have.text", message);
  }

  /**
   *
   * @param displayName
   */
  verifyProfileName(displayName: string) {
    this.elements.getProfileNameLink().should("contain", displayName);
  }

  /**
   * @returns
   */
  verifyPagination() {
    const pagination_previous_arrow_position = 2;
    const pagination_first_arrow_position = 1;
    const pagination_next_arrow_position_from_last = 2;
    const pagination_last_arrow_position_from_last = 1;
    const pagination_default_selected_page = 1;
    //by default
    //first two pagination arrow will be disabled
    //pagination page 1 should be selected and active
    this.verifyIfElementIsNotEnabled(
      this.elements.getPaginationIndex(pagination_previous_arrow_position),
    );

    this.verifyIfElementIsNotEnabled(
      this.elements.getPaginationIndex(pagination_first_arrow_position),
    );

    this.verifyIfElementIsNotDisabled(
      this.elements.getPaginationLastIndex(
        pagination_next_arrow_position_from_last,
      ),
    );

    this.verifyIfElementIsNotDisabled(
      this.elements.getPaginationLastIndex(
        pagination_last_arrow_position_from_last,
      ),
    );

    this.elements
      .getPaginationActiveIndex()
      .should("contain.text", pagination_default_selected_page);

    //click on last arrow and last arrows should be disabled and first arrows should be enabled
    this.elements
      .getPaginationLastIndex(pagination_last_arrow_position_from_last)
      .click();

    this.verifyIfElementIsNotDisabled(
      this.elements.getPaginationIndex(pagination_previous_arrow_position),
    );

    this.verifyIfElementIsNotDisabled(
      this.elements.getPaginationIndex(pagination_first_arrow_position),
    );

    this.verifyIfElementIsNotEnabled(
      this.elements.getPaginationLastIndex(
        pagination_next_arrow_position_from_last,
      ),
    );

    this.verifyIfElementIsNotEnabled(
      this.elements.getPaginationLastIndex(
        pagination_last_arrow_position_from_last,
      ),
    );
  }

  verifyConfirmationModal(
    confirmation_message: string,
    cancel_button_text: string,
    action_button_text: string,
  ) {
    //verify modal
    this.verifyIfElementVisible(this.elements.getConfirmationModal());

    //verify modal message
    this.verifyIfElementVisible(this.elements.getConfirmationModalMessage());

    this.verifyElementText(
      this.elements.getConfirmationModalMessage(),
      confirmation_message,
    );

    //verify buttons
    this.verifyIfElementVisible(
      this.elements.getConfirmationModalButton(cancel_button_text),
    );

    this.verifyIfElementVisible(
      this.elements.getConfirmationModalButton(action_button_text),
    );
  }
}

export default new commonPage();
