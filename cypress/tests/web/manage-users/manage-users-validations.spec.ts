import { UserInfo, UserFormData } from "../../../interfaces/manage-user-info";
import { UserFormValidation } from "../../../interfaces/form-field";
import { faker } from "@faker-js/faker";
import {
  defaultFakeEmailOptions,
  defaultUserName,
} from "../../../interfaces/fake-info";
import commonPage from "../../../pages/commonPage";
import manageUsersPage from "../../../pages/manageUsersPage";
import common from "../../../helpers/common";

let isQuestionFreezed: boolean;

const AddUserData: UserInfo = {
  user_email: faker.internet.email({
    lastName: "Rubico",
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  user_type: "",
  feedback_duration: "",
};

const FormData: UserFormData = {
  full_name: faker.person.fullName({ firstName: defaultUserName.first_name }),
  number: faker.number.int(),
  alpha_numeric:
    faker.string.alpha({ length: 5 }) + faker.string.numeric({ length: 5 }),
  password: faker.internet.password({
    prefix: defaultFakeEmailOptions.password_prefix,
  }),
  email: faker.internet.email({
    lastName: defaultFakeEmailOptions.lastname,
    provider: defaultFakeEmailOptions.provider,
  }),
};

describe("Functional testing of add user modal", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_super_admin);
      });
    cy.fixture("manageUsersData.json")
      .as("manageUsersData")
      .then((manageUsersData) => {
        commonPage.openPageUrl(manageUsersData.manage_question_page_url);
        commonPage.verifyPageUrl(manageUsersData.manage_question_page_url);
      });

    common.checkIfSTQuestionsFreezed().then((isFreezed) => {
      isQuestionFreezed = isFreezed ? true : false;
    });
  });

  /**
   * TEST: Testing the manage users user form validations
   * TEST STEP: click on the Left menu manage users > Add user button
   * EXPECTED RESULT: Add user form should give validations on submitting the empty form
   */
  it("Add user form should give validations for all the required fields on submitting the empty form", function () {
    //click on Add User button
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      //open modal
      commonPage.clickOnElementWithText(
        manageUsersPage.elements.getPageButtonWithText(),
        this.manageUsersData.page_add_user_button.label,
      );
      //click on the submit button
      manageUsersPage.clickOnModalSubmitBtn();

      //check the validations
      this.manageUsersData.add_user_empty_form_validations.forEach(function (
        field: UserFormValidation,
        index: number,
      ) {
        const fieldIndex = index + 1;
        if (field.name !== "last_name") {
          if (field.name === "user_email") {
            commonPage.verifyElementText(
              manageUsersPage.elements.getUserModalEmailValidation(fieldIndex),
              field.validation,
            );
          } else {
            commonPage.verifyElementText(
              manageUsersPage.elements.getUserModalInputValidation(fieldIndex),
              field.validation,
            );
          }
        }
      });
    }
  });
  /**
   * TEST: Testing the manage users user form validations
   * TEST STEP: click on the Left menu manage users > Add user button
   * EXPECTED RESULT: Add user form should give validations for entering spaces, numbers, alphanumerics and special characters in the first name
   */
  it("Add user form should give validations for entering spaces, numbers, alphanumerics and special characters in the first name", function () {
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      //open modal
      commonPage.clickOnElementWithText(
        manageUsersPage.elements.getPageButtonWithText(),
        this.manageUsersData.page_add_user_button.label,
      );

      const checkvalidations = (index: number, value: any, message: string) => {
        commonPage.typeValueInField(
          manageUsersPage.elements.getUserModalInput(index, "input"),
          value,
        );

        //click on the submit button and check validation
        manageUsersPage.clickOnModalSubmitBtn();
        commonPage.verifyElementText(
          manageUsersPage.elements.getUserModalInputValidation(index),
          message,
        );
      };

      //entering spaces
      checkvalidations(
        this.manageUsersData.index_of_first_name_input,
        FormData.full_name,
        this.manageUsersData.invalid_first_name_validation,
      );

      //entering numbers
      checkvalidations(
        this.manageUsersData.index_of_first_name_input,
        FormData.number,
        this.manageUsersData.invalid_first_name_validation,
      );

      //entering alphanumerics
      checkvalidations(
        this.manageUsersData.index_of_first_name_input,
        FormData.alpha_numeric,
        this.manageUsersData.invalid_first_name_validation,
      );

      //entering special characters
      checkvalidations(
        this.manageUsersData.index_of_first_name_input,
        FormData.password,
        this.manageUsersData.invalid_first_name_validation,
      );
    }
  });

  /**
   * TEST: Testing the manage users user form validations
   * TEST STEP: click on the Left menu manage users > Add user button
   * EXPECTED RESULT: Add user form should give validations on entering invalid email format(without domain)
   */
  it("Add user form should give validations on entering invalid email format(without domain)", function () {
    //<<start Set data to fill form
    const emailWithoutDomain: string =
      FormData.email.split("@").slice(0, 1).join("@") + "@";
    //Set data to fill form end>>
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      //open modal
      commonPage.clickOnElementWithText(
        manageUsersPage.elements.getPageButtonWithText(),
        this.manageUsersData.page_add_user_button.label,
      );

      //enter the email without domain and check validation
      commonPage.typeValueInField(
        manageUsersPage.elements.getUserModalEmailInput(
          this.manageUsersData.index_of_email_input,
          "input",
        ),
        emailWithoutDomain,
      );

      //click on the submit button and check no action is performed
      manageUsersPage.clickOnModalSubmitBtn();
      commonPage.verifyIfElementVisible(
        manageUsersPage.elements.getUserModal(),
      );
    }
  });
  /**
   * TEST: Testing the manage users user form validations
   * TEST STEP: click on the Left menu manage users > Add user button
   * EXPECTED RESULT: Add user form should give validations when no admin and assessment duration is selected for the User type as participant
   */
  it("Add user form should give validations when no admin and assessment duration is selected for the User type as participant", function () {
    //<<start Set data to fill form
    AddUserData.user_type = this.commonData.user_type_participant;
    //Set data to fill form end>>
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      //open modal
      commonPage.clickOnElementWithText(
        manageUsersPage.elements.getPageButtonWithText(),
        this.manageUsersData.page_add_user_button.label,
      );

      //select user type as participant
      commonPage.selectDropdownText(
        manageUsersPage.elements.getUserModalInput(
          this.manageUsersData.index_of_user_type_input,
          "select",
        ),
        AddUserData.user_type,
      );

      //click on the submit button and check no action is performed
      manageUsersPage.clickOnModalSubmitBtn();
      commonPage.verifyElementText(
        manageUsersPage.elements.getUserModalInputValidation(
          this.manageUsersData.index_of_select_admin_input,
        ),
        this.manageUsersData.no_admin_selected_validation,
      );
      commonPage.verifyElementText(
        manageUsersPage.elements.getUserModalInputValidation(
          this.manageUsersData.index_of_assessment_duration_input,
        ),
        this.manageUsersData.no_assessment_duration_selected_validation,
      );
    }
  });
  /**
   * TEST: Testing the manage users user form validations
   * TEST STEP: click on the Left menu manage users > Add user button
   * EXPECTED RESULT: Add user form should give validations when no participant and rater type is selected for the User type as participant
   */
  it("Add user form should give validations when no participant and rater type is selected for the User type as participant", function () {
    //<<start Set data to fill form
    AddUserData.user_type = this.commonData.user_type_rater;
    //Set data to fill form end>>
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      //open modal
      commonPage.clickOnElementWithText(
        manageUsersPage.elements.getPageButtonWithText(),
        this.manageUsersData.page_add_user_button.label,
      );

      //select user type as rater
      commonPage.selectDropdownText(
        manageUsersPage.elements.getUserModalInput(
          this.manageUsersData.index_of_user_type_input,
          "select",
        ),
        AddUserData.user_type,
      );

      //click on the submit button and check no action is performed
      manageUsersPage.clickOnModalSubmitBtn();
      commonPage.verifyElementText(
        manageUsersPage.elements.getUserModalInputValidation(
          this.manageUsersData.index_of_select_admin_input,
        ),
        this.manageUsersData.no_participant_selected_validation,
      );
      commonPage.verifyElementText(
        manageUsersPage.elements.getUserModalInputValidation(
          this.manageUsersData.index_of_assessment_duration_input,
        ),
        this.manageUsersData.no_rater_type_selected_validation,
      );
    }
  });
});
