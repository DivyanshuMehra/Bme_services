import commonPage from "../../../pages/commonPage";
import manageQuestionPage from "../../../pages/manageQuestionPage";
import common from "../../../helpers/common";
import { QuestionFormField } from "../../../interfaces/form-field";
import { QuestionInfo } from "../../../interfaces/questions-info";
import { faker } from "@faker-js/faker";

let isQuestionFreezed: boolean;
let question_type_random_index: number;
let question_category_random_index: number;
let question_subcategory_random_index: number;

const AddQuestionData: QuestionInfo = {
  question: faker.lorem.lines(1),
  question_type: "",
};

const UpdateQuestionData: QuestionInfo = {
  question: faker.lorem.lines(1),
  question_type: "",
};

describe("Test The Manage Questions Page: Question Create, Read, Update, Delete", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_super_admin);
        question_type_random_index = common.getRandomNumberInBetween(
          0,
          commonData.how_many_question_type - 1,
        );

        question_category_random_index = common.getRandomNumberInBetween(
          0,
          commonData.how_many_question_category - 1,
        );

        question_subcategory_random_index = common.getRandomNumberInBetween(
          0,
          commonData.how_many_question_subcategory - 1,
        );
      });
    cy.fixture("manageQuestionData.json")
      .as("manageQuestionData")
      .then((manageQuestionData) => {
        commonPage.openPageUrl(manageQuestionData.page_url);
        commonPage.verifyPageUrl(manageQuestionData.page_url);
      });

    common.checkIfSTQuestionsFreezed().then((isFreezed) => {
      isQuestionFreezed = isFreezed ? true : false;
    });
  });

  /**
   * TEST: Testing the manage questions page
   * TEST STEP: click on the Left menu manage questions > Add Question
   * EXPECTED RESULT: Add question functionality should work correctly in manage questions page
   */
  it("Add question functionality should work correctly in manage questions page", function () {
    //<<Start Set Data to fill form
    AddQuestionData.question_type =
      this.commonData.st_question_type[question_type_random_index];

    AddQuestionData.question_category =
      this.commonData.st_question_category[question_category_random_index];

    AddQuestionData.question_sub_category =
      this.commonData.st_question_subcategory[
        question_subcategory_random_index
      ];
    // Set Data to fill form End>>

    //click on add question button
    commonPage.clickOnPageTopButtonWithText(
      this.manageQuestionData.page_add_question_button.label,
    );

    if (isQuestionFreezed) {
      //there should be warning message in toast
      commonPage.verifyErrorToastMessage(
        this.manageQuestionData
          .message_on_add_question_button_when_question_freezed,
      );
    } else {
      //add question modal should open
      commonPage.verifyIfElementVisible(
        manageQuestionPage.elements.getAddQuestionModal(),
      );

      // close modal
      commonPage.verifyIfElementVisible(
        commonPage.elements.getCloseModalButton(),
      );

      commonPage.clickOnCloseModalButton();

      //open modal
      commonPage.clickOnPageTopButtonWithText(
        this.manageQuestionData.page_add_question_button.label,
      );

      //modal title
      commonPage.verifyIfElementVisible(
        manageQuestionPage.elements.getAddQuestionModalTitle(),
      );

      commonPage.verifyElementText(
        manageQuestionPage.elements.getAddQuestionModalTitle(),
        this.manageQuestionData.add_question_title,
      );

      //form
      this.manageQuestionData.add_question_form_fields.forEach(
        (field: QuestionFormField, index: number) => {
          const fieldIndex = index + 1;

          if (
            AddQuestionData.question_type ===
              this.commonData.st_question_type_rating ||
            field.name === "question" ||
            field.name === "question_type"
          ) {
            //label
            commonPage.verifyIfElementVisible(
              manageQuestionPage.elements.getAddQuestionLabel(fieldIndex),
            );

            commonPage.verifyElementText(
              manageQuestionPage.elements.getAddQuestionLabel(fieldIndex),
              field.label,
            );

            //input
            commonPage.verifyIfElementVisible(
              manageQuestionPage.elements.getAddQuestionInput(
                fieldIndex,
                field.type,
              ),
            );

            commonPage.verifyIfElementEnabled(
              manageQuestionPage.elements.getAddQuestionInput(
                fieldIndex,
                field.type,
              ),
            );

            //type in input
            if (field.type === "textarea") {
              commonPage.typeValueInField(
                manageQuestionPage.elements.getAddQuestionInput(
                  fieldIndex,
                  field.type,
                ),
                AddQuestionData[field.name],
              );
            }

            if (field.type === "select") {
              commonPage.selectDropdownText(
                manageQuestionPage.elements.getAddQuestionInput(
                  fieldIndex,
                  field.type,
                ),
                AddQuestionData[field.name],
              );
            }
          }
        },
      );

      //save btn
      commonPage.verifyIfElementVisible(
        manageQuestionPage.elements.getAddQuestionSaveBtn(),
      );

      commonPage.verifyIfElementEnabled(
        manageQuestionPage.elements.getAddQuestionSaveBtn(),
      );

      commonPage.verifyElementText(
        manageQuestionPage.elements.getAddQuestionSaveBtn(),
        this.manageQuestionData.save_btn_text,
      );

      //submit form and verify success message
      manageQuestionPage.clickOnAddQuestionSaveBtn();
      commonPage.verifySucessToastMessage(
        this.manageQuestionData.add_question_success_message,
      );

      //verify updated data
      commonPage.clickOnPaginationLastButton();
      commonPage.loaderNotVisible();
      manageQuestionPage.elements
        .getQuestionCards()
        .each((QuestionCard, QuestionCardIndex) => {
          cy.log("QuestionCard: ", QuestionCard);
          const positionOfCard = QuestionCardIndex + 1;

          manageQuestionPage.elements
            .getQuestionCardIndexQuestion(positionOfCard)
            .invoke("text")
            .then((questionText) => {
              if (questionText === AddQuestionData.question) {
                if (
                  AddQuestionData.question_type ===
                  this.commonData.st_question_type_rating
                ) {
                  cy.verifyQuestionCardData(
                    positionOfCard,
                    questionText,
                    AddQuestionData.question_type,
                    AddQuestionData.question_category,
                    AddQuestionData.question_sub_category,
                  );
                } else {
                  cy.verifyQuestionCardData(
                    positionOfCard,
                    questionText,
                    AddQuestionData.question_type,
                  );
                }
              }
            });
        });
    }
  });

  /**
   * TEST: Testing the manage questions page
   * TEST STEP: click on the Left menu manage questions > Add Question
   * EXPECTED RESULT: Edit questions functionality should work correctly in manage questions page
   */
  it("Edit question functionality should work correctly in manage questions page", function () {
    //<<Start Set Data to fill
    UpdateQuestionData.question_type =
      this.commonData.st_question_type[question_type_random_index];

    UpdateQuestionData.question_category =
      this.commonData.st_question_category[question_category_random_index];

    UpdateQuestionData.question_sub_category =
      this.commonData.st_question_subcategory[
        question_subcategory_random_index
      ];
    // Set Data to fill End>>

    //click on last page
    commonPage.clickOnPaginationLastButton();

    //check if last page is active
    commonPage.verifyIFPaginationPageIsActive(
      commonPage.elements.getPaginationLastIndex(
        this.commonData.pagination_last_page,
      ),
    );

    manageQuestionPage.elements
      .getQuestionCards()
      .each((QuestionCard, QuestionCardIndex) => {
        cy.log("QuestionCard", QuestionCard);
        const positionOfCard = QuestionCardIndex + 1;

        manageQuestionPage.elements
          .getQuestionCardIndexQuestion(positionOfCard)
          .invoke("text")
          .then((questionText) => {
            if (questionText === AddQuestionData.question) {
              //open modal
              manageQuestionPage.clickOnQuestionThreeDotBtn(positionOfCard);
              manageQuestionPage.clickOnQuestionThreeDotActionBtn(
                positionOfCard,
                this.manageQuestionData.question_edit_action_label,
              );

              //edit question modal should open
              commonPage.verifyIfElementVisible(
                manageQuestionPage.elements.getEditQuestionModal(),
              );

              // close modal
              commonPage.verifyIfElementVisible(
                commonPage.elements.getCloseModalButton(),
              );

              commonPage.clickOnCloseModalButton();

              //open modal
              manageQuestionPage.clickOnQuestionThreeDotBtn(positionOfCard);
              manageQuestionPage.clickOnQuestionThreeDotActionBtn(
                positionOfCard,
                this.manageQuestionData.question_edit_action_label,
              );

              //modal title
              commonPage.verifyIfElementVisible(
                manageQuestionPage.elements.getEditQuestionModalTitle(),
              );

              commonPage.verifyElementText(
                manageQuestionPage.elements.getEditQuestionModalTitle(),
                this.manageQuestionData.update_question_title,
              );

              //edit form
              this.manageQuestionData.update_question_form_fields.forEach(
                (field: QuestionFormField, index: number) => {
                  const fieldIndex = index + 1;

                  if (
                    UpdateQuestionData.question_type ===
                      this.commonData.st_question_type_rating ||
                    field.name === "question" ||
                    field.name === "question_type"
                  ) {
                    //label
                    commonPage.verifyIfElementVisible(
                      manageQuestionPage.elements.getEditQuestionLabel(
                        fieldIndex,
                      ),
                    );

                    commonPage.verifyElementText(
                      manageQuestionPage.elements.getEditQuestionLabel(
                        fieldIndex,
                      ),
                      field.label,
                    );

                    //input
                    commonPage.verifyIfElementVisible(
                      manageQuestionPage.elements.getEditQuestionInput(
                        fieldIndex,
                        field.type,
                      ),
                    );

                    commonPage.verifyIfElementEnabled(
                      manageQuestionPage.elements.getEditQuestionInput(
                        fieldIndex,
                        field.type,
                      ),
                    );

                    //type in input
                    if (field.type === "textarea") {
                      commonPage.typeValueInField(
                        manageQuestionPage.elements.getEditQuestionInput(
                          fieldIndex,
                          field.type,
                        ),
                        UpdateQuestionData[field.name],
                      );
                    }

                    if (field.type === "select") {
                      commonPage.selectDropdownText(
                        manageQuestionPage.elements.getEditQuestionInput(
                          fieldIndex,
                          field.type,
                        ),
                        UpdateQuestionData[field.name],
                      );
                    }
                  }
                },
              );

              //check update button
              commonPage.verifyIfElementVisible(
                manageQuestionPage.elements.getEditQuestionSubmitBtn(),
              );

              commonPage.verifyIfElementEnabled(
                manageQuestionPage.elements.getEditQuestionSubmitBtn(),
              );

              commonPage.verifyElementText(
                manageQuestionPage.elements.getEditQuestionSubmitBtn(),
                this.manageQuestionData.update_btn_text,
              );

              //submit update form
              manageQuestionPage.clickOnEditQuestionSubmitBtn();
              commonPage.verifySucessToastMessage(
                this.manageQuestionData.update_question_success_message,
              );
              //verify updated data
              commonPage.clickOnPaginationLastButton();
              commonPage.loaderNotVisible();
              manageQuestionPage.elements
                .getQuestionCards()
                .each((QuestionCard, QuestionCardIndex) => {
                  cy.log("QuestionCard: ", QuestionCard);
                  const positionOfCard = QuestionCardIndex + 1;

                  manageQuestionPage.elements
                    .getQuestionCardIndexQuestion(positionOfCard)
                    .invoke("text")
                    .then((questionText) => {
                      if (questionText === UpdateQuestionData.question) {
                        if (
                          UpdateQuestionData.question_type ===
                          this.commonData.st_question_type_rating
                        ) {
                          cy.verifyQuestionCardData(
                            positionOfCard,
                            questionText,
                            UpdateQuestionData.question_type,
                            UpdateQuestionData.question_category,
                            UpdateQuestionData.question_sub_category,
                          );
                        } else {
                          cy.verifyQuestionCardData(
                            positionOfCard,
                            questionText,
                            UpdateQuestionData.question_type,
                          );
                        }
                      }
                    });
                });
            }
          });
      });
  });

  /**
   * TEST: Testing the manage questions page
   * TEST STEP: click on the Left menu manage questions > Add Question
   * EXPECTED RESULT: Delete question functionality should work correctly in manage questions page
   */
  it("Delete question functionality should work correctly in manage questions page", function () {
    //click on last page
    commonPage.clickOnPaginationLastButton();

    //check if last page is active
    commonPage.verifyIFPaginationPageIsActive(
      commonPage.elements.getPaginationLastIndex(
        this.commonData.pagination_last_page,
      ),
    );

    manageQuestionPage.elements
      .getQuestionCards()
      .each((QuestionCard, QuestionCardIndex) => {
        cy.log("QuestionCard", QuestionCard);
        const positionOfCard = QuestionCardIndex + 1;

        manageQuestionPage.elements
          .getQuestionCardIndexQuestion(positionOfCard)
          .invoke("text")
          .then((questionText) => {
            if (questionText === UpdateQuestionData.question) {
              //open delete modal
              manageQuestionPage.clickOnQuestionThreeDotBtn(positionOfCard);
              manageQuestionPage.clickOnQuestionThreeDotActionBtn(
                positionOfCard,
                this.manageQuestionData.question_delete_action_label,
              );

              //verify confirmation modal
              commonPage.verifyConfirmationModal(
                this.manageQuestionData.delete_confirmation_message,
                this.commonData.confirmation_cancel_button_text,
                this.commonData.confirmation_delete_button_text,
              );

              //click modal cancel button
              commonPage.clickOnConfirmationModalButton(
                this.commonData.confirmation_cancel_button_text,
              );

              //open delete modal
              manageQuestionPage.clickOnQuestionThreeDotBtn(positionOfCard);
              manageQuestionPage.clickOnQuestionThreeDotActionBtn(
                positionOfCard,
                this.manageQuestionData.question_delete_action_label,
              );

              //click on delete button
              commonPage.clickOnConfirmationModalButton(
                this.commonData.confirmation_delete_button_text,
              );

              //verify success message
              commonPage.verifySucessToastMessage(
                this.manageQuestionData.delete_question_success_message,
              );
              //verify the deleted data
              manageQuestionPage.elements
                .getQuestionCards()
                .each((QuestionCard, QuestionCardIndex) => {
                  cy.log("QuestionCard", QuestionCard);
                  const positionOfCard = QuestionCardIndex + 1;

                  manageQuestionPage.elements
                    .getQuestionCardIndexQuestion(positionOfCard)
                    .invoke("text")
                    .then((questionText) => {
                      expect(questionText).not.equal(
                        UpdateQuestionData.question,
                      );
                    });
                });
            }
          });
      });
  });
});
