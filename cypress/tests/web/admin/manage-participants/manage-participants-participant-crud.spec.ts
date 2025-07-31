import manageParticipantPage from "../../../../pages/admin/manageParticipantPage";
import common from "../../../../helpers/common";
import { UserInfo } from "../../../../interfaces/manage-user-info";
import { UserFormField } from "../../../../interfaces/form-field";
import { faker } from "@faker-js/faker";
import commonPage from "../../../../pages/commonPage";
import { defaultFakeEmailOptions } from "../../../../interfaces/fake-info";

let feedback_duration_random_index: number;
const AddParticipantData: UserInfo = {
  user_email: faker.internet.email({
    lastName: defaultFakeEmailOptions.lastname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  feedback_duration: "",
};

const EditParticipantData: UserInfo = {
  user_email: faker.internet.email({
    lastName: defaultFakeEmailOptions.lastname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  feedback_duration: "",
};

describe("Test the Participant: Create, Read, Update, Delete", function () {
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
    cy.fixture("admin/manageParticipantData.json")
      .as("manageParticipantData")
      .then((manageParticipantData) => {
        commonPage.openPageUrl(manageParticipantData.page_url);
        commonPage.verifyPageUrl(manageParticipantData.page_url);
      });
  });
  /**
   * TEST: Testing the manage participants page
   * TEST STEP: click on the Left menu manage participants > Add participant
   * EXPECTED RESULT: Add Participant functionality should work correctly in manage participants page
   */
  it("Add Participant functionality should work correctly in manage participants page", function () {
    //<<start Set data to fill form
    AddParticipantData.feedback_duration =
      this.commonData.feedback_durations[feedback_duration_random_index];
    //Set data to fill form end>>
    //click on Add participant button
    commonPage.clickOnPageTopButtonWithText(
      this.manageParticipantData.page_add_participant_button.label,
    );

    //add participant modal should open
    commonPage.verifyIfElementVisible(
      manageParticipantPage.elements.getParticipantModal(),
    );

    // close modal
    commonPage.verifyIfElementVisible(
      commonPage.elements.getCloseModalButton(),
    );
    commonPage.clickOnCloseModalButton();

    //re-open modal
    commonPage.clickOnPageTopButtonWithText(
      this.manageParticipantData.page_add_participant_button.label,
    );
    //modal title
    commonPage.verifyIfElementVisible(
      manageParticipantPage.elements.getParticipantModalTitle(),
    );

    commonPage.verifyElementText(
      manageParticipantPage.elements.getParticipantModalTitle(),
      this.manageParticipantData.add_participant_title,
    );

    //form
    this.manageParticipantData.add_participant_form_fields.forEach(function (
      field: UserFormField,
      index: number,
    ) {
      const fieldIndex = index + 1;
      //label
      commonPage.verifyIfElementVisible(
        manageParticipantPage.elements.getParticipantModalLabel(fieldIndex),
      );

      commonPage.verifyElementText(
        manageParticipantPage.elements.getParticipantModalLabel(fieldIndex),
        field.label,
      );

      //input
      if (field.label === "Email") {
        commonPage.verifyIfElementVisible(
          manageParticipantPage.elements.getParticipantModalEmailInput(
            fieldIndex,
            field.type,
          ),
        );
        commonPage.verifyIfElementEnabled(
          manageParticipantPage.elements.getParticipantModalEmailInput(
            fieldIndex,
            field.type,
          ),
        );
      } else {
        commonPage.verifyIfElementVisible(
          manageParticipantPage.elements.getParticipantModalInput(
            fieldIndex,
            field.type,
          ),
        );
        commonPage.verifyIfElementEnabled(
          manageParticipantPage.elements.getParticipantModalInput(
            fieldIndex,
            field.type,
          ),
        );
      }

      //type in input
      if (field.type === "input") {
        if (field.label === "Email") {
          commonPage.typeValueInField(
            manageParticipantPage.elements.getParticipantModalEmailInput(
              fieldIndex,
              field.type,
            ),
            AddParticipantData[field.name],
          );
        } else {
          commonPage.typeValueInField(
            manageParticipantPage.elements.getParticipantModalInput(
              fieldIndex,
              field.type,
            ),
            AddParticipantData[field.name],
          );
        }
      } else if (field.type === "select") {
        commonPage.selectDropdownText(
          manageParticipantPage.elements.getParticipantModalInput(
            fieldIndex,
            field.type,
          ),
          AddParticipantData[field.name],
        );
      }
    });

    //submit btn
    commonPage.verifyIfElementVisible(
      manageParticipantPage.elements.getModalSubmitBtn(),
    );

    commonPage.verifyIfElementEnabled(
      manageParticipantPage.elements.getModalSubmitBtn(),
    );

    commonPage.verifyElementText(
      manageParticipantPage.elements.getModalSubmitBtn(),
      this.manageParticipantData.save_btn_text,
    );

    // click on submit button
    manageParticipantPage.clickOnModalSubmitBtn();

    //verify success message after form submission
    commonPage.verifySucessToastMessage(
      this.manageParticipantData.add_participant_success_message,
    );
    //verify the added participant
    commonPage.loaderNotVisible();
    const positionOfCard = this.commonData.index_of_first_user_card;
    const full_name: string = `${AddParticipantData.first_name} ${AddParticipantData.last_name}`;
    cy.verifyParticipantCardData(
      positionOfCard,
      AddParticipantData.user_email,
      full_name,
    );
  });
  /**
   * TEST: Testing the manage participants page
   * TEST STEP: click on the Left menu manage participants > click on the edit button on the card
   * EXPECTED RESULT: Edit Participant functionality should work correctly in manage participants page
   */
  it("Edit Participant functionality should work correctly in manage participants page", function () {
    //<<start Set data to fill form
    EditParticipantData.feedback_duration =
      this.commonData.feedback_durations[feedback_duration_random_index];
    //click on edit participant button
    manageParticipantPage.elements
      .getParticipantCards()
      .each((UserCard, UserCardIndex) => {
        cy.log("ParticipantCard: ", UserCard);
        const positionOfCard = UserCardIndex + 1;
        manageParticipantPage.elements
          .getParticipantCardName(positionOfCard)
          .invoke("text")
          .then((UserName) => {
            if (
              UserName ===
              `${AddParticipantData.first_name} ${AddParticipantData.last_name}`
            ) {
              //open modal
              manageParticipantPage.clickOnParticipantEditBtn(positionOfCard);
              //edit participant modal should open
              commonPage.verifyIfElementVisible(
                manageParticipantPage.elements.getParticipantModal(),
              );

              // close modal
              commonPage.verifyIfElementVisible(
                commonPage.elements.getCloseModalButton(),
              );
              commonPage.clickOnCloseModalButton();

              //re-open modal
              manageParticipantPage.clickOnParticipantEditBtn(positionOfCard);
              //modal title
              commonPage.verifyIfElementVisible(
                manageParticipantPage.elements.getParticipantModalTitle(),
              );
              commonPage.verifyElementText(
                manageParticipantPage.elements.getParticipantModalTitle(),
                this.manageParticipantData.update_participant_title,
              );

              //form
              this.manageParticipantData.edit_participant_form_fields.forEach(
                function (field: UserFormField, index: number) {
                  const fieldIndex = index + 1;
                  //label
                  commonPage.verifyIfElementVisible(
                    manageParticipantPage.elements.getParticipantModalLabel(
                      fieldIndex,
                    ),
                  );

                  commonPage.verifyElementText(
                    manageParticipantPage.elements.getParticipantModalLabel(
                      fieldIndex,
                    ),
                    field.label,
                  );

                  //input
                  if (field.label === "Email") {
                    commonPage.verifyIfElementVisible(
                      manageParticipantPage.elements.getParticipantModalEmailInput(
                        fieldIndex,
                        field.type,
                      ),
                    );
                    commonPage.verifyIfElementEnabled(
                      manageParticipantPage.elements.getParticipantModalEmailInput(
                        fieldIndex,
                        field.type,
                      ),
                    );
                  } else {
                    commonPage.verifyIfElementVisible(
                      manageParticipantPage.elements.getParticipantModalInput(
                        fieldIndex,
                        field.type,
                      ),
                    );
                    commonPage.verifyIfElementEnabled(
                      manageParticipantPage.elements.getParticipantModalInput(
                        fieldIndex,
                        field.type,
                      ),
                    );
                  }

                  //type in input
                  if (field.type === "input") {
                    if (field.label === "Email") {
                      commonPage.typeValueInField(
                        manageParticipantPage.elements.getParticipantModalEmailInput(
                          fieldIndex,
                          field.type,
                        ),
                        EditParticipantData[field.name],
                      );
                    } else {
                      commonPage.typeValueInField(
                        manageParticipantPage.elements.getParticipantModalInput(
                          fieldIndex,
                          field.type,
                        ),
                        EditParticipantData[field.name],
                      );
                    }
                  } else if (field.type === "select") {
                    commonPage.selectDropdownText(
                      manageParticipantPage.elements.getParticipantModalInput(
                        fieldIndex,
                        field.type,
                      ),
                      EditParticipantData[field.name],
                    );
                  }
                },
              );

              //submit btn
              commonPage.verifyIfElementVisible(
                manageParticipantPage.elements.getModalSubmitBtn(),
              );

              commonPage.verifyIfElementEnabled(
                manageParticipantPage.elements.getModalSubmitBtn(),
              );

              //verify the update button text
              commonPage.verifyElementText(
                manageParticipantPage.elements.getModalSubmitBtn(),
                this.manageParticipantData.update_btn_text,
              );
              manageParticipantPage.clickOnModalSubmitBtn();
            }
          });
      });
    // click on submit button
    //verify success message after form submission
    commonPage.verifySucessToastMessage(
      this.manageParticipantData.edit_participant_success_message,
    );
    //verify the updated data
    commonPage.loaderNotVisible();
    const positionOfCard = this.commonData.index_of_first_user_card;
    const full_name: string = `${EditParticipantData.first_name} ${EditParticipantData.last_name}`;
    cy.verifyParticipantCardData(
      positionOfCard,
      EditParticipantData.user_email,
      full_name,
    );
  });
  /**
   * TEST: Testing the manage participants page
   * TEST STEP: click on the Left menu manage participants > click on the delete button on the card
   * EXPECTED RESULT: Delete Participant functionality should work correctly in manage participants page
   */
  it("Delete Participant functionality should work correctly in manage participants page", function () {
    //click on delete participant button
    let participantsLeft: number;

    manageParticipantPage.elements
      .getParticipantCards()
      .its("length")
      .then((length) => {
        participantsLeft = length - 1;
      });
    manageParticipantPage.elements
      .getParticipantCards()
      .each((UserCard, UserCardIndex) => {
        cy.log("Participant Card:  ", UserCard);
        const positionOfCard = UserCardIndex + 1;

        if (positionOfCard <= participantsLeft) {
          manageParticipantPage.elements
            .getParticipantCardName(positionOfCard)
            .invoke("text")
            .then((UserName) => {
              if (
                UserName ===
                `${EditParticipantData.first_name} ${EditParticipantData.last_name}`
              ) {
                //open modal
                manageParticipantPage.clickOnParticipantDeleteBtn(
                  positionOfCard,
                );
                //delete modal should open
                commonPage.verifyIfElementVisible(
                  manageParticipantPage.elements.getParticipantModal(),
                );

                // click modal cancel button
                commonPage.clickOnConfirmationModalButton(
                  this.commonData.confirmation_cancel_button_text,
                );
                //delete participant
                cy.deleteUser(positionOfCard);

                //verify success message after form submission
                commonPage.verifySucessToastMessage(
                  this.manageParticipantData.delete_participant_success_message,
                );
              }
            });
        }
      });

    //verify the deleted data
    commonPage.loaderNotVisible();
    manageParticipantPage.elements
      .getParticipantCards()
      .each((UserCard, UserCardIndex) => {
        cy.log("Participant Card: ", UserCard);
        const positionOfCard = UserCardIndex + 1;

        manageParticipantPage.elements
          .getParticipantCardName(positionOfCard)
          .invoke("text")
          .then((UserName) => {
            expect(UserName).not.equal(
              `${EditParticipantData.first_name} ${EditParticipantData.last_name}`,
            );
          });
      });
  });
});
