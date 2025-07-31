import commonPage from "../../../pages/commonPage";
import manageCompanyPage from "../../../pages/manageCompanyPage";
import common from "../../../helpers/common";
import { CompanyInfo } from "../../../interfaces/company-info";
import { CopyCompanyInfo } from "../../../interfaces/company-info";
import { faker } from "@faker-js/faker";
import {
  defaultFakeEmailOptions,
  defaultCompanyOptions,
} from "../../../interfaces/fake-info";

let isQuestionFreezed: boolean;
let randomCompanyLogo: number;
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

const CopyCompanyData: CopyCompanyInfo = {
  company_name: faker.person.fullName({ lastName: "Rubico tech" }),
};

describe("Test The Manage Companies Page: Copy Company", function () {
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
   * TEST: Testing the manage questions page
   * TEST STEP: click on the Left menu manage questions > copy company Question
   * EXPECTED RESULT: copy company question functionality should work correctly in manage questions page
   */
  it("Copy company functionality should work correctly in manage questions page", function () {
    //<<Start Set Data to fill form
    AddCompanyData.company_logo = `${this.commonData.assets_path}${randomCompanyLogo}.png`;
    // Set Data to fill form End>>
    //verifying whether the questions are freezed
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageCompanyData.page_url);
      commonPage.verifyPageUrl(this.manageCompanyData.page_url);

      //add a new company
      cy.createNewCompany(
        AddCompanyData.company_name,
        AddCompanyData.company_email,
        AddCompanyData.company_description,
        AddCompanyData.company_logo,
      );
      commonPage.loaderNotVisible();

      //copy company
      const positionOfCard = this.manageCompanyData.index_of_first_company_card;

      manageCompanyPage.elements
        .getCompanyCardName(positionOfCard)
        .invoke("text")
        .then((CompanyName) => {
          if (CompanyName === AddCompanyData.company_name) {
            //open modal
            manageCompanyPage.clickOnCompanyCopyBtn(positionOfCard);

            //edit Company modal should open
            commonPage.verifyIfElementVisible(
              manageCompanyPage.elements.getCompanyModal(),
            );

            //modal confirmation message
            commonPage.verifyIfElementVisible(
              manageCompanyPage.elements.getCopyCompanyModalMessage(),
            );

            commonPage.verifyElementText(
              manageCompanyPage.elements.getCopyCompanyModalMessage(),
              this.manageCompanyData.copy_confirmation_message,
            );

            //label
            commonPage.verifyIfElementVisible(
              manageCompanyPage.elements.getCopyCompanyLabel(),
            );

            commonPage.verifyElementText(
              manageCompanyPage.elements.getCopyCompanyLabel(),
              this.manageCompanyData.copy_company_form_field.label,
            );

            //input
            commonPage.verifyIfElementVisible(
              manageCompanyPage.elements.getCopyCompanyInput(),
            );

            //buttons
            this.manageCompanyData.copy_company_form_buttons.forEach(function (
              buttonText: string,
              index: number,
            ) {
              commonPage.verifyIfElementVisible(
                manageCompanyPage.elements.getCopyCompanyButtons(index + 1),
              );
              commonPage.verifyElementText(
                manageCompanyPage.elements.getCopyCompanyButtons(index + 1),
                buttonText,
              );
            });
            //click modal cancel button
            manageCompanyPage.clickOnCopyModalButton(
              this.commonData.confirmation_cancel_button_text,
            );

            //re-open modal
            manageCompanyPage.clickOnCompanyCopyBtn(positionOfCard);

            //type in input
            commonPage.typeValueInField(
              manageCompanyPage.elements.getCopyCompanyInput(),
              CopyCompanyData.company_name,
            );

            //click on create copy button
            manageCompanyPage.clickOnCopyModalButton(
              this.manageCompanyData.create_company_copy_button,
            );

            //verify success message
            commonPage.verifySucessToastMessage(
              this.manageCompanyData.copy_company_success_message,
            );
            //verify the company copy added in manage-companies
            commonPage.loaderNotVisible();
            const cardPosition =
              this.manageCompanyData.index_of_first_company_card;
            cy.verifyCompanyCardData(
              cardPosition,
              CopyCompanyData.company_name,
              AddCompanyData.company_email,
              current_date,
            );
          }
        });

      //delete the companies (added and copied)
      commonPage.loaderNotVisible();
      manageCompanyPage.elements.getCompanyCards().each((CompanyCard) => {
        cy.log("CompanyCard: ", CompanyCard);
        const positionOfCard =
          this.manageCompanyData.index_of_first_company_card;

        manageCompanyPage.elements
          .getCompanyCardName(positionOfCard)
          .invoke("text")
          .then((CompanyName) => {
            if (
              CompanyName === AddCompanyData.company_name ||
              CompanyName === CopyCompanyData.company_name
            ) {
              cy.deleteCompany(positionOfCard);
              commonPage.loaderNotVisible();
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
});

// todo: Verify that the company questions and other things are also copied
