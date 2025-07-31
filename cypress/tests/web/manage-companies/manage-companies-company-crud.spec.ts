import commonPage from "../../../pages/commonPage";
import manageCompanyPage from "../../../pages/manageCompanyPage";
import common from "../../../helpers/common";
import { CompanyInfo } from "../../../interfaces/company-info";
import { CompanyFormField } from "../../../interfaces/form-field";
import { faker } from "@faker-js/faker";
import {
  defaultFakeEmailOptions,
  defaultCompanyOptions,
} from "../../../interfaces/fake-info";

let isQuestionFreezed: boolean;
let randomAddCompanyLogo: number;
let randomEditCompanyLogo: number;
const current_date: string = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const AddCompanyData: CompanyInfo = {
  company_name: faker.person.fullName({
    lastName: defaultCompanyOptions.lastname,
  }),
  company_email: faker.internet.email({
    lastName: "company+",
    provider: defaultFakeEmailOptions.provider,
  }),
  company_description: faker.lorem.lines(1),
  company_logo: "",
};

const UpdateCompanyData: CompanyInfo = {
  company_name: faker.person.fullName({
    lastName: defaultCompanyOptions.lastname,
  }),
  company_email: faker.internet.email({
    lastName: "company+",
    provider: defaultFakeEmailOptions.provider,
  }),
  company_description: faker.lorem.lines(1),
  company_logo: "",
};

describe("Test The Manage Companies Page: Company Create, Read, Update, Delete", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_super_admin);
        randomAddCompanyLogo = common.getRandomNumberInBetween(
          1,
          commonData.how_many_company_logo,
        );
        randomEditCompanyLogo = common.getRandomNumberInBetween(
          1,
          commonData.how_many_company_logo,
        );
      });
    cy.fixture("manageCompanyData.json")
      .as("manageCompanyData")
      .then((manageCompanyData) => {
        commonPage.openPageUrl(manageCompanyData.manage_question_page_url);
        commonPage.verifyPageUrl(manageCompanyData.manage_question_page_url);
      });

    common.checkIfSTQuestionsFreezed().then((isFreezed) => {
      isQuestionFreezed = isFreezed ? true : false;
    });
  });

  /**
   * TEST: Testing the manage companies page
   * TEST STEP: click on the Left menu manage companies > Add company
   * EXPECTED RESULT: Add company functionality should work correctly in manage companies page
   */
  it("Add company functionality should work correctly in manage companies page", function () {
    //<<Start Set Data to fill form
    AddCompanyData.company_logo = `${this.commonData.assets_path}${randomAddCompanyLogo}.png`;
    // Set Data to fill form End>>

    //verifying whether the questions are freezed
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageCompanyData.page_url);
      commonPage.verifyPageUrl(this.manageCompanyData.page_url);
      //click on add company button
      commonPage.clickOnElementWithText(
        manageCompanyPage.elements.getPageTopButton(),
        this.manageCompanyData.page_add_company_button.label,
      );
      //add company modal should open
      commonPage.verifyIfElementVisible(
        manageCompanyPage.elements.getCompanyModal(),
      );

      // close modal
      commonPage.verifyIfElementVisible(
        commonPage.elements.getCloseModalButton(),
      );

      commonPage.clickOnCloseModalButton();

      //re-open modal
      commonPage.clickOnElementWithText(
        manageCompanyPage.elements.getPageTopButton(),
        this.manageCompanyData.page_add_company_button.label,
      );

      //modal title
      commonPage.verifyIfElementVisible(
        manageCompanyPage.elements.getCompanyModalTitle(),
      );

      commonPage.verifyElementText(
        manageCompanyPage.elements.getCompanyModalTitle(),
        this.manageCompanyData.add_company_title,
      );

      //form
      this.manageCompanyData.add_company_form_fields.forEach(function (
        field: CompanyFormField,
        index: number,
      ) {
        const fieldIndex = index + 1;
        //label
        commonPage.verifyIfElementVisible(
          manageCompanyPage.elements.getAddEditCompanyLabel(fieldIndex),
        );

        commonPage.verifyElementText(
          manageCompanyPage.elements.getAddEditCompanyLabel(fieldIndex),
          field.label,
        );

        //input
        if (field.type === "file") {
          //not visible due to CSS property, opacity: 0
          commonPage.verifyIfElementEnabled(
            manageCompanyPage.elements.getAddEditCompanyLogoInput(
              fieldIndex,
              field.type,
            ),
          );
        } else {
          commonPage.verifyIfElementVisible(
            manageCompanyPage.elements.getAddEditCompanyInput(
              fieldIndex,
              field.type,
            ),
          );
          commonPage.verifyIfElementEnabled(
            manageCompanyPage.elements.getAddEditCompanyInput(
              fieldIndex,
              field.type,
            ),
          );
        }
      });

      //submit btn
      commonPage.verifyIfElementVisible(
        manageCompanyPage.elements.getModalSubmitBtn(),
      );

      commonPage.verifyIfElementEnabled(
        manageCompanyPage.elements.getModalSubmitBtn(),
      );

      commonPage.verifyElementText(
        manageCompanyPage.elements.getModalSubmitBtn(),
        this.manageCompanyData.save_btn_text,
      );
      commonPage.clickOnCloseModalButton();

      //type in inputs
      cy.createNewCompany(
        AddCompanyData.company_name,
        AddCompanyData.company_email,
        AddCompanyData.company_description,
        AddCompanyData.company_logo,
      );

      //verify success message after form submission
      commonPage.verifySucessToastMessage(
        this.manageCompanyData.add_company_success_message,
      );
      //verify added data
      commonPage.loaderNotVisible();
      const positionOfCard = this.manageCompanyData.index_of_first_company_card;
      cy.verifyCompanyCardData(
        positionOfCard,
        AddCompanyData.company_name,
        AddCompanyData.company_email,
        current_date,
      );
    } else {
      //verify the left menu is not accessible
      commonPage.clickOnLeftMenuWithText(
        this.commonData.manage_companies_left_menu,
      );
      commonPage.verifyErrorToastMessage(
        this.commonData.left_menu_disabled_message,
      );
    }
  });

  /**
   * TEST: Testing the manage companies page
   * TEST STEP: click on the Left menu manage companies > Click the edit button in company card
   * EXPECTED RESULT: Edit company functionality should work correctly in manage companies page
   */
  it("Edit company functionality should work correctly in manage company page", function () {
    //<<Start Set Data to fill form
    UpdateCompanyData.company_logo = `${this.commonData.assets_path}${randomEditCompanyLogo}.png`;
    // Set Data to fill form End>>
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageCompanyData.page_url);
      commonPage.verifyPageUrl(this.manageCompanyData.page_url);
      manageCompanyPage.elements
        .getCompanyCards()
        .each((CompanyCard, CompanyCardIndex) => {
          cy.log("Company Card: ", CompanyCard);
          const positionOfCard = CompanyCardIndex + 2;

          manageCompanyPage.elements
            .getCompanyCardName(positionOfCard)
            .invoke("text")
            .then((CompanyName) => {
              if (CompanyName === AddCompanyData.company_name) {
                //open modal
                manageCompanyPage.clickOnCompanyEditBtn(positionOfCard);

                //edit Company modal should open
                commonPage.verifyIfElementVisible(
                  manageCompanyPage.elements.getCompanyModal(),
                );

                //close modal
                commonPage.verifyIfElementVisible(
                  commonPage.elements.getCloseModalButton(),
                );
                commonPage.clickOnCloseModalButton();

                //open modal
                manageCompanyPage.clickOnCompanyEditBtn(positionOfCard);

                //modal title
                commonPage.verifyIfElementVisible(
                  manageCompanyPage.elements.getCompanyModalTitle(),
                );
                commonPage.verifyElementText(
                  manageCompanyPage.elements.getCompanyModalTitle(),
                  this.manageCompanyData.update_company_title,
                );

                //check update button
                commonPage.verifyIfElementVisible(
                  manageCompanyPage.elements.getModalSubmitBtn(),
                );

                commonPage.verifyIfElementEnabled(
                  manageCompanyPage.elements.getModalSubmitBtn(),
                );

                commonPage.verifyElementText(
                  manageCompanyPage.elements.getModalSubmitBtn(),
                  this.manageCompanyData.update_btn_text,
                );

                //edit form
                this.manageCompanyData.edit_company_form_fields.forEach(
                  (field: CompanyFormField, index: number) => {
                    const fieldIndex = index + 1;
                    //label
                    commonPage.verifyIfElementVisible(
                      manageCompanyPage.elements.getAddEditCompanyLabel(
                        fieldIndex,
                      ),
                    );

                    commonPage.verifyElementText(
                      manageCompanyPage.elements.getAddEditCompanyLabel(
                        fieldIndex,
                      ),
                      field.label,
                    );

                    //input
                    if (field.type === "file") {
                      //element not visible due to CSS property, opacity: 0
                      commonPage.verifyIfElementEnabled(
                        manageCompanyPage.elements.getAddEditCompanyLogoInput(
                          fieldIndex,
                          field.type,
                        ),
                      );
                    } else {
                      commonPage.verifyIfElementVisible(
                        manageCompanyPage.elements.getAddEditCompanyInput(
                          fieldIndex,
                          field.type,
                        ),
                      );
                      commonPage.verifyIfElementEnabled(
                        manageCompanyPage.elements.getAddEditCompanyInput(
                          fieldIndex,
                          field.type,
                        ),
                      );
                    }
                    //type in input
                    if (field.type === "file") {
                      commonPage.uploadFileInField(
                        manageCompanyPage.elements.getAddEditCompanyLogoInput(
                          fieldIndex,
                          field.type,
                        ),
                        UpdateCompanyData[field.name],
                      );
                      manageCompanyPage.clickOnEditCompanySubmitBtn();
                    } else {
                      commonPage.typeValueInField(
                        manageCompanyPage.elements.getAddEditCompanyInput(
                          fieldIndex,
                          field.type,
                        ),
                        UpdateCompanyData[field.name],
                      );
                    }
                  },
                );

                //verify success message after form submission
                commonPage.verifySucessToastMessage(
                  this.manageCompanyData.edit_company_success_message,
                );
                //verify updated data
                commonPage.loaderNotVisible();
                const cardIndex =
                  this.manageCompanyData.index_of_first_company_card;
                cy.verifyCompanyCardData(
                  cardIndex,
                  UpdateCompanyData.company_name,
                  UpdateCompanyData.company_email,
                  current_date,
                );
              }
            });
        });
    } else {
      //verify the left menu is not accessible
      commonPage.clickOnLeftMenuWithText(
        this.commonData.manage_companies_left_menu,
      );
      commonPage.verifyErrorToastMessage(
        this.commonData.left_menu_disabled_message,
      );
    }
  });

  /**
   * TEST: Testing the manage Companies page
   * TEST STEP: click on the Left menu manage Companies > Click the edit button in company card
   * EXPECTED RESULT: Delete company functionality should work correctly in manage companies page
   */
  it("Delete company functionality should work correctly in manage companies page", function () {
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageCompanyData.page_url);
      commonPage.verifyPageUrl(this.manageCompanyData.page_url);

      let companiesLeft: number;

      manageCompanyPage.elements
        .getCompanyCards()
        .its("length")
        .then((length) => {
          companiesLeft = length - 1;
        });

      manageCompanyPage.elements
        .getCompanyCards()
        .each((CompanyCard, CompanyCardIndex) => {
          cy.log("CompanyCard: ", CompanyCard);
          const positionOfCard = CompanyCardIndex + 2;

          if (positionOfCard <= companiesLeft) {
            manageCompanyPage.elements
              .getCompanyCardName(positionOfCard)
              .invoke("text")
              .then((CompanyName) => {
                if (CompanyName === UpdateCompanyData.company_name) {
                  //open delete modal
                  manageCompanyPage.clickOnCompanyDeleteBtn(positionOfCard);

                  //delete company modal should open
                  commonPage.verifyIfElementVisible(
                    manageCompanyPage.elements.getCompanyModal(),
                  );

                  //verify confirmation modal
                  commonPage.verifyConfirmationModal(
                    this.manageCompanyData.delete_confirmation_message,
                    this.commonData.confirmation_cancel_button_text,
                    this.commonData.confirmation_delete_button_text,
                  );

                  //click modal cancel button
                  commonPage.clickOnConfirmationModalButton(
                    this.commonData.confirmation_cancel_button_text,
                  );

                  //delete company
                  cy.deleteCompany(positionOfCard);

                  //verify success message
                  commonPage.verifySucessToastMessage(
                    this.manageCompanyData.delete_company_success_message,
                  );

                  // Verify the deleted data
                  commonPage.loaderNotVisible();
                  manageCompanyPage.elements
                    .getCompanyCards()
                    .each((CompanyCard, CompanyCardIndex) => {
                      cy.log("Company Card : ", CompanyCard);
                      const positionOfCard = CompanyCardIndex + 2;

                      manageCompanyPage.elements
                        .getCompanyCardName(positionOfCard)
                        .invoke("text")
                        .then((CompanyName) => {
                          expect(CompanyName).not.equal(
                            UpdateCompanyData.company_name,
                          );
                        });
                    });
                }
              });
          }
        });
    } else {
      //verify the left menu is not accessible
      commonPage.clickOnLeftMenuWithText(
        this.commonData.manage_companies_left_menu,
      );
      commonPage.verifyErrorToastMessage(
        this.commonData.left_menu_disabled_message,
      );
    }
  });
});
