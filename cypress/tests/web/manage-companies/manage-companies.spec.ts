import commonPage from "../../../pages/commonPage";
import manageCompanyPage from "../../../pages/manageCompanyPage";
import common from "../../../helpers/common";
import { IconInfo } from "../../../interfaces/form-field";

let isQuestionFreezed: boolean;
describe("Test The Manage Companies Page", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_super_admin);
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
   * TEST: Manage Companies card elements should be correct
   * TEST STEP: click on the Left menu manage Companies
   * EXPECTED RESULT: Manage Companies card elements should be correct
   */
  it("Manage Companies card elements should be correct", function () {
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageCompanyData.page_url);
      commonPage.verifyPageUrl(this.manageCompanyData.page_url);
      manageCompanyPage.elements
        .getCompanyCards()
        .each((CompanyCard, CompanyCardIndex) => {
          cy.log("CompanyCard: ", CompanyCard);
          //check the tags data
          const cardNumber = CompanyCardIndex + 2;
          manageCompanyPage.elements
            .getCompanyCardName(cardNumber)
            .scrollIntoView();

          //company name
          commonPage.verifyIfElementVisible(
            manageCompanyPage.elements.getCompanyCardName(cardNumber),
          );

          //company email
          commonPage.verifyIfElementVisible(
            manageCompanyPage.elements.getCompanyCardEmail(cardNumber),
          );

          //company created on date
          commonPage.verifyIfElementVisible(
            manageCompanyPage.elements.getCompanyCardDateTag(cardNumber),
          );

          //company icons
          this.manageCompanyData.company_action_items.forEach(
            (icon: IconInfo, index: number) => {
              const iconIndex: number = index + 1;
              commonPage.verifyIfElementVisible(
                manageCompanyPage.elements.getCompanyCardIcons(
                  cardNumber,
                  iconIndex,
                ),
              );
              commonPage.verifyIfElementHaveClass(
                manageCompanyPage.elements.getCompanyCardIcons(
                  cardNumber,
                  iconIndex,
                ),
                icon.class,
              );
            },
          );
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
   * TEST: Manage Companies page URL and the page ui should be correct
   * TEST STEP: click on the Left menu manage Companies
   * EXPECTED RESULT: manage Companies page URL and the page ui should be correct
   */
  it("Manage Companies page URL and the page ui should be correct", function () {
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageCompanyData.page_url);
      commonPage.verifyPageUrl(this.manageCompanyData.page_url);
      commonPage.verifyIfLeftMenuLogoIsVisible();

      //logo
      commonPage.verifyIfLeftMenuLogoIsVisible();

      //profile name
      commonPage.verifyIfElementVisible(
        commonPage.elements.getProfileNameLink(),
      );

      //left menu
      commonPage.verifyIfElementVisible(
        commonPage.elements.getSelectedLeftMenu(),
      );

      commonPage.verifyIfElementVisible(
        manageCompanyPage.elements.getLeftMenuIcon(),
      );

      commonPage.verifyElementText(
        commonPage.elements.getSelectedLeftMenu(),
        this.manageCompanyData.menu_name,
      );

      //page Heading
      commonPage.verifyElementText(
        commonPage.elements.getPageHeading(),
        this.manageCompanyData.page_heading,
      );

      //page top button
      commonPage.verifyIfElementVisible(
        manageCompanyPage.elements.getPageTopButton(),
      );

      commonPage.verifyElementText(
        manageCompanyPage.elements.getPageTopButton(),
        this.manageCompanyData.page_add_company_button.label,
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
});
