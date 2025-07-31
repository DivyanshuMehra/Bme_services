import commonPage from "../../../pages/commonPage";
import manageQuestionPage from "../../../pages/manageQuestionPage";
import { ButtonInfo } from "../../../interfaces/form-field";
import { ButtonMessageInfo } from "../../../interfaces/form-field";
import common from "../../../helpers/common";

let isQuestionFreezed: boolean;
describe("Test The Manage Questions Page", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_super_admin);
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
   * TEST STEP: click on the Left menu manage questions
   * EXPECTED RESULT: manage questions page URL and the page ui should be correct
   */
  it("Manage questions page URL and the page ui should be correct", function () {
    //logo
    commonPage.verifyIfLeftMenuLogoIsVisible();

    //profile name
    commonPage.verifyIfElementVisible(commonPage.elements.getProfileNameLink());

    //left menu
    commonPage.verifyIfElementVisible(
      commonPage.elements.getSelectedLeftMenu(),
    );

    commonPage.verifyIfElementVisible(
      manageQuestionPage.elements.getLeftMenuIcon(),
    );

    commonPage.verifyElementText(
      commonPage.elements.getSelectedLeftMenu(),
      this.manageQuestionData.menu_name,
    );

    //page Heading
    commonPage.verifyElementText(
      commonPage.elements.getPageHeading(),
      this.manageQuestionData.page_heading,
    );

    //page top freeze or Unfreeze button
    commonPage.verifyIfElementVisible(
      commonPage.elements.getPageTopButtons(
        this.manageQuestionData.page_top_freeze_or_unfreeze_button_position,
      ),
    );

    commonPage.verifyIfElementHaveClass(
      commonPage.elements.getPageTopButtons(
        this.manageQuestionData.page_top_freeze_or_unfreeze_button_position,
      ),
      this.manageQuestionData.page_top_freeze_button.class,
    );

    if (isQuestionFreezed) {
      //there should be unfreeze button
      commonPage.verifyElementText(
        commonPage.elements.getPageTopButtons(
          this.manageQuestionData.page_top_freeze_or_unfreeze_button_position,
        ),
        this.manageQuestionData.page_top_unfreeze_button.label,
      );
    } else {
      //there should be freeze button
      commonPage.verifyElementText(
        commonPage.elements.getPageTopButtons(
          this.manageQuestionData.page_top_freeze_or_unfreeze_button_position,
        ),
        this.manageQuestionData.page_top_freeze_button.label,
      );
    }

    //page top buttons
    this.manageQuestionData.page_top_buttons.forEach(
      (buttonInfo: ButtonInfo, index: number) => {
        const positionOfButton = index + 1;
        commonPage.verifyIfElementVisible(
          commonPage.elements.getPageTopButtons(positionOfButton),
        );

        commonPage.verifyIfElementHaveClass(
          commonPage.elements.getPageTopButtons(positionOfButton),
          buttonInfo.class,
        );

        commonPage.verifyElementText(
          commonPage.elements.getPageTopButtons(positionOfButton),
          buttonInfo.label,
        );
        commonPage.verifyIfElementEnabled(
          commonPage.elements.getPageTopButtons(positionOfButton),
        );
      },
    );

    //button should give toast message on clicking if questions are freezed
    if (isQuestionFreezed) {
      this.manageQuestionData.messages_on_button_click_when_question_freezed.forEach(
        (buttonInfo: ButtonMessageInfo, index: number) => {
          const positionOfButton = index + 1;
          //click on the button
          commonPage.clickOnElementWithText(
            commonPage.elements.getPageTopButtons(positionOfButton),
            buttonInfo.button_label,
          );

          commonPage.verifyErrorToastMessage(buttonInfo.message);
        },
      );
    } else {
      //the preview button will give message if no questions added
      commonPage.clickOnPaginationFirstIndex();
      manageQuestionPage.elements
        .getQuestionCards()
        .its("length")
        .then((totalQuestions) => {
          if (totalQuestions === 0) {
            commonPage.clickOnPageTopButtonWithText(
              this.manageQuestionData.preview_feedback_label,
            );
            commonPage.verifyErrorToastMessage(
              this.manageQuestionData
                .no_questions_added_message_on_preview_assessment,
            );
          } else {
            commonPage.clickOnPageTopButtonWithText(
              this.manageQuestionData.preview_feedback_label,
            );
            commonPage.verifyPageUrl(
              this.manageQuestionData.preview_feedback_page_url,
            );
          }
        });
    }

    //list size
    commonPage.verifyMaximumLength(
      manageQuestionPage.elements.getQuestionCards(),
      this.manageQuestionData.max_question_on_page,
    );
  });

  /**
   * TEST: Testing the manage questions page
   * TEST STEP: click on the Left menu manage questions
   * EXPECTED RESULT: Manage questions card elements should be correct
   */
  it("Manage questions card elements should be correct", function () {
    const checkQuestionElements = (forPageNumber: number) => {
      //question card
      manageQuestionPage.elements
        .getQuestionCards()
        .its("length")
        .then((n) => {
          expect(n).to.lte(this.manageQuestionData.max_question_on_page);
        });

      manageQuestionPage.elements
        .getQuestionCards()
        .each((QuestionCard, QuestionCardIndex) => {
          cy.log("QuestionCard: ", QuestionCard);
          const positionOfCard = QuestionCardIndex + 1;
          //scroll to the element
          manageQuestionPage.elements
            .getQuestionCardIndexNumber(positionOfCard)
            .scrollIntoView();

          //question
          commonPage.verifyIfElementContainText(
            manageQuestionPage.elements.getQuestionCardIndexNumber(
              positionOfCard,
            ),
            positionOfCard +
              (forPageNumber - 1) *
                this.manageQuestionData.max_question_on_page,
          );

          commonPage.verifyIfElementVisible(
            manageQuestionPage.elements.getQuestionCardIndexQuestion(
              positionOfCard,
            ),
          );
        });
    };

    //tags should be one of the available data
    const checkQuestionsTags = () => {
      // let cardIndex = 0;
      manageQuestionPage.elements
        .getQuestionCards()
        .each((QuestionCard, QuestionCardIndex) => {
          cy.log("QuestionCard: ", QuestionCard);
          const cardNumber = QuestionCardIndex + 1;

          //scroll to the element
          manageQuestionPage.elements
            .getQuestionCardIndexTag(
              cardNumber,
              this.commonData.default_question_tag,
            )
            .scrollIntoView();

          manageQuestionPage.elements
            .getQuestionCardIndexTag(
              cardNumber,
              this.commonData.default_question_tag,
            )
            .invoke("text")
            .then((default_tag_value) => {
              if (
                default_tag_value === this.commonData.st_question_type_paragraph
              ) {
                //question type paragraph
                //question type
                commonPage.verifyIfElementVisible(
                  manageQuestionPage.elements.getQuestionCardIndexTag(
                    cardNumber,
                    this.commonData.default_question_tag,
                  ),
                );
                expect(default_tag_value).to.be.oneOf(
                  this.commonData.st_question_type,
                );
              } else {
                //question type rating
                //category
                commonPage.verifyIfElementVisible(
                  manageQuestionPage.elements.getQuestionCardIndexTag(
                    cardNumber,
                    this.commonData.questions_category_tag,
                  ),
                );

                manageQuestionPage.elements
                  .getQuestionCardIndexTag(
                    cardNumber,
                    this.commonData.questions_category_tag,
                  )
                  .invoke("text")
                  .then((category) => {
                    expect(category).to.be.oneOf(
                      this.commonData.st_question_category,
                    );
                  });

                //sub category
                commonPage.verifyIfElementVisible(
                  manageQuestionPage.elements.getQuestionCardIndexTag(
                    cardNumber,
                    this.commonData.questions_subcategory_tag,
                  ),
                );

                manageQuestionPage.elements
                  .getQuestionCardIndexTag(
                    cardNumber,
                    this.commonData.questions_subcategory_tag,
                  )
                  .invoke("text")
                  .then((subcategory) => {
                    expect(subcategory).to.be.oneOf(
                      this.commonData.st_question_subcategory,
                    );
                  });

                //question type
                commonPage.verifyIfElementVisible(
                  manageQuestionPage.elements.getQuestionCardIndexTag(
                    cardNumber,
                    this.commonData.questions_type_tag,
                  ),
                );

                manageQuestionPage.elements
                  .getQuestionCardIndexTag(
                    cardNumber,
                    this.commonData.questions_type_tag,
                  )
                  .invoke("text")
                  .then((questions_type) => {
                    expect(questions_type).to.be.oneOf(
                      this.commonData.st_question_type,
                    );
                  });
              }
            });
        });
    };

    checkQuestionElements(this.commonData.pagination_default_selected_page);
    checkQuestionsTags();

    //pagination
    commonPage.verifyPagination();

    //get last page number and check questions elements accordingly
    commonPage.elements
      .getPaginationLastIndex(
        this.commonData.pagination_last_arrow_position_from_last,
      )
      .click()
      .then(() => {
        commonPage.elements
          .getPaginationActiveIndex()
          .invoke("text")
          .then((lastPage) => {
            const lastPageNumber = parseInt(lastPage);
            //listing item of last page with itration no
            checkQuestionElements(lastPageNumber);
            checkQuestionsTags();

            const randomNumberClick = common.getRandomNumberInBetween(
              this.commonData.pagination_default_selected_page,
              lastPageNumber,
            );

            //randomly click on any page
            for (let n = 1; n <= randomNumberClick; n++) {
              commonPage.elements
                .getPaginationIndex(
                  this.commonData.pagination_previous_arrow_position,
                )
                .click();
            }

            //check questions of current active page after random click
            commonPage.elements
              .getPaginationActiveIndex()
              .invoke("text")
              .then((page) => {
                const pageNumber = parseInt(page);
                checkQuestionElements(pageNumber);
                checkQuestionsTags();
              });
          });
      });
  });
});
