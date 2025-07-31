import { UserFormData } from "../../../../interfaces/manage-user-info";
import { UserFormValidation } from "../../../../interfaces/form-field";
import manageParticipantPage from "../../../../pages/admin/manageParticipantPage";
import { faker } from "@faker-js/faker";
import commonPage from "../../../../pages/commonPage";
import {
  defaultFakeEmailOptions,
  defaultUserName,
} from "../../../../interfaces/fake-info";

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

describe("Functional testing of Add participant form", function () {
  beforeEach(function () {
    cy.fixture("commonData.json").then((commonData) => {
      cy.loginWithSession(commonData.user_type_admin);
    });
    cy.fixture("admin/manageParticipantData.json")
      .as("manageParticipantData")
      .then((manageParticipantData) => {
        commonPage.openPageUrl(manageParticipantData.page_url);
        commonPage.verifyPageUrl(manageParticipantData.page_url);
      });
  });

  /**
   * TEST: Testing the manage users user form validations
   * TEST STEP: click on the Left menu manage users > Add user button
   * EXPECTED RESULT: Add user form should give validations on submitting the empty form
   */
  it("Add user form should give validations for all the required fields on submitting the empty form", function () {
    //click on Add User button
    commonPage.openPageUrl(this.manageParticipantData.page_url);
    commonPage.verifyPageUrl(this.manageParticipantData.page_url);
    //click on Add participant button
    commonPage.clickOnPageTopButtonWithText(
      this.manageParticipantData.page_add_participant_button.label,
    );
    //click on the submit button
    manageParticipantPage.clickOnModalSubmitBtn();

    //check the validations
    this.manageParticipantData.add_participant_empty_form_validations.forEach(
      function (field: UserFormValidation, index: number) {
        const fieldIndex = index + 1;
        if (field.name !== "last_name") {
          if (field.name === "user_email") {
            commonPage.verifyElementText(
              manageParticipantPage.elements.getParticipantModalEmailValidation(
                fieldIndex,
              ),
              field.validation,
            );
          } else {
            commonPage.verifyElementText(
              manageParticipantPage.elements.getParticipantModalInputValidation(
                fieldIndex,
              ),
              field.validation,
            );
          }
        }
      },
    );
  });
  /**
   * TEST: Testing the manage users user form validations
   * TEST STEP: click on the Left menu manage users > Add user button
   * EXPECTED RESULT: Add user form should give validations for entering spaces, numbers, alphanumerics and special characters in the first name
   */
  it("Add user form should give validations for entering spaces, numbers, alphanumerics and special characters in the first name", function () {
    commonPage.openPageUrl(this.manageParticipantData.page_url);
    commonPage.verifyPageUrl(this.manageParticipantData.page_url);
    //click on Add participant button
    commonPage.clickOnPageTopButtonWithText(
      this.manageParticipantData.page_add_participant_button.label,
    );

    const checkvalidations = (index: number, value: any, message: string) => {
      commonPage.typeValueInField(
        manageParticipantPage.elements.getParticipantModalInput(index, "input"),
        value,
      );

      //click on the submit button and check validation
      manageParticipantPage.clickOnModalSubmitBtn();
      commonPage.verifyElementText(
        manageParticipantPage.elements.getParticipantModalInputValidation(
          index,
        ),
        message,
      );
    };

    //entering spaces
    checkvalidations(
      this.manageParticipantData.index_of_first_name_input,
      FormData.full_name,
      this.manageParticipantData.invalid_first_name_validation,
    );

    //entering numbers
    checkvalidations(
      this.manageParticipantData.index_of_first_name_input,
      FormData.number,
      this.manageParticipantData.invalid_first_name_validation,
    );

    //entering alphanumerics
    checkvalidations(
      this.manageParticipantData.index_of_first_name_input,
      FormData.alpha_numeric,
      this.manageParticipantData.invalid_first_name_validation,
    );

    //entering special characters
    checkvalidations(
      this.manageParticipantData.index_of_first_name_input,
      FormData.password,
      this.manageParticipantData.invalid_first_name_validation,
    );
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

    commonPage.openPageUrl(this.manageParticipantData.page_url);
    commonPage.verifyPageUrl(this.manageParticipantData.page_url);
    //click on Add participant button
    commonPage.clickOnPageTopButtonWithText(
      this.manageParticipantData.page_add_participant_button.label,
    );

    //enter the email without domain and check validation
    commonPage.typeValueInField(
      manageParticipantPage.elements.getParticipantModalEmailInput(
        this.manageParticipantData.index_of_email_input,
        "input",
      ),
      emailWithoutDomain,
    );

    //click on the submit button and check no action is performed
    manageParticipantPage.clickOnModalSubmitBtn();
    commonPage.verifyIfElementVisible(
      manageParticipantPage.elements.getParticipantModal(),
    );
  });
});
