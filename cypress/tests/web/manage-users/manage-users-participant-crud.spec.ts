import manageUsersPage from "../../../pages/manageUsersPage";
import common from "../../../helpers/common";
import { UserInfo } from "../../../interfaces/manage-user-info";
import { UserFormField } from "../../../interfaces/form-field";
import { faker } from "@faker-js/faker";
import commonPage from "../../../pages/commonPage";
import {
  defaultFakeEmailOptions,
  defaultUserName,
} from "../../../interfaces/fake-info";

let isQuestionFreezed: boolean;
let user_type_random_index: number;
// let select_user_random_index: number;
let feedback_duration_random_index: number;
let rater_type_random_index: number;

const AddAdminData: UserInfo = {
  user_email: faker.internet.email({
    firstName: defaultFakeEmailOptions.firstname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: defaultUserName.first_name,
  last_name: faker.person.lastName(),
};
const AddParticipantData: UserInfo = {
  user_email: faker.internet.email({
    firstName: defaultFakeEmailOptions.firstname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: defaultUserName.first_name,
  last_name: faker.person.lastName(),
  select_admin: "",
  feedback_duration: "",
};

const AddUserData: UserInfo = {
  user_email: faker.internet.email({
    lastName: defaultFakeEmailOptions.lastname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  user_type: "",
  select_admin: "",
  feedback_duration: "",
  select_participant: "",
  rater_type: "",
};

const EditUserData: UserInfo = {
  user_email: faker.internet.email({
    lastName: defaultFakeEmailOptions.lastname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  user_type: "",
  select_admin: "",
  feedback_duration: "",
  select_participant: "",
  rater_type: "",
};

describe("Test the Manage Users Page: Create, Read, Update, Delete", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_super_admin);
        user_type_random_index = common.getRandomNumberInBetween(
          0,
          commonData.how_many_user_type - 1,
        );
        feedback_duration_random_index = common.getRandomNumberInBetween(
          0,
          commonData.how_many_feedback_durations - 1,
        );
        rater_type_random_index = common.getRandomNumberInBetween(
          0,
          commonData.how_many_rater_type - 1,
        );
      });
    cy.fixture("manageUsersData.json")
      .as("manageUsersData")
      .then((manageUsersData) => {
        commonPage.openPageUrl(manageUsersData.page_url);
        commonPage.verifyPageUrl(manageUsersData.page_url);
      });

    common.checkIfSTQuestionsFreezed().then((isFreezed) => {
      isQuestionFreezed = isFreezed ? true : false;
    });
  });
  /**
   * TEST: Testing the manage users page
   * TEST STEP: click on the Left menu manage users > Add User
   * EXPECTED RESULT: Add Admin functionality should work correctly in manage users page
   */
  it("Add Admin functionality should work correctly in manage users page", function () {
    //<<Start Set Data to fill form
    AddUserData.user_type = this.commonData.user_types[user_type_random_index];
    AddUserData.feedback_duration =
      this.commonData.user_types[feedback_duration_random_index];
    AddUserData.rater_type =
      this.commonData.user_types[rater_type_random_index];
    // Set Data to fill form End>>

    //click on Add User button
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      //open modal
      commonPage.clickOnElementWithText(
        manageUsersPage.elements.getPageButtonWithText(),
        this.manageUsersData.page_add_user_button.label,
      );
      //add user modal should open
      commonPage.verifyIfElementVisible(
        manageUsersPage.elements.getUserModal(),
      );

      // close modal
      commonPage.verifyIfElementVisible(
        commonPage.elements.getCloseModalButton(),
      );

      commonPage.clickOnCloseModalButton();

      //re-open modal
      commonPage.clickOnElementWithText(
        manageUsersPage.elements.getPageButtonWithText(),
        this.manageUsersData.page_add_user_button.label,
      );
      //modal title
      commonPage.verifyIfElementVisible(
        manageUsersPage.elements.getUserModalTitle(),
      );
      commonPage.verifyElementText(
        manageUsersPage.elements.getUserModalTitle(),
        this.manageUsersData.add_user_title,
      );
      //<<Start set data if the user type is not admin
      let full_name: string;
      if (AddUserData.user_type === this.commonData.user_type_participant) {
        cy.addAdmin(
          AddAdminData.user_email,
          AddAdminData.first_name,
          AddAdminData.last_name,
        );
        full_name = `${AddAdminData.first_name} ${AddAdminData.last_name}`;
      } else {
        if (AddParticipantData.feedback_duration) {
          cy.addParticipant(
            AddParticipantData.user_email,
            AddParticipantData.first_name,
            AddParticipantData.last_name,
            AddParticipantData.feedback_duration,
            AddParticipantData.select_admin,
          );
        }
        full_name = `${AddParticipantData.first_name} ${AddParticipantData.last_name}`;
      }
      cy.sendInvitation(this.commonData.index_of_first_user_card);

      // select a random admin or participant
      if (AddUserData.user_type === this.commonData.user_type_participant) {
        AddUserData.select_admin = full_name;
      } else {
        AddUserData.select_participant = full_name;
      }
      //Set data if the user type is not admin End>>

      // form elements
      const checkElements = (fieldIndex: number, field: UserFormField) => {
        //label
        commonPage.verifyIfElementVisible(
          manageUsersPage.elements.getUserModalLabel(fieldIndex),
        );

        commonPage.verifyElementText(
          manageUsersPage.elements.getUserModalLabel(fieldIndex),
          field.label,
        );

        //input
        if (field.label === "Email") {
          commonPage.verifyIfElementVisible(
            manageUsersPage.elements.getUserModalEmailInput(
              fieldIndex,
              field.type,
            ),
          );
          commonPage.verifyIfElementEnabled(
            manageUsersPage.elements.getUserModalEmailInput(
              fieldIndex,
              field.type,
            ),
          );
        } else {
          commonPage.verifyIfElementVisible(
            manageUsersPage.elements.getUserModalInput(fieldIndex, field.type),
          );
          commonPage.verifyIfElementEnabled(
            manageUsersPage.elements.getUserModalInput(fieldIndex, field.type),
          );
        }

        //type/select in inputs
        if (field.type === "input") {
          if (field.name === "user_email") {
            commonPage.typeValueInField(
              manageUsersPage.elements.getUserModalEmailInput(
                fieldIndex,
                field.type,
              ),
              AddUserData[field.name],
            );
          } else {
            commonPage.typeValueInField(
              manageUsersPage.elements.getUserModalInput(
                fieldIndex,
                field.type,
              ),
              AddUserData[field.name],
            );
          }
        } else if (field.type === "select") {
          commonPage.selectDropdownText(
            manageUsersPage.elements.getUserModalInput(fieldIndex, field.type),
            AddUserData[field.name],
          );
        }
      };

      //re-open modal @todo
      // if (AddUserData.user_type !== this.commonData.user_type_admin) {
      //   commonPage.clickOnElementWithText(
      //     manageUsersPage.elements.getPageButtonWithText(),
      //     this.manageUsersData.page_add_user_button.label,
      //   );
      // }

      //form
      this.manageUsersData.add_user_form_fields.forEach(function (
        field: UserFormField,
        index: number,
      ) {
        const fieldIndex = index + 1;
        if (
          field.name === "user_email" ||
          field.name === "first_name" ||
          field.name === "last_name" ||
          field.name === "user_type" ||
          AddUserData.user_type !== "admin"
        ) {
          if (AddUserData.user_type === "participant") {
            switch (field.name) {
              case "select_participant":
              case "rater_type":
                break;
              default:
                checkElements(fieldIndex, field);
                break;
            }
          }
          if (AddUserData.user_type === "rater") {
            switch (field.name) {
              case "select_admin":
              case "feedback_duration":
                break;
              default:
                checkElements(fieldIndex, field);
                break;
            }
          }
          checkElements(fieldIndex, field);
        }
      });

      //submit btn
      commonPage.verifyIfElementVisible(
        manageUsersPage.elements.getModalSubmitBtn(),
      );

      commonPage.verifyIfElementEnabled(
        manageUsersPage.elements.getModalSubmitBtn(),
      );

      commonPage.verifyElementText(
        manageUsersPage.elements.getModalSubmitBtn(),
        this.manageUsersData.save_btn_text,
      );
      manageUsersPage.clickOnModalSubmitBtn();
      //verify success message after form submission
      commonPage.verifySucessToastMessage(
        this.manageUsersData.add_user_success_message,
      );
    }
  });
  /**
   * TEST: Testing the manage users page
   * TEST STEP: click on the Left menu manage users > Add User
   * EXPECTED RESULT: Edit user functionality should work correctly in manage users page
   */
  it("Edit user functionality should work correctly in manage users page", function () {
    // <<Start Set Data to fill form
    EditUserData.user_type = this.commonData.user_types[user_type_random_index];
    // Set Data to fill form End>>

    //click on Add User button
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      manageUsersPage.elements.getUsersCards().each((UserCard, CardIndex) => {
        const positionOfCard = CardIndex + 1;
        cy.log("User Card: ", UserCard);
        manageUsersPage.elements
          .getUserCardName(positionOfCard)
          .invoke("text")
          .then((UserName) => {
            if (
              UserName === `${AddUserData.first_name} ${AddUserData.last_name}`
            ) {
              //open modal
              commonPage.clickOnElementWithText(
                manageUsersPage.elements.getPageButtonWithText(),
                this.manageUsersData.page_add_user_button.label,
              );
              //add user modal should open
              commonPage.verifyIfElementVisible(
                manageUsersPage.elements.getUserModal(),
              );

              // close modal
              commonPage.verifyIfElementVisible(
                commonPage.elements.getCloseModalButton(),
              );

              commonPage.clickOnCloseModalButton();

              //re-open modal
              commonPage.clickOnElementWithText(
                manageUsersPage.elements.getPageButtonWithText(),
                this.manageUsersData.page_add_user_button.label,
              );
              //modal title
              commonPage.verifyIfElementVisible(
                manageUsersPage.elements.getUserModalTitle(),
              );

              commonPage.verifyElementText(
                manageUsersPage.elements.getUserModalTitle(),
                this.manageUsersData.add_user_title,
              );

              //form
              this.manageUsersData.add_user_form_fields.forEach(function (
                field: UserFormField,
                index: number,
              ) {
                const fieldIndex = index + 1;
                //label
                commonPage.verifyIfElementVisible(
                  manageUsersPage.elements.getUserModalLabel(fieldIndex),
                );

                commonPage.verifyElementText(
                  manageUsersPage.elements.getUserModalLabel(fieldIndex),
                  field.label,
                );

                //input
                commonPage.verifyIfElementVisible(
                  manageUsersPage.elements.getUserModalLabel(fieldIndex),
                );
                commonPage.verifyIfElementEnabled(
                  manageUsersPage.elements.getUserModalLabel(fieldIndex),
                );
              });

              //submit btn
              commonPage.verifyIfElementVisible(
                manageUsersPage.elements.getModalSubmitBtn(),
              );

              commonPage.verifyIfElementEnabled(
                manageUsersPage.elements.getModalSubmitBtn(),
              );

              commonPage.verifyElementText(
                manageUsersPage.elements.getModalSubmitBtn(),
                this.manageUsersData.save_btn_text,
              );
              //type in inputs
              cy.addAdmin(
                EditUserData.user_email,
                EditUserData.first_name,
                EditUserData.last_name,
              );
              //verify success message after form submission
              commonPage.verifySucessToastMessage(
                this.manageUsersData.add_user_success_message,
              );
            }
          });
      });
    }
  });

  /**
   * TEST: Testing the manage users page
   * TEST STEP: click on the Left menu manage users > Add User
   * EXPECTED RESULT: Delete user functionality should work correctly in manage users page
   */
  it("Delete user functionality should work correctly in manage users page", function () {
    //click on Add User button
    if (isQuestionFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      manageUsersPage.elements.getUsersCards().each((UserCard, CardIndex) => {
        const positionOfCard = CardIndex + 1;
        cy.log("User Card: ", UserCard);
        manageUsersPage.elements
          .getUserCardName(positionOfCard)
          .invoke("text")
          .then((UserName) => {
            if (
              UserName ===
              `${EditUserData.first_name} ${EditUserData.last_name}`
            ) {
              //open modal
              commonPage.clickOnElementWithText(
                manageUsersPage.elements.getPageButtonWithText(),
                this.manageUsersData.page_add_user_button.label,
              );
              //delete user modal should open
              commonPage.verifyIfElementVisible(
                manageUsersPage.elements.getUserModal(),
              );

              // close modal
              commonPage.verifyIfElementVisible(
                commonPage.elements.getCloseModalButton(),
              );

              commonPage.clickOnCloseModalButton();

              //re-open modal
              commonPage.clickOnElementWithText(
                manageUsersPage.elements.getPageButtonWithText(),
                this.manageUsersData.page_add_user_button.label,
              );

              //verify success message after form submission
              commonPage.verifySucessToastMessage(
                this.manageUsersData.add_user_success_message,
              );
            }
          });
      });
    }
  });
});
