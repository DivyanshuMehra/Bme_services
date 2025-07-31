import commonPage from "../../../pages/commonPage";
import manageCompanyPage from "../../../pages/manageCompanyPage";
import common from "../../../helpers/common";
import { CompanyQuestionInfo } from "../../../interfaces/questions-info";
import { faker } from "@faker-js/faker";
import { CompanyInfo } from "../../../interfaces/company-info";
import { defaultFakeEmailOptions } from "../../../interfaces/fake-info";

let isQuestionFreezed: boolean;
let randomCompanyLogo: number;

const AddCompanyData: CompanyInfo = {
  company_name: faker.company.name(),
  company_email: faker.internet.email({
    lastName: "company+",
    provider: defaultFakeEmailOptions.provider,
  }),
  company_description: faker.lorem.lines(1),
  company_logo: "",
};

const AddQuestionData: CompanyQuestionInfo = {
  question: faker.lorem.lines(1),
};

const UpdateQuestionData: CompanyQuestionInfo = {
  question: faker.lorem.lines(1),
};

describe("Test The Manage companies Page: Question Create, Read, Update, Delete", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_super_admin);
        randomCompanyLogo = common.getRandomNumberInBetween(
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
   * TEST: Testing the questions in manage companies page
   * TEST STEP: click on the Left menu manage companies > Add Question
   * EXPECTED RESULT: Add question functionality should work correctly in manage companies page
   */
  it("Add question functionality should work correctly in manage companies page", function () {
    //<<Start Set Data to fill form
    AddCompanyData.company_logo = `${this.commonData.assets_path}${randomCompanyLogo}.png`;
    // Set Data to fill form End>>
    //verifying whether the questions are freezed
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageCompanyData.page_url);
      commonPage.verifyPageUrl(this.manageCompanyData.page_url);
      //create a new company
      cy.createNewCompany(
        AddCompanyData.company_name,
        AddCompanyData.company_email,
        AddCompanyData.company_description,
        AddCompanyData.company_logo,
      );
      commonPage.loaderNotVisible();

      //searching for the added company
      manageCompanyPage.elements
        .getCompanyCards()
        .each((CompanyCard, CompanyCardIndex) => {
          cy.log("CompanyCard: ", CompanyCard);
          const positionOfCard = CompanyCardIndex + 2;
          const positionOfQuestionCard = CompanyCardIndex + 1;

          manageCompanyPage.elements
            .getCompanyCardName(positionOfCard)
            .invoke("text")
            .then((CompanyName) => {
              if (CompanyName === AddCompanyData.company_name) {
                //click on added company to view details
                commonPage.clickOnElementWithText(
                  manageCompanyPage.elements.getCompanyCardName(positionOfCard),
                  AddCompanyData.company_name,
                );
                commonPage.loaderNotVisible();
                //click on the add question tab under a company
                commonPage.clickOnElementWithText(
                  manageCompanyPage.elements.getCompanyDetailsTabs(),
                  this.manageCompanyData.company_add_question_tab.label,
                );
                commonPage.verifyPageUrl(
                  this.manageCompanyData.add_question_page_url,
                );

                //click on the add question button
                commonPage.clickOnElementWithText(
                  manageCompanyPage.elements.getCompanyQuestionPageButtons(),
                  this.manageCompanyData.add_question_button.label,
                );
                //add question modal should open
                commonPage.verifyIfElementVisible(
                  manageCompanyPage.elements.getAddQuestionModal(),
                );

                // close modal
                commonPage.verifyIfElementVisible(
                  commonPage.elements.getCloseModalButton(),
                );
                commonPage.clickOnCloseModalButton();

                //re-open modal
                commonPage.clickOnElementWithText(
                  manageCompanyPage.elements.getCompanyQuestionPageButtons(),
                  this.manageCompanyData.add_question_button.label,
                );

                //modal title
                commonPage.verifyIfElementVisible(
                  manageCompanyPage.elements.getQuestionModalTitle(),
                );
                commonPage.verifyElementText(
                  manageCompanyPage.elements.getQuestionModalTitle(),
                  this.manageCompanyData.add_question_modal_title,
                );

                //form label
                commonPage.verifyIfElementVisible(
                  manageCompanyPage.elements.getAddQuestionLabel(),
                );

                commonPage.verifyElementText(
                  manageCompanyPage.elements.getAddQuestionLabel(),
                  this.manageCompanyData.add_question_form_field.label,
                );

                //input
                commonPage.verifyIfElementVisible(
                  manageCompanyPage.elements.getAddQuestionInput(),
                );

                commonPage.verifyIfElementEnabled(
                  manageCompanyPage.elements.getAddQuestionInput(),
                );

                //type in input
                commonPage.typeValueInField(
                  manageCompanyPage.elements.getAddQuestionInput(),
                  AddQuestionData.question,
                );

                //save btn
                commonPage.verifyIfElementVisible(
                  manageCompanyPage.elements.getQuestionModalSaveBtn(),
                );

                commonPage.verifyIfElementEnabled(
                  manageCompanyPage.elements.getQuestionModalSaveBtn(),
                );

                commonPage.verifyElementText(
                  manageCompanyPage.elements.getQuestionModalSaveBtn(),
                  this.manageCompanyData.question_submit_button_text,
                );
                //submit form and verify success message
                manageCompanyPage.clickOnQuestionModalSaveBtn();
                commonPage.verifySucessToastMessage(
                  this.manageCompanyData.add_question_success_message,
                );

                //verify added data
                commonPage.loaderNotVisible();
                cy.verifyQuestionCardData(
                  positionOfQuestionCard,
                  AddQuestionData.question,
                  this.manageCompanyData.company_question_type,
                  this.manageCompanyData
                    .company_question_category_and_sub_category,
                  this.manageCompanyData
                    .company_question_category_and_sub_category,
                );

                //back to companies page
                commonPage.openPageUrl(this.manageCompanyData.page_url);
                commonPage.verifyPageUrl(this.manageCompanyData.page_url);
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
   * TEST: Testing the questions in manage companies page
   * TEST STEP: click on the Left menu manage companies > Add Question
   * EXPECTED RESULT: Edit companies functionality should work correctly in manage companies page
   */
  it("Edit question functionality should work correctly in manage companies page", function () {
    //verifying whether the questions are freezed
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageCompanyData.page_url);
      commonPage.verifyPageUrl(this.manageCompanyData.page_url);

      //searching for the added company
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
                //click on added company to view details
                commonPage.clickOnElementWithText(
                  manageCompanyPage.elements.getCompanyCardName(positionOfCard),
                  AddCompanyData.company_name,
                );
                commonPage.loaderNotVisible();

                //click on the add question tab under a company
                commonPage.clickOnElementWithText(
                  manageCompanyPage.elements.getCompanyDetailsTabs(),
                  this.manageCompanyData.company_add_question_tab.label,
                );
                commonPage.verifyPageUrl(
                  this.manageCompanyData.add_question_page_url,
                );

                manageCompanyPage.elements
                  .getCompanyQuestionCards()
                  .each((QuestionCard, QuestionCardIndex) => {
                    cy.log("QuestionCard", QuestionCard);
                    const positionOfCard = QuestionCardIndex + 1;

                    manageCompanyPage.elements
                      .getCompanyQuestionCardQuestion(positionOfCard)
                      .invoke("text")
                      .then((questionText) => {
                        if (questionText === AddQuestionData.question) {
                          //open edit modal
                          manageCompanyPage.clickOnQuestionThreeDotBtn(
                            positionOfCard,
                          );
                          manageCompanyPage.clickOnQuestionThreeDotActionBtn(
                            positionOfCard,
                            this.manageCompanyData.question_edit_action_label,
                          );

                          //edit question modal should open
                          commonPage.verifyIfElementVisible(
                            manageCompanyPage.elements.getEditQuestionModal(),
                          );

                          // close modal
                          commonPage.verifyIfElementVisible(
                            commonPage.elements.getCloseModalButton(),
                          );
                          commonPage.clickOnCloseModalButton();

                          //re-open modal
                          manageCompanyPage.clickOnQuestionThreeDotBtn(
                            positionOfCard,
                          );
                          manageCompanyPage.clickOnQuestionThreeDotActionBtn(
                            positionOfCard,
                            this.manageCompanyData.question_edit_action_label,
                          );

                          //modal title
                          commonPage.verifyIfElementVisible(
                            manageCompanyPage.elements.getQuestionModalTitle(),
                          );

                          commonPage.verifyElementText(
                            manageCompanyPage.elements.getQuestionModalTitle(),
                            this.manageCompanyData.edit_question_modal_title,
                          );

                          //edit form: label
                          commonPage.verifyIfElementVisible(
                            manageCompanyPage.elements.getAddQuestionLabel(),
                          );

                          commonPage.verifyElementText(
                            manageCompanyPage.elements.getAddQuestionLabel(),
                            this.manageCompanyData.edit_question_form_field
                              .label,
                          );

                          //input
                          commonPage.verifyIfElementVisible(
                            manageCompanyPage.elements.getAddQuestionInput(),
                          );

                          commonPage.verifyIfElementEnabled(
                            manageCompanyPage.elements.getAddQuestionInput(),
                          );

                          //type in input
                          commonPage.typeValueInField(
                            manageCompanyPage.elements.getAddQuestionInput(),
                            UpdateQuestionData.question,
                          );

                          //check update button
                          commonPage.verifyIfElementVisible(
                            manageCompanyPage.elements.getQuestionModalSaveBtn(),
                          );

                          commonPage.verifyIfElementEnabled(
                            manageCompanyPage.elements.getQuestionModalSaveBtn(),
                          );

                          commonPage.verifyElementText(
                            manageCompanyPage.elements.getQuestionModalSaveBtn(),
                            this.manageCompanyData.update_btn_text,
                          );

                          //submit update form
                          manageCompanyPage.clickOnQuestionModalSaveBtn();
                          commonPage.verifySucessToastMessage(
                            this.manageCompanyData
                              .update_question_success_message,
                          );

                          //todo: verify updated data
                          commonPage.loaderNotVisible();
                          cy.verifyQuestionCardData(
                            positionOfCard,
                            UpdateQuestionData.question,
                            this.manageCompanyData.company_question_type,
                            this.manageCompanyData
                              .company_question_category_and_sub_category,
                            this.manageCompanyData
                              .company_question_category_and_sub_category,
                          );

                          //back to companies page
                          commonPage.openPageUrl(
                            this.manageCompanyData.page_url,
                          );
                          commonPage.verifyPageUrl(
                            this.manageCompanyData.page_url,
                          );
                        }
                      });
                  });
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
   * TEST: Testing the questions in manage companies page
   * TEST STEP: click on the Left menu manage companies > Add Question
   * EXPECTED RESULT: Delete question functionality should work correctly in manage companies page
   */
  it("Delete question functionality should work correctly in manage companies page", function () {
    //verifying whether the questions are freezed
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageCompanyData.page_url);
      commonPage.verifyPageUrl(this.manageCompanyData.page_url);

      //searching for the added company
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
                //click on added company to view details
                commonPage.clickOnElementWithText(
                  manageCompanyPage.elements.getCompanyCardName(positionOfCard),
                  AddCompanyData.company_name,
                );
                commonPage.loaderNotVisible();

                //click on the add question tab under a company
                commonPage.clickOnElementWithText(
                  manageCompanyPage.elements.getCompanyDetailsTabs(),
                  this.manageCompanyData.company_add_question_tab.label,
                );
                commonPage.verifyPageUrl(
                  this.manageCompanyData.add_question_page_url,
                );

                manageCompanyPage.elements
                  .getCompanyQuestionCards()
                  .each((QuestionCard, QuestionCardIndex) => {
                    cy.log("QuestionCard", QuestionCard);
                    const positionOfCard = QuestionCardIndex + 1;

                    manageCompanyPage.elements
                      .getCompanyQuestionCardQuestion(positionOfCard)
                      .invoke("text")
                      .then((questionText) => {
                        if (questionText === UpdateQuestionData.question) {
                          //open delete modal
                          manageCompanyPage.clickOnQuestionThreeDotBtn(
                            positionOfCard,
                          );
                          manageCompanyPage.clickOnQuestionThreeDotActionBtn(
                            positionOfCard,
                            this.manageCompanyData.question_delete_action_label,
                          );

                          //delete question modal should open
                          commonPage.verifyIfElementVisible(
                            manageCompanyPage.elements.getDeleteQuestionModal(),
                          );
                          //verify confirmation modal
                          commonPage.verifyConfirmationModal(
                            this.manageCompanyData
                              .delete_question_confirmation_message,
                            this.commonData.confirmation_cancel_button_text,
                            this.commonData.confirmation_delete_button_text,
                          );

                          //click modal cancel button
                          commonPage.clickOnConfirmationModalButton(
                            this.commonData.confirmation_cancel_button_text,
                          );

                          //open delete modal
                          manageCompanyPage.clickOnQuestionThreeDotBtn(
                            positionOfCard,
                          );
                          manageCompanyPage.clickOnQuestionThreeDotActionBtn(
                            positionOfCard,
                            this.manageCompanyData.question_delete_action_label,
                          );

                          //click on delete button
                          commonPage.clickOnConfirmationModalButton(
                            this.commonData.confirmation_delete_button_text,
                          );

                          //verify success message
                          commonPage.verifySucessToastMessage(
                            this.manageCompanyData
                              .delete_question_success_message,
                          );

                          commonPage.loaderNotVisible();
                          //verify the element is deleted does not exist
                          commonPage.verifyElementNotExist(
                            manageCompanyPage.elements.getCompanyQuestionCards(),
                          );

                          //back to companies page
                          commonPage.openPageUrl(
                            this.manageCompanyData.page_url,
                          );
                          commonPage.verifyPageUrl(
                            this.manageCompanyData.page_url,
                          );
                        }
                      });
                  });
              }
            });
        });

      // todo: to be deleted in the live site
      /*deleting the added company
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
          cy.log("Company Card: ", CompanyCard);
          const positionOfCard = CompanyCardIndex + 2;

          if (positionOfCard <= companiesLeft) {
            manageCompanyPage.elements
              .getCompanyCardName(positionOfCard)
              .invoke("text")
              .then((CompanyName) => {
                if (CompanyName === AddCompanyData.company_name) {
                  cy.deleteCompany(positionOfCard);
                }
              });
          }
        });
        */
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
