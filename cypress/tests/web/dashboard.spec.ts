import dashboardPage from "../../pages/dashboardPage";
import commonPage from "../../pages/commonPage";
import common from "../../helpers/common";
import { faker } from "@faker-js/faker";
import {
  defaultCompanyOptions,
  defaultFakeEmailOptions,
} from "../../interfaces/fake-info";
import { CompanyInfo } from "../../interfaces/company-info";
import manageCompanyPage from "../../pages/manageCompanyPage";
import { UserInfo } from "../../interfaces/manage-user-info";

let feedback_duration_random_index: number;
let randomAddCompanyLogo: number;
let isQuestionFreezed: boolean;
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

const AddUserData: UserInfo = {
  user_email: faker.internet.email({
    firstName: defaultFakeEmailOptions.firstname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  feedback_duration: "",
};

describe("Test the Super Admin Dashboard", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_super_admin);
        feedback_duration_random_index = common.getRandomNumberInBetween(
          0,
          commonData.how_many_feedback_durations - 1,
        );
        randomAddCompanyLogo = common.getRandomNumberInBetween(
          1,
          commonData.how_many_company_logo,
        );
      });
    cy.fixture("dashboardData.json")
      .as("dashboardData")
      .then((dashboardData) => {
        commonPage.openPageUrl(dashboardData.manage_question_page_url);
        commonPage.verifyPageUrl(dashboardData.manage_question_page_url);
      });
    common.checkIfSTQuestionsFreezed().then((isFreezed) => {
      isQuestionFreezed = isFreezed ? true : false;
    });
  });

  /**
   * TEST: Testing the Total Companies count in the dashboard page
   * TEST STEP: click on the Left menu manage companies > Add company > check the count in dashboard
   * EXPECTED RESULT: Added company should increase the total companies count in dashboard page
   */
  it("Total companies count should increase by adding a new company from the manage companies page", function () {
    //<<Start Set Data to fill form
    AddCompanyData.company_logo = `${this.commonData.assets_path}${randomAddCompanyLogo}.png`;
    // Set Data to fill form End>>
    let total_companies_count: number;
    let companiesLeft: number;
    let companyFound: boolean;

    //verifying whether the questions are freezed
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.dashboardData.page_url);
      commonPage.verifyPageUrl(this.dashboardData.page_url);
      //count the number of companies in the dashboard page
      dashboardPage.elements
        .getDashboardStatsCount(this.dashboardData.total_companies_title)
        .invoke("text")
        .then((count) => {
          total_companies_count = Number(count);
        });

      //go to manage companies page
      commonPage.openPageUrl(this.commonData.manage_companies_page_url);
      commonPage.verifyPageUrl(this.commonData.manage_companies_page_url);

      //add new company
      cy.createNewCompany(
        AddCompanyData.company_name,
        AddCompanyData.company_email,
        AddCompanyData.company_description,
        AddCompanyData.company_logo,
      );
      //verify added data
      commonPage.loaderNotVisible();
      const positionOfCard = this.dashboardData.index_of_first_company_card;
      cy.verifyCompanyCardData(
        positionOfCard,
        AddCompanyData.company_name,
        AddCompanyData.company_email,
        current_date,
      );
      //back to the dashboard page
      commonPage.openPageUrl(this.dashboardData.page_url);
      commonPage.verifyPageUrl(this.dashboardData.page_url);

      //verify the data on dashboard page
      dashboardPage.elements
        .getDashboardStatsCount(this.dashboardData.total_companies_title)
        .invoke("text")
        .then((count) => {
          expect(Number(count)).to.equal(total_companies_count + 1);
        });

      //delete the added company and verify
      //go to manage companies page
      commonPage.openPageUrl(this.commonData.manage_companies_page_url);
      commonPage.verifyPageUrl(this.commonData.manage_companies_page_url);

      manageCompanyPage.elements
        .getCompanyCards()
        .its("length")
        .then((length) => {
          companiesLeft = length - 1;
        });
      manageCompanyPage.elements
        .getCompanyCards()
        .each((CompanyCard, CompanyCardIndex) => {
          const positionOfCard = CompanyCardIndex + 2;

          if (positionOfCard <= companiesLeft && !companyFound) {
            cy.log("CompanyCard: ", CompanyCard);
            manageCompanyPage.elements
              .getCompanyCardName(positionOfCard)
              .invoke("text")
              .then((CompanyName) => {
                if (CompanyName === AddCompanyData.company_name) {
                  companyFound = true;
                  //delete company
                  cy.deleteCompany(positionOfCard);

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
                            AddCompanyData.company_name,
                          );
                        });
                    });
                }
              });
          }
        });
      //going back to the dashboard and verify
      commonPage.openPageUrl(this.dashboardData.page_url);
      commonPage.verifyPageUrl(this.dashboardData.page_url);

      //todo:verify the data on dashboard page
      dashboardPage.elements
        .getDashboardStatsCount(this.dashboardData.total_companies_title)
        .invoke("text")
        .then((count) => {
          expect(Number(count)).to.equal(total_companies_count);
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
   * TEST: Testing the Invited Users count in the dashboard page
   * TEST STEP: click on the Left menu manage users > Add user > check the count in dashboard
   * EXPECTED RESULT: Added and invited user should increase the invited users count in dashboard page
   */
  it("Invited Users count should increase by adding and inviting a new user from the manage users page", function () {
    let invited_users_count: number;

    //verifying whether the questions are freezed
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.dashboardData.page_url);
      commonPage.verifyPageUrl(this.dashboardData.page_url);
      //count the number of invited users in the dashboard page
      dashboardPage.elements
        .getDashboardStatsCount(this.dashboardData.invited_users_title)
        .invoke("text")
        .then((count) => {
          invited_users_count = Number(count);
        });

      //go to manage users page
      commonPage.openPageUrl(this.commonData.manage_users_page_url);
      commonPage.verifyPageUrl(this.commonData.manage_users_page_url);

      //create a user in the manage users page
      cy.addAdmin(
        AddUserData.user_email,
        AddUserData.first_name,
        AddUserData.last_name,
      );
      //verify added data
      commonPage.loaderNotVisible();
      const positionOfCard = this.commonData.index_of_first_user_card;
      cy.verifyUserCardData(
        positionOfCard,
        `${AddUserData.first_name} ${AddUserData.last_name}`,
        AddUserData.user_email,
        this.commonData.admin_icon_class,
      );
      cy.sendInvitation(positionOfCard);
      //back to the dashboard page
      commonPage.openPageUrl(this.dashboardData.page_url);
      commonPage.verifyPageUrl(this.dashboardData.page_url);

      //verify the data on dashboard page
      dashboardPage.elements
        .getDashboardStatsCount(this.dashboardData.invited_users_title)
        .invoke("text")
        .then((count) => {
          expect(Number(count)).to.equal(invited_users_count + 1);
        });
    } else {
      //verify the left menu is not accessible
      commonPage.clickOnLeftMenuWithText(
        this.commonData.manage_users_left_menu,
      );
      commonPage.verifyErrorToastMessage(
        this.commonData.left_menu_disabled_message,
      );
    }
  });

  /**
   * TEST: Testing the Active Sessions count in the dashboard page
   * TEST STEP: click on the Left menu manage users > Add participant > invite > check the count in dashboard
   * EXPECTED RESULT: Added and invited participant should increase the active sessions count in dashboard page
   */
  it("Added and invited participant in the manage users page should increase the active sessions count in dashboard page", function () {
    //<<Start Set Data to fill form
    const feedback_duration_index = common.selectAssessmentDuration(
      feedback_duration_random_index,
    );
    if (feedback_duration_index < 0) {
      AddUserData.feedback_duration =
        this.commonData.feedback_durations[feedback_duration_random_index];
    } else {
      AddUserData.feedback_duration =
        this.commonData.feedback_durations[feedback_duration_index];
    }
    // Set Data to fill form End>>
    let active_sessions_count: number;

    //verifying whether the questions are freezed
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.dashboardData.page_url);
      commonPage.verifyPageUrl(this.dashboardData.page_url);
      //count the number of invited users in the dashboard page
      dashboardPage.elements
        .getDashboardStatsCount(this.dashboardData.active_sessions_title)
        .invoke("text")
        .then((count) => {
          active_sessions_count = Number(count);
        });
      //go to manage users page
      commonPage.openPageUrl(this.commonData.manage_users_page_url);
      commonPage.verifyPageUrl(this.commonData.manage_users_page_url);

      //create and invite an admin in the manage users page
      cy.addAdmin(
        AddUserData.user_email,
        AddUserData.first_name,
        AddUserData.last_name,
      );
      commonPage.loaderNotVisible();
      const positionOfCard = this.commonData.index_of_first_user_card;
      cy.sendInvitation(positionOfCard);

      commonPage.loaderNotVisible();
      //create a participant under the admin itself
      if (AddUserData.feedback_duration) {
        cy.addParticipant(
          AddUserData.user_email,
          AddUserData.first_name,
          AddUserData.last_name,
          AddUserData.feedback_duration,
          `${AddUserData.first_name} ${AddUserData.last_name}`,
        );
      }
      commonPage.loaderNotVisible();
      //verify added data
      cy.verifyUserCardData(
        positionOfCard,
        `${AddUserData.first_name} ${AddUserData.last_name}`,
        AddUserData.user_email,
        this.commonData.participant_icon_class,
      );

      //go back to dashboard page and verify the count should not be increased
      commonPage.openPageUrl(this.dashboardData.page_url);
      commonPage.verifyPageUrl(this.dashboardData.page_url);
      //count the number of invited users in the dashboard page
      dashboardPage.elements
        .getDashboardStatsCount(this.dashboardData.active_sessions_title)
        .invoke("text")
        .then((count) => {
          expect(Number(count)).to.equal(active_sessions_count);
        });

      //go back to the manage users page and invite the added participant
      commonPage.openPageUrl(this.commonData.manage_users_page_url);
      commonPage.verifyPageUrl(this.commonData.manage_users_page_url);
      cy.sendInvitation(positionOfCard);

      //verify toast error message
      //unable to invite participant as duration is exceeding the current year
      if (feedback_duration_index < 0) {
        commonPage.verifyErrorToastMessage(
          this.commonData.participant_cannot_invited_msg,
        );
      }

      //now check the count of the active sessions
      commonPage.openPageUrl(this.dashboardData.page_url);
      commonPage.verifyPageUrl(this.dashboardData.page_url);
      //count the number of invited users in the dashboard page
      dashboardPage.elements
        .getDashboardStatsCount(this.dashboardData.active_sessions_title)
        .invoke("text")
        .then((count) => {
          if (feedback_duration_index < 0) {
            expect(Number(count)).to.equal(active_sessions_count);
          } else {
            expect(Number(count)).to.equal(active_sessions_count + 1);
          }
        });
    } else {
      //verify the left menu is not accessible
      commonPage.clickOnLeftMenuWithText(
        this.commonData.manage_users_left_menu,
      );
      commonPage.verifyErrorToastMessage(
        this.commonData.left_menu_disabled_message,
      );
    }
  });
});
