import commonPage from "../../../pages/commonPage";
import profilePage from "../../../pages/profilePage";
import { ProfileFormField } from "../../../interfaces/form-field";

const updatePassword = Cypress.env("PASSWORD");

describe("Test The Change Password Page", function () {
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
   * TEST: Testing the profile page redirection and Change Password page ui
   * TEST STEP: click on the username and then verify the Change Password page ui
   * EXPECTED RESULT: Change password page ui should be correct
   */
  it("Change password page ui should be correct", function () {
    commonPage.clickOnProfileNameLink();
    commonPage.verifyPageUrl(this.profileData.profile_url);

    profilePage.clickOnUpdatePasswordTab();
    commonPage.verifyIfElementVisible(
      profilePage.elements.getUpdatePasswordContainer(),
    );

    commonPage.verifyIfElementVisible(
      profilePage.elements.getChangePasswordHeading(),
    );
    commonPage.verifyElementText(
      profilePage.elements.getChangePasswordHeading(),
      this.profileData.change_password_heading,
    );

    for (let i = 0; i < this.profileData.change_password_rules.length; i++) {
      commonPage.verifyIfElementVisible(
        profilePage.elements.getChangePasswordRules(i + 1),
      );
      commonPage.verifyElementText(
        profilePage.elements.getChangePasswordRules(i + 1),
        this.profileData.change_password_rules[i],
      );
    }
  });

  /**
   * TEST: Testing change password form with ui
   * TEST STEP: click on the username and then verify the change password page form
   * EXPECTED RESULT: Change your password form should work correctly
   */
  it("Change your password form should work correctly", function () {
    profilePage.clickOnUpdatePasswordTab();
    commonPage.verifyIfElementVisible(
      profilePage.elements.getUpdatePasswordContainer(),
    );

    //form
    const fieldIndexStart: number = 2;
    this.profileData.change_password_form_fields.forEach(
      (field: ProfileFormField, index: number) => {
        const fieldIndex: number = fieldIndexStart + index;
        //label
        commonPage.verifyIfElementVisible(
          profilePage.elements.getChangePasswordLabel(fieldIndex + 1),
        );

        commonPage.verifyElementText(
          profilePage.elements.getChangePasswordLabel(fieldIndex + 1),
          field.label,
        );

        //input
        commonPage.verifyIfElementVisible(
          profilePage.elements.getChangePasswordInput(fieldIndex + 1),
        );

        commonPage.verifyIfElementEnabled(
          profilePage.elements.getChangePasswordInput(fieldIndex + 1),
        );

        //type in input
        commonPage.typeValueInField(
          profilePage.elements.getChangePasswordInput(fieldIndex + 1),
          updatePassword,
        );
      },
    );

    //update btn
    commonPage.verifyIfElementVisible(
      profilePage.elements.getUpdatePasswordBtn(),
    );

    commonPage.verifyIfElementEnabled(
      profilePage.elements.getUpdatePasswordBtn(),
    );

    commonPage.verifyElementText(
      profilePage.elements.getUpdatePasswordBtn(),
      this.profileData.change_password_btn_text,
    );

    //submit form and verify success message
    profilePage.clickOnUpdatePasswordBtn();
    commonPage.verifySucessToastMessage(
      this.profileData.change_password_success_message,
    );

    //logout
    commonPage.verifyPageUrl(this.profileData.logout_url);
  });
});
