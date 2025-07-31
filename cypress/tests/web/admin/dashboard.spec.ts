import dashboardPage from "../../../pages/admin/dashboardPage";
import common from "../../../helpers/common";
import { UserInfo } from "../../../interfaces/manage-user-info";
import { faker } from "@faker-js/faker";
import commonPage from "../../../pages/commonPage";
import { defaultFakeEmailOptions } from "../../../interfaces/fake-info";

let feedback_duration_random_index: number;
const AddParticipantData: UserInfo = {
  user_email: faker.internet.email({
    firstName: defaultFakeEmailOptions.firstname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  feedback_duration: "",
};

describe("Test the Admin Dashboard", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_admin);
        feedback_duration_random_index = common.getRandomNumberInBetween(
          0,
          commonData.how_many_feedback_durations - 1,
        );
      });
    cy.fixture("admin/dashboardData.json")
      .as("dashboardData")
      .then((dashboardData) => {
        commonPage.openPageUrl(dashboardData.page_url);
        commonPage.verifyPageUrl(dashboardData.page_url);
      });
    cy.fixture("admin/manageParticipantData.json").as("manageParticipantData");
  });

  /**
   * TEST: Testing the manage participants page
   * TEST STEP: click on the Left menu manage participants > Add participant
   * EXPECTED RESULT: Participant count in the dashboard should be increased after adding and inviting a Participant
   */
  it("Participant count in the dashboard should be increased after adding and inviting a Participant", function () {
    //<<start Set data to fill form
    AddParticipantData.feedback_duration =
      this.commonData.feedback_durations[feedback_duration_random_index];
    //Set data to fill form end>>
    let participantCount: number;
    const full_name: string = `${AddParticipantData.first_name} ${AddParticipantData.last_name}`;

    //count the number of participant in the dashboard page
    dashboardPage.elements
      .getParticipantCount()
      .invoke("text")
      .then((count) => {
        participantCount = Number(count);
      });

    //go to the manage participants page
    commonPage.openPageUrl(this.manageParticipantData.page_url);
    commonPage.verifyPageUrl(this.manageParticipantData.page_url);

    //add new participant
    if (AddParticipantData.feedback_duration) {
      cy.addParticipant(
        AddParticipantData.user_email,
        AddParticipantData.first_name,
        AddParticipantData.last_name,
        AddParticipantData.feedback_duration,
      );
    }

    //verify the added data
    const cardNumber = this.commonData.index_of_first_user_card;
    cy.verifyParticipantCardData(
      cardNumber,
      AddParticipantData.user_email,
      full_name,
    );

    //The count in the dashboard should be same as the user is not invited
    commonPage.openPageUrl(this.dashboardData.page_url);
    commonPage.verifyPageUrl(this.dashboardData.page_url);

    //todo:verify the data on dashboard page
    dashboardPage.elements
      .getParticipantCount()
      .invoke("text")
      .then((count) => {
        expect(Number(count)).to.equal(participantCount);
      });

    //go to the manage participants page
    commonPage.openPageUrl(this.manageParticipantData.page_url);
    commonPage.verifyPageUrl(this.manageParticipantData.page_url);

    //send invitation email to the ccreated participant
    cy.sendInvitation(cardNumber);
    commonPage.loaderNotVisible();

    commonPage.openPageUrl(this.dashboardData.page_url);
    commonPage.verifyPageUrl(this.dashboardData.page_url);

    //verify the data on dashboard page should be increased
    dashboardPage.elements
      .getParticipantCount()
      .invoke("text")
      .then((count) => {
        expect(Number(count)).to.equal(participantCount + 1);
      });
  });
});
