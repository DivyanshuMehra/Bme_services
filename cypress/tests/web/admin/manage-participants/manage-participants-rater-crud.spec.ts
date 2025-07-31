import manageParticipantPage from "../../../../pages/admin/manageParticipantPage";
import common from "../../../../helpers/common";
import { UserInfo } from "../../../../interfaces/manage-user-info";
import { UserFormField } from "../../../../interfaces/form-field";
import { faker } from "@faker-js/faker";
import commonPage from "../../../../pages/commonPage";
import { defaultFakeEmailOptions } from "../../../../interfaces/fake-info";

let rater_type_random_index: number;

const AddParticipantData: UserInfo = {
  user_email: faker.internet.email({
    firstName: defaultFakeEmailOptions.firstname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  feedback_duration: "",
};

const AddRaterData: UserInfo = {
  user_email: faker.internet.email({
    lastName: defaultFakeEmailOptions.lastname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  rater_type: "",
  feedback_duration: "",
};

const UpdateRaterData: UserInfo = {
  user_email: faker.internet.email({
    lastName: defaultFakeEmailOptions.lastname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  rater_type: "",
  feedback_duration: "",
};

describe("Test the Participant: Create, Read, Update, Delete Rater under a participant", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_admin);
        rater_type_random_index = common.getRandomNumberInBetween(
          0,
          commonData.how_many_rater_type - 1,
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
   * TEST STEP: click on the Left menu manage participants > Add participant > Add rater
   * EXPECTED RESULT: Add rater functionality should work correctly in manage participants page under a participant
   */
  it("Add rater functionality should work correctly in manage participants page under a participant", function () {
    //<<start Set data to fill form
    //participant
    AddParticipantData.feedback_duration =
      this.manageParticipantData.minimum_feedback_duration.toString();

    //rater
    AddRaterData.rater_type =
      this.commonData.rater_types[rater_type_random_index];
    //Set data to fill form end>>

    //create new participant
    if (AddParticipantData.feedback_duration) {
      cy.addParticipant(
        AddParticipantData.user_email,
        AddParticipantData.first_name,
        AddParticipantData.last_name,
        AddParticipantData.feedback_duration,
      );
    }
    commonPage.loaderNotVisible();
    //verify participant card data
    cy.verifyParticipantCardData(
      this.commonData.index_of_first_user_card,
      AddParticipantData.user_email,
      `${AddParticipantData.first_name} ${AddParticipantData.last_name}`,
    );

    //send invite to the participant
    cy.sendInvitation(this.commonData.index_of_first_user_card);

    //click on the participant to open details
    manageParticipantPage.elements
      .getParticipantCards()
      .each((UserCard, UserCardIndex) => {
        cy.log("Participant Card:", UserCard);
        const positionOfCard = UserCardIndex + 1;
        manageParticipantPage.elements
          .getParticipantCardEmail(positionOfCard)
          .invoke("text")
          .then((UserEmail) => {
            if (UserEmail === AddParticipantData.user_email) {
              //click on the participant
              manageParticipantPage.clickOnParticipantCard(positionOfCard);
              //open modal
              manageParticipantPage.clickOnAddRaterBtn(
                this.manageParticipantData.add_rater_button_label,
              );
              //add rater modal should open
              commonPage.verifyIfElementVisible(
                manageParticipantPage.elements.getRaterModal(),
              );

              // close modal
              commonPage.verifyIfElementVisible(
                commonPage.elements.getCloseModalButton(),
              );
              commonPage.clickOnCloseModalButton();

              //re-open modal
              manageParticipantPage.clickOnAddRaterBtn(
                this.manageParticipantData.add_rater_button_label,
              );

              //modal title
              commonPage.verifyIfElementVisible(
                manageParticipantPage.elements.getRaterModalTitle(),
              );
              commonPage.verifyElementText(
                manageParticipantPage.elements.getRaterModalTitle(),
                this.manageParticipantData.add_rater_modal_title,
              );

              //form
              this.manageParticipantData.add_rater_form_fields.forEach(
                function (field: UserFormField, index: number) {
                  const fieldIndex = index + 1;
                  //label
                  commonPage.verifyIfElementVisible(
                    manageParticipantPage.elements.getRaterModalLabel(
                      fieldIndex,
                    ),
                  );

                  commonPage.verifyElementText(
                    manageParticipantPage.elements.getRaterModalLabel(
                      fieldIndex,
                    ),
                    field.label,
                  );

                  //input
                  if (field.label === "Email") {
                    commonPage.verifyIfElementVisible(
                      manageParticipantPage.elements.getRaterModalEmailInput(
                        fieldIndex,
                        field.type,
                      ),
                    );
                    commonPage.verifyIfElementEnabled(
                      manageParticipantPage.elements.getRaterModalEmailInput(
                        fieldIndex,
                        field.type,
                      ),
                    );
                  } else {
                    commonPage.verifyIfElementVisible(
                      manageParticipantPage.elements.getRaterModalInput(
                        fieldIndex,
                        field.type,
                      ),
                    );
                    commonPage.verifyIfElementEnabled(
                      manageParticipantPage.elements.getRaterModalInput(
                        fieldIndex,
                        field.type,
                      ),
                    );
                  }

                  //type in input
                  if (field.type === "input") {
                    if (field.label === "Email") {
                      commonPage.typeValueInField(
                        manageParticipantPage.elements.getRaterModalEmailInput(
                          fieldIndex,
                          field.type,
                        ),
                        AddRaterData[field.name],
                      );
                    } else {
                      commonPage.typeValueInField(
                        manageParticipantPage.elements.getRaterModalInput(
                          fieldIndex,
                          field.type,
                        ),
                        AddRaterData[field.name],
                      );
                    }
                  } else if (field.type === "select") {
                    commonPage.selectDropdownText(
                      manageParticipantPage.elements.getRaterModalInput(
                        fieldIndex,
                        field.type,
                      ),
                      AddRaterData[field.name],
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
              commonPage.verifyElementText(
                manageParticipantPage.elements.getModalSubmitBtn(),
                this.manageParticipantData.save_btn_text,
              );
              //submit form and verify message
              manageParticipantPage.clickOnModalSubmitBtn();
              commonPage.verifySucessToastMessage(
                this.manageParticipantData.add_rater_success_message,
              );
              //verify the added rater
              commonPage.loaderNotVisible();
              const positionOfRaterCard =
                this.commonData.index_of_first_user_card;
              const full_name: string = `${AddRaterData.first_name} ${AddRaterData.last_name}`;
              cy.verifyUserCardData(
                positionOfRaterCard,
                full_name,
                AddRaterData.user_email,
                this.manageParticipantData.rater_icon_class,
              );
              //back to the participant listing
              commonPage.openPageUrl(this.manageParticipantData.page_url);
              commonPage.verifyPageUrl(this.manageParticipantData.page_url);
            }
          });
      });
  });

  /**
   * TEST: Testing the manage participants page
   * TEST STEP: click on the Left menu manage companies > Add participant > Add rater
   * EXPECTED RESULT: Edit rater functionality should work correctly in manage participants page under a participant
   */
  it("Edit rater functionality should work correctly in manage participants page under a participant", function () {
    //<<start Set data to fill form
    UpdateRaterData.rater_type =
      this.commonData.rater_types[rater_type_random_index];
    //Set data to fill form end>>

    //search the added participant and then user
    manageParticipantPage.elements
      .getParticipantCards()
      .each((UserCard, UserCardIndex) => {
        cy.log("ParticipantCard: ", UserCard);
        const positionOfCard = UserCardIndex + 1;
        manageParticipantPage.elements
          .getParticipantCardEmail(positionOfCard)
          .invoke("text")
          .then((UserEmail) => {
            if (UserEmail === AddParticipantData.user_email) {
              //click on the participant
              manageParticipantPage.clickOnParticipantCard(positionOfCard);

              //search for the added rater to edit
              manageParticipantPage.elements
                .getRaterCards()
                .each((RaterCard, RaterCardIndex) => {
                  cy.log("Rater Card: ", RaterCard);
                  const positionOfRaterCard = RaterCardIndex + 1;
                  manageParticipantPage.elements
                    .getRaterCardEmail(positionOfRaterCard)
                    .invoke("text")
                    .then((UserEmail) => {
                      if (UserEmail === AddRaterData.user_email) {
                        //click on the edit button
                        manageParticipantPage.clickOnRaterEditBtn(
                          positionOfRaterCard,
                        );

                        //edit rater modal should open
                        commonPage.verifyIfElementVisible(
                          manageParticipantPage.elements.getRaterModal(),
                        );

                        //close modal
                        commonPage.verifyIfElementVisible(
                          commonPage.elements.getCloseModalButton(),
                        );
                        commonPage.clickOnCloseModalButton();

                        //re-open modal
                        manageParticipantPage.clickOnRaterEditBtn(
                          positionOfRaterCard,
                        );

                        //modal title
                        commonPage.verifyIfElementVisible(
                          manageParticipantPage.elements.getRaterModalTitle(),
                        );
                        commonPage.verifyElementText(
                          manageParticipantPage.elements.getRaterModalTitle(),
                          this.manageParticipantData.edit_rater_modal_title,
                        );

                        //form
                        this.manageParticipantData.edit_rater_form_fields.forEach(
                          function (field: UserFormField, index: number) {
                            const fieldIndex = index + 1;
                            //label
                            commonPage.verifyIfElementVisible(
                              manageParticipantPage.elements.getRaterModalLabel(
                                fieldIndex,
                              ),
                            );

                            commonPage.verifyElementText(
                              manageParticipantPage.elements.getRaterModalLabel(
                                fieldIndex,
                              ),
                              field.label,
                            );

                            //input
                            if (field.label === "Email") {
                              commonPage.verifyIfElementVisible(
                                manageParticipantPage.elements.getRaterModalEmailInput(
                                  fieldIndex,
                                  field.type,
                                ),
                              );
                              commonPage.verifyIfElementEnabled(
                                manageParticipantPage.elements.getRaterModalEmailInput(
                                  fieldIndex,
                                  field.type,
                                ),
                              );
                            } else {
                              commonPage.verifyIfElementVisible(
                                manageParticipantPage.elements.getRaterModalInput(
                                  fieldIndex,
                                  field.type,
                                ),
                              );
                              commonPage.verifyIfElementEnabled(
                                manageParticipantPage.elements.getRaterModalInput(
                                  fieldIndex,
                                  field.type,
                                ),
                              );
                            }

                            //type in input
                            if (field.type === "input") {
                              if (field.label === "Email") {
                                commonPage.typeValueInField(
                                  manageParticipantPage.elements.getRaterModalEmailInput(
                                    fieldIndex,
                                    field.type,
                                  ),
                                  UpdateRaterData[field.name],
                                );
                              } else {
                                commonPage.typeValueInField(
                                  manageParticipantPage.elements.getRaterModalInput(
                                    fieldIndex,
                                    field.type,
                                  ),
                                  UpdateRaterData[field.name],
                                );
                              }
                            } else if (field.type === "select") {
                              commonPage.selectDropdownText(
                                manageParticipantPage.elements.getRaterModalInput(
                                  fieldIndex,
                                  field.type,
                                ),
                                UpdateRaterData[field.name],
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
                        commonPage.verifyElementText(
                          manageParticipantPage.elements.getModalSubmitBtn(),
                          this.manageParticipantData.update_btn_text,
                        );
                        //submit form and verify message
                        manageParticipantPage.clickOnModalSubmitBtn();
                        commonPage.verifySucessToastMessage(
                          this.manageParticipantData.edit_rater_success_message,
                        );
                        //verify the edited rater
                        commonPage.loaderNotVisible();
                        //@test-todo: verify the data/ skip for now
                        // const RaterCardIndex =
                        //   this.commonData.index_of_first_user_card;
                        // const full_name: string = `${UpdateRaterData.first_name} ${UpdateRaterData.last_name}`;
                        // cy.verifyUserCardData(
                        //   RaterCardIndex,
                        //   full_name,
                        //   UpdateRaterData.user_email,
                        //   this.manageParticipantData.rater_icon_class,
                        // );
                      }
                    });
                });
              //back to the participant listing
              commonPage.openPageUrl(this.manageParticipantData.page_url);
              commonPage.verifyPageUrl(this.manageParticipantData.page_url);
            }
          });
      });
  });

  /**
   * TEST: Testing the manage participants page
   * TEST STEP: click on the Left menu manage companies > Add participant > Delete rater
   * EXPECTED RESULT: Delete rater functionality should work correctly in manage participants page under a participant
   */
  it("Delete rater functionality should work correctly in manage participants page under a participant", function () {
    const rater_full_name: string = `${UpdateRaterData.first_name} ${UpdateRaterData.last_name}`;
    const participant_full_name: string = `${AddParticipantData.first_name} ${AddParticipantData.last_name}`;

    //search the added participant and then rater
    manageParticipantPage.elements
      .getParticipantCards()
      .each((UserCard, UserCardIndex) => {
        cy.log("Participant Card: ", UserCard);
        const positionOfCard = UserCardIndex + 1;
        manageParticipantPage.elements
          .getParticipantCardEmail(positionOfCard)
          .invoke("text")
          .then((UserEmail) => {
            if (UserEmail === AddParticipantData.user_email) {
              //click on the participant
              manageParticipantPage.clickOnParticipantCard(positionOfCard);

              //search for the added rater to delete
              manageParticipantPage.elements
                .getRaterCards()
                .each((RaterCard, RaterCardIndex) => {
                  cy.log("Rater Card: ", RaterCard);
                  const positionOfRaterCard = RaterCardIndex + 1;
                  manageParticipantPage.elements
                    .getRaterCardEmail(positionOfRaterCard)
                    .invoke("text")
                    .then((UserEmail) => {
                      if (UserEmail === UpdateRaterData.user_email) {
                        //click on the edit button
                        manageParticipantPage.clickOnRaterDeleteBtn(
                          positionOfRaterCard,
                        );

                        //delete rater modal should open
                        commonPage.verifyIfElementVisible(
                          manageParticipantPage.elements.getRaterModal(),
                        );

                        //verify confirmation modal
                        cy.verifyDeleteModalMessage(
                          rater_full_name,
                          participant_full_name,
                          this.commonData.user_type_rater,
                        );
                        //verify buttons
                        commonPage.verifyIfElementVisible(
                          commonPage.elements.getConfirmationModalButton(
                            this.commonData.confirmation_cancel_button_text,
                          ),
                        );

                        commonPage.verifyIfElementVisible(
                          commonPage.elements.getConfirmationModalButton(
                            this.commonData.confirmation_delete_button_text,
                          ),
                        );

                        // click modal cancel button
                        commonPage.clickOnConfirmationModalButton(
                          this.commonData.confirmation_cancel_button_text,
                        );

                        //delete rater
                        cy.deleteUser(positionOfRaterCard);

                        //submit form and verify message
                        commonPage.loaderNotVisible();
                        commonPage.verifySucessToastMessage(
                          this.manageParticipantData
                            .delete_rater_success_message,
                        );
                        commonPage.loaderNotVisible();
                        //verify the deleted rater
                        //@test-todo: verify the data once fixed
                        // manageParticipantPage.elements
                        //   .getRaterCards()
                        //   .its("length")
                        //   .then((length) => {
                        //     expect(length).to.equal(1);
                        //   });
                      }
                    });
                });
              //back to the participant listing
              commonPage.openPageUrl(this.manageParticipantData.page_url);
              commonPage.verifyPageUrl(this.manageParticipantData.page_url);
            }
          });
      });
  });
});
