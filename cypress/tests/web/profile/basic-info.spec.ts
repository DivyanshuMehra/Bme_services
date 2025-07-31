import commonPage from "../../../pages/commonPage";
import profilePage from "../../../pages/profilePage";
import { ProfileInfo } from "../../../interfaces/user-info";
import { ProfileFormField } from "../../../interfaces/form-field";
import { defaultUserName } from "../../../interfaces/fake-info";

const updateProfileData: ProfileInfo = {
  first_name: defaultUserName.first_name,
  last_name: defaultUserName.last_name,
};

describe("Test The Profile Basic Information Page", function () {
  beforeEach(function () {
    cy.fixture("commonData.json").then((commonData) => {
      cy.loginWithSession(commonData.user_type_super_admin);
    });
    cy.fixture("profileData.json")
      .as("profileData")
      .then((profileData) => {
        commonPage.openPageUrl(profileData.profile_url);
        commonPage.verifyPageUrl(profileData.profile_url);
      });
  });

  /**
   * TEST: Testing the profile page redirection and basic information page ui
   * TEST STEP: click on the username and then verify the basic information
   * EXPECTED RESULT: Clicking on the name from top left, should redirect to the profile basic information page and the page ui should be correct
   */
  it("Clicking on the name from top left, should redirect to the profile basic information page and the page ui should be correct", function () {
    commonPage.clickOnProfileNameLink();
    commonPage.verifyPageUrl(this.profileData.profile_url);

    commonPage.verifyIfElementVisible(
      profilePage.elements.getBasicInfoContainer(),
    );

    //switch between tabs
    profilePage.clickOnUpdatePasswordTab();
    commonPage.verifyIfElementVisible(
      profilePage.elements.getUpdatePasswordContainer(),
    );

    profilePage.clickOnBasicInfoTab();
    commonPage.verifyIfElementVisible(
      profilePage.elements.getBasicInfoContainer(),
    );
  });

  /**
   * TEST: Testing basic information form with ui
   * TEST STEP: click on the username and then verify the basic information
   * EXPECTED RESULT: Update Basic Information form should work correctly
   */
  it("Update Basic Information form should work correctly", function () {
    //form
    this.profileData.profile_form_fields.forEach(
      (field: ProfileFormField, fieldIndex: number) => {
        //label
        commonPage.verifyIfElementVisible(
          profilePage.elements.getBasicLabel(fieldIndex + 1),
        );

        commonPage.verifyElementText(
          profilePage.elements.getBasicLabel(fieldIndex + 1),
          field.label,
        );

        //input
        commonPage.verifyIfElementVisible(
          profilePage.elements.getBasicInput(fieldIndex + 1),
        );

        if (field.name == "email") {
          commonPage.verifyIfElementDisabled(
            profilePage.elements.getBasicInput(fieldIndex + 1),
          );
        } else {
          commonPage.verifyIfElementEnabled(
            profilePage.elements.getBasicInput(fieldIndex + 1),
          );

          //type in input
          commonPage.typeValueInField(
            profilePage.elements.getBasicInput(fieldIndex + 1),
            updateProfileData[field.name],
          );
        }
      },
    );

    //update btn
    commonPage.verifyIfElementVisible(profilePage.elements.getBasicUpdateBtn());

    commonPage.verifyIfElementEnabled(profilePage.elements.getBasicUpdateBtn());

    commonPage.verifyElementText(
      profilePage.elements.getBasicUpdateBtn(),
      this.profileData.update_btn_text,
    );

    //submit form and verify success message
    profilePage.clickOnBasicUpdateBtn();
    commonPage.verifySucessToastMessage(
      this.profileData.profile_update_success_message,
    );

    //verify updated name
    commonPage.verifyProfileName(
      updateProfileData.first_name + " " + updateProfileData.last_name,
    );
  });
});
