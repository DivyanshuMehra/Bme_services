import manageRaterPage from "../../../../pages/participant/manageRaterPage";
import common from "../../../../helpers/common";
import { UserFormField } from "../../../../interfaces/form-field";
import { UserInfo } from "../../../../interfaces/manage-user-info";
import { faker } from "@faker-js/faker";
import commonPage from "../../../../pages/commonPage";
import { defaultFakeEmailOptions } from "../../../../interfaces/fake-info";

let rater_type_random_index: number;
let ifAddedAsSelfRater: boolean;

const AddRaterData: UserInfo = {
  user_email: faker.internet.email({
    lastName: defaultFakeEmailOptions.lastname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  rater_type: "",
};

const UpdateRaterData: UserInfo = {
  user_email: faker.internet.email({
    lastName: defaultFakeEmailOptions.lastname,
    provider: defaultFakeEmailOptions.provider,
  }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  rater_type: "",
};

describe("Test the Rater: Create, Read, Update, Delete", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_participant);
        rater_type_random_index = common.getRandomNumberInBetween(
          1,
          commonData.how_many_rater_type,
        );
      });
    cy.fixture("participants/manageRatersData.json")
      .as("manageRaterData")
      .then((manageRaterData) => {
        commonPage.openPageUrl(manageRaterData.page_url);
        if (
          manageRaterPage.verifyUrlIncludes(
            manageRaterData.choose_account_page_url,
          )
        ) {
          ifAddedAsSelfRater = true;
          manageRaterPage.elements
            .getUserRolesCard()
            .each((roleCard, cardIndex) => {
              cy.log("Role Card: ", roleCard);
              const positionOfCard = cardIndex + 1;

              manageRaterPage.elements
                .getUserRolesCardRole(positionOfCard)
                .invoke("text")
                .then((role) => {
                  if (role === "participant") {
                    manageRaterPage.elements
                      .getRoleRadioButton(positionOfCard)
                      .click();
                    manageRaterPage.clickOnProceedButton();
                  }
                });
            });
          commonPage.verifyPageUrl(manageRaterData.dashboard_page_url);
        } else {
          ifAddedAsSelfRater = false;
        }
        commonPage.openPageUrl(manageRaterData.page_url);
        commonPage.verifyPageUrl(manageRaterData.page_url);
      });
  });
  /**
   * TEST: Testing the manage raters page
   * TEST STEP: click on the Left menu manage raters > Add rater
   * EXPECTED RESULT: Add rater functionality should work correctly in manage raters page under a participant login
   */

  it("Add rater functionality should work correctly in manage ratera page under a participant login", function () {
    //rater
    AddRaterData.rater_type =
      this.commonData?.rater_types[rater_type_random_index];
    //Set data to fill form end>>

    //verify if the rater has added self as a rater
    if (!ifAddedAsSelfRater) {
      cy.get(".btn-wrapper>.btn-secondary").click();
      commonPage.verifySucessToastMessage(
        this.manageRaterData.added_as_rater_message,
      );
      commonPage.loaderNotVisible();
    }
    //click on add rater button
    commonPage.clickOnElementWithText(
      manageRaterPage.elements.getAddRaterButton(),
      this.manageRaterData.add_rater_button_label,
    );
    //add rater modal should open
    commonPage.verifyIfElementVisible(manageRaterPage.elements.getRaterModal());

    // close modal
    commonPage.verifyIfElementVisible(
      commonPage.elements.getCloseModalButton(),
    );

    commonPage.clickOnCloseModalButton();

    //re-open modal
    commonPage.clickOnElementWithText(
      manageRaterPage.elements.getAddRaterButton(),
      this.manageRaterData.add_rater_button_label,
    );

    //modal title
    commonPage.verifyIfElementVisible(
      manageRaterPage.elements.getRaterModalTitle(),
    );

    commonPage.verifyElementText(
      manageRaterPage.elements.getRaterModalTitle(),
      this.manageRaterData.add_rater_modal_title,
    );
    //form
    this.manageRaterData.add_rater_form_fields.forEach(function (
      field: UserFormField,
      index: number,
    ) {
      const fieldIndex = index + 1;
      //label
      commonPage.verifyIfElementVisible(
        manageRaterPage.elements.getRaterModalLabel(fieldIndex),
      );

      commonPage.verifyElementText(
        manageRaterPage.elements.getRaterModalLabel(fieldIndex),
        field.label,
      );
      //input
      if (field.label === "Email") {
        commonPage.verifyIfElementVisible(
          manageRaterPage.elements.getRaterModalEmailInput(
            fieldIndex,
            field.type,
          ),
        );
        commonPage.verifyIfElementEnabled(
          manageRaterPage.elements.getRaterModalEmailInput(
            fieldIndex,
            field.type,
          ),
        );
      } else {
        commonPage.verifyIfElementVisible(
          manageRaterPage.elements.getRaterModalInput(fieldIndex, field.type),
        );
        commonPage.verifyIfElementEnabled(
          manageRaterPage.elements.getRaterModalInput(fieldIndex, field.type),
        );
      }

      //type in input
      if (field.type === "input") {
        if (field.label === "Email") {
          commonPage.typeValueInField(
            manageRaterPage.elements.getRaterModalEmailInput(
              fieldIndex,
              field.type,
            ),
            AddRaterData[field.name],
          );
        } else {
          commonPage.typeValueInField(
            manageRaterPage.elements.getRaterModalInput(fieldIndex, field.type),
            AddRaterData[field.name],
          );
        }
      } else if (field.type === "select") {
        commonPage.selectDropdownText(
          manageRaterPage.elements.getRaterModalInput(fieldIndex, field.type),
          AddRaterData[field.name],
        );
      }
    });
    //submit btn
    commonPage.verifyIfElementVisible(
      manageRaterPage.elements.getRaterModalSubmitBtn(),
    );
    commonPage.verifyIfElementEnabled(
      manageRaterPage.elements.getRaterModalSubmitBtn(),
    );
    commonPage.verifyElementText(
      manageRaterPage.elements.getRaterModalSubmitBtn(),
      this.manageRaterData.save_btn_text,
    );
    //submit form and verify message
    manageRaterPage.clickOnModalSubmitBtn();
    commonPage.verifySucessToastMessage(
      this.manageRaterData.add_rater_success_message,
    );
    //verify the added rater
    commonPage.loaderNotVisible();
    const positionOfRaterCard = this.commonData.index_of_first_user_card;
    const full_name: string = `${AddRaterData.first_name} ${AddRaterData.last_name}`;
    cy.verifyUserCardData(
      positionOfRaterCard,
      full_name,
      AddRaterData.user_email,
      this.manageRaterData.rater_icon_class,
    );
  });
  /**
   * TEST: Testing the manage raters page
   * TEST STEP: click on the Left menu manage raters > edit icon
   * EXPECTED RESULT: Edit rater functionality should work correctly in manage raters page under a participant login
   */
  it("Edit rater functionality should work correctly in manage participants page under a participant", function () {
    //<<start Set data to fill form
    UpdateRaterData.rater_type =
      this.commonData?.rater_types[rater_type_random_index];
    //search for the added rater to edit
    manageRaterPage.elements
      .getRaterCards()
      .each((RaterCard, RaterCardIndex) => {
        cy.log("Rater Card: ", RaterCard);
        let positionOfRaterCard = RaterCardIndex + 1;
        manageRaterPage.elements
          .getRaterCardEmail(positionOfRaterCard)
          .invoke("text")
          .then((UserEmail) => {
            if (UserEmail === AddRaterData.user_email) {
              //click on the edit button
              manageRaterPage.clickOnRaterEditBtn(positionOfRaterCard);

              //edit rater modal should open
              commonPage.verifyIfElementVisible(
                manageRaterPage.elements.getRaterModal(),
              );

              //close modal
              commonPage.verifyIfElementVisible(
                commonPage.elements.getCloseModalButton(),
              );
              commonPage.clickOnCloseModalButton();

              //re-open modal
              manageRaterPage.clickOnRaterEditBtn(positionOfRaterCard);

              //modal title
              commonPage.verifyIfElementVisible(
                manageRaterPage.elements.getRaterModalTitle(),
              );
              commonPage.verifyElementText(
                manageRaterPage.elements.getRaterModalTitle(),
                this.manageRaterData.edit_rater_modal_title,
              );

              //form
              this.manageRaterData.edit_rater_form_fields.forEach(function (
                field: UserFormField,
                index: number,
              ) {
                const fieldIndex = index + 1;
                //label
                commonPage.verifyIfElementVisible(
                  manageRaterPage.elements.getRaterModalLabel(fieldIndex),
                );

                commonPage.verifyElementText(
                  manageRaterPage.elements.getRaterModalLabel(fieldIndex),
                  field.label,
                );

                //input
                if (field.label === "Email") {
                  commonPage.verifyIfElementVisible(
                    manageRaterPage.elements.getRaterModalEmailInput(
                      fieldIndex,
                      field.type,
                    ),
                  );
                  commonPage.verifyIfElementEnabled(
                    manageRaterPage.elements.getRaterModalEmailInput(
                      fieldIndex,
                      field.type,
                    ),
                  );
                } else {
                  commonPage.verifyIfElementVisible(
                    manageRaterPage.elements.getRaterModalInput(
                      fieldIndex,
                      field.type,
                    ),
                  );
                  commonPage.verifyIfElementEnabled(
                    manageRaterPage.elements.getRaterModalInput(
                      fieldIndex,
                      field.type,
                    ),
                  );
                }

                //type in input
                if (field.type === "input") {
                  if (field.label === "Email") {
                    commonPage.typeValueInField(
                      manageRaterPage.elements.getRaterModalEmailInput(
                        fieldIndex,
                        field.type,
                      ),
                      UpdateRaterData[field.name],
                    );
                  } else {
                    commonPage.typeValueInField(
                      manageRaterPage.elements.getRaterModalInput(
                        fieldIndex,
                        field.type,
                      ),
                      UpdateRaterData[field.name],
                    );
                  }
                } else if (field.type === "select") {
                  commonPage.selectDropdownText(
                    manageRaterPage.elements.getRaterModalInput(
                      fieldIndex,
                      field.type,
                    ),
                    UpdateRaterData[field.name],
                  );
                }
              });
              //submit btn
              commonPage.verifyIfElementVisible(
                manageRaterPage.elements.getRaterModalSubmitBtn(),
              );
              commonPage.verifyIfElementEnabled(
                manageRaterPage.elements.getRaterModalSubmitBtn(),
              );
              commonPage.verifyElementText(
                manageRaterPage.elements.getRaterModalSubmitBtn(),
                this.manageRaterData.update_btn_text,
              );
              //submit form and verify message
              manageRaterPage.clickOnModalSubmitBtn();
              commonPage.loaderNotVisible();
              //@test-todo: added wait because value takes time to update
              // cy.wait(3000);
              commonPage.verifySucessToastMessage(
                this.manageRaterData.edit_rater_success_message,
              );
              //verify the edited rater
              commonPage.loaderNotVisible();
              positionOfRaterCard = this.commonData.index_of_first_user_card;
              const full_name: string = `${UpdateRaterData.first_name} ${UpdateRaterData.last_name}`;
              cy.verifyUserCardData(
                positionOfRaterCard,
                full_name,
                UpdateRaterData.user_email,
                this.manageRaterData.rater_icon_class,
              );
            }
          });
      });
  });

  /**
   * TEST: Testing the manage raters page
   * TEST STEP: click on the Left menu manage companies > Add rater > Delete rater
   * EXPECTED RESULT: Delete rater functionality should work correctly in manage raters page under a participant login
   */
  it("Delete rater functionality should work correctly in manage participants page under a participant", function () {
    const rater_full_name: string = `${AddRaterData.first_name} ${AddRaterData.last_name}`;
    cy.get("div.profile-btn>button")
      .invoke("text")
      .then((participantName) => {
        let ratersLeft: number;

        manageRaterPage.elements
          .getRaterCards()
          .its("length")
          .then((length) => {
            ratersLeft = length - 1;
          });

        manageRaterPage.elements
          .getRaterCards()
          .each((RaterCard, RaterCardIndex) => {
            cy.log("Rater Card: ", RaterCard);
            const positionOfRaterCard = RaterCardIndex + 1;

            if (positionOfRaterCard <= ratersLeft) {
              manageRaterPage.elements
                .getRaterCardEmail(positionOfRaterCard)
                .invoke("text")
                .then((UserEmail) => {
                  if (UserEmail === AddRaterData.user_email) {
                    //click on the delete button
                    manageRaterPage.clickOnRaterDeleteBtn(positionOfRaterCard);

                    //delete rater modal should open
                    commonPage.verifyIfElementVisible(
                      manageRaterPage.elements.getRaterModal(),
                    );
                    const message: string = ` Are you sure you want to remove ${rater_full_name} as rater against ${participantName}`;
                    cy.get(".modal-body>p")
                      .invoke("text")
                      .then((text) => {
                        expect(text).to.equal(message);
                      });

                    // click modal cancel button
                    commonPage.clickOnConfirmationModalButton(
                      this.commonData.confirmation_cancel_button_text,
                    );

                    //delete rater
                    cy.deleteUser(positionOfRaterCard);

                    //submit form and verify message
                    commonPage.verifySucessToastMessage(
                      this.manageRaterData.delete_rater_success_message,
                    );
                    //verify the deleted rater
                    commonPage.loaderNotVisible();
                    manageRaterPage.elements
                      .getRaterCards()
                      .its("length")
                      .then((length) => {
                        expect(length).to.equal(length);
                      });
                  }
                });
            }
          });
      });
  });
});
