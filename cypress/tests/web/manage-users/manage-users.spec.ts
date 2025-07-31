import commonPage from "../../../pages/commonPage";
import manageUsersPage from "../../../pages/manageUsersPage";
import common from "../../../helpers/common";
import { UserTabsInfo } from "../../../interfaces/form-field";

let isQuestionsFreezed: boolean;
describe("Test The Manage Users Page", function () {
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
      isQuestionsFreezed = isFreezed ? true : false;
    });
  });

  /**
   * TEST: Manage Users page URL and the page ui should be correct
   * TEST STEP: click on the Left menu manage Users
   * EXPECTED RESULT: manage Users page URL and the page ui should be correct
   */
  it("Manage Users page URL and the page ui should be correct", function () {
    commonPage.verifyIfLeftMenuLogoIsVisible();
    //logo
    commonPage.verifyIfLeftMenuLogoIsVisible();

    //profile name
    commonPage.verifyIfElementVisible(commonPage.elements.getProfileNameLink());

    if (isQuestionsFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      //left menu
      commonPage.verifyIfElementVisible(
        commonPage.elements.getSelectedLeftMenu(),
      );

      commonPage.verifyIfElementVisible(
        manageUsersPage.elements.getLeftMenuIcon(),
      );

      commonPage.verifyElementText(
        commonPage.elements.getSelectedLeftMenu(),
        this.manageUsersData.menu_name,
      );
      //page Heading
      commonPage.verifyElementText(
        commonPage.elements.getPageHeading(),
        this.manageUsersData.page_heading,
      );

      //page top button
      commonPage.verifyIfElementVisible(
        manageUsersPage.elements.getPageTopButton(),
      );

      commonPage.verifyElementText(
        manageUsersPage.elements.getPageTopButton(),
        this.manageUsersData.page_add_user_button.label,
      );
      //list size
      commonPage.verifyMaximumLength(
        manageUsersPage.elements.getUsersCards(),
        this.manageUsersData.max_users_on_page,
      );
      //search bar
      commonPage.verifyIfElementVisible(
        manageUsersPage.elements.getSearchBar(),
      );
      commonPage.verifyIfElementEnabled(
        manageUsersPage.elements.getSearchBar(),
      );
      commonPage.verifyPlaceholder(
        manageUsersPage.elements.getSearchBar(),
        this.manageUsersData.search_bar_placeholder,
      );
      //search button
      commonPage.verifyIfElementVisible(
        manageUsersPage.elements.getSearchBarButton(),
      );
      commonPage.verifyIfElementEnabled(
        manageUsersPage.elements.getSearchBarButton(),
      );
      commonPage.verifyElementText(
        manageUsersPage.elements.getSearchBarButton(),
        this.manageUsersData.search_bar_button_text,
      );
    } else {
      //verify the left menu is not accessible
      commonPage.clickOnLeftMenuWithText(
        this.commonData.manage_companies_left_menu,
      );
      commonPage.verifyErrorToastMessage(
        this.commonData.left_menu_disabled_message,
      );
    }
  });
  /**
   * TEST: Manage Users user tabs(All, Admin, participant, rater), should be visible and working properly
   * TEST STEP: click on the Left menu manage Users
   * EXPECTED RESULT: Users tabs(All, Admin, participant, rater), should be visible and working properly
   */
  it("Users tabs(All, Admin, participant, rater), should be visible and working properly", function () {
    if (isQuestionsFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      //selected tab
      commonPage.verifyIfElementVisible(
        manageUsersPage.elements.getSelectedUserTab(),
      );
      //tabs
      this.manageUsersData.user_tabs.forEach(
        (tab: UserTabsInfo, index: number) => {
          const fieldIndex = index + 1;
          //labels
          commonPage.verifyIfElementVisible(
            manageUsersPage.elements.getUserTablabel(fieldIndex),
          );

          commonPage.verifyElementText(
            manageUsersPage.elements.getUserTablabel(fieldIndex),
            tab.label,
          );
          //icon
          commonPage.verifyIfElementVisible(
            manageUsersPage.elements.getUserTabIcon(fieldIndex),
          );

          commonPage.verifyIfElementHaveClass(
            manageUsersPage.elements.getUserTabIcon(fieldIndex),
            tab.icon_class,
          );
          //selecting and verifying tabs
          commonPage.clickOnElementWithText(
            manageUsersPage.elements.getUserTabs(),
            tab.label,
          );
          commonPage.verifyIfElementHaveClass(
            manageUsersPage.elements.getSelectedUserTab(),
            this.manageUsersData.active_tab_class,
          );

          commonPage.loaderNotVisible();
          if (tab.label === " All ") {
            manageUsersPage.elements
              .getUsersCards()
              .each((UserCard, CardIndex) => {
                cy.log("Company Card: ", UserCard);
                const positionOfCard = CardIndex + 1;
                manageUsersPage.elements
                  .getUserCardIcon(positionOfCard)
                  .invoke("attr", "class")
                  .then((IconClass) => {
                    expect(IconClass).to.be.oneOf(
                      this.manageUsersData.user_icon_classes,
                    );
                  });
              });
          } else {
            manageUsersPage.elements
              .getUsersCards()
              .each((UserCard, CardIndex) => {
                cy.log("Company Card: ", UserCard);
                const positionOfCard = CardIndex + 1;
                manageUsersPage.elements
                  .getUserCardIcon(positionOfCard)
                  .invoke("attr", "class")
                  .then((IconClass) => {
                    expect(IconClass).to.include(tab.icon_class);
                  });
              });
          }
        },
      );
    } else {
      //verify the left menu is not accessible
      commonPage.clickOnLeftMenuWithText(
        this.commonData.manage_companies_left_menu,
      );
      commonPage.verifyErrorToastMessage(
        this.commonData.left_menu_disabled_message,
      );
    }
  });

  /**
   * TEST: Testing the manage users page
   * TEST STEP: click on the Left menu manage users
   * EXPECTED RESULT: Manage users card elements and pagination should be correct
   */
  it("Manage users card elements and pagination should be correct", function () {
    if (isQuestionsFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      const checkUserElements = () => {
        //users in page
        manageUsersPage.elements
          .getUsersCards()
          .its("length")
          .then((n) => {
            expect(n).to.lte(this.manageUsersData.max_users_on_page);
          });

        //user
        manageUsersPage.elements
          .getUsersCards()
          .each((UserCard, UserCardIndex) => {
            cy.log("UserCard: ", UserCard);
            const positionOfCard = UserCardIndex + 1;
            //username
            commonPage.verifyIfElementVisible(
              manageUsersPage.elements.getUserCardName(positionOfCard),
            );
            //user email
            commonPage.verifyIfElementVisible(
              manageUsersPage.elements.getUserCardEmail(positionOfCard),
            );

            //user role
            manageUsersPage.elements
              .getUserCardRole(positionOfCard)
              .scrollIntoView()
              .invoke("text")
              .then((UserRole) => {
                expect(UserRole).to.be.oneOf(this.commonData.user_types);
              });
          });
      };
      //pagination
      commonPage.verifyPagination();
      //get the index of last page to iterate all the pages for verifying the content
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
              //listing item of last page with iteration no
              checkUserElements();

              const randomNumberClick = common.getRandomNumberInBetween(
                this.commonData.pagination_default_selected_page,
                lastPageNumber,
              );

              //randomly click on any page
              for (let n = 1; n <= randomNumberClick; n++) {
                commonPage.loaderNotVisible();
                commonPage.elements
                  .getPaginationIndex(
                    this.commonData.pagination_previous_arrow_position,
                  )
                  .click();
              }

              //check users of current active page after random click
              commonPage.loaderNotVisible();
              checkUserElements();
            });
        });
    } else {
      //verify the left menu is not accessible
      commonPage.clickOnLeftMenuWithText(
        this.commonData.manage_companies_left_menu,
      );
      commonPage.verifyErrorToastMessage(
        this.commonData.left_menu_disabled_message,
      );
    }
  });

  /**
   * TEST: Testing the manage users page
   * TEST STEP: click on the Left menu manage users
   * EXPECTED RESULT: Manage Admin card elements
   */
  it("Manage Admin card elements", function () {
    if (isQuestionsFreezed) {
      commonPage.openPageUrl(this.manageUsersData.page_url);
      commonPage.verifyPageUrl(this.manageUsersData.page_url);
      //admin
      this.manageUsersData.user_tabs.forEach((tab: UserTabsInfo) => {
        if (tab.label === " Admins ") {
          commonPage.clickOnElementWithText(
            manageUsersPage.elements.getUserTabs(),
            tab.label,
          );
          commonPage.loaderNotVisible();
          //total users in page
          manageUsersPage.elements
            .getUsersCards()
            .its("length")
            .then((n) => {
              expect(n).to.lte(this.manageUsersData.max_users_on_page);
            });

          //user
          manageUsersPage.elements
            .getUsersCards()
            .each((UserCard, UserCardIndex) => {
              cy.log("UserCard: ", UserCard);
              const positionOfCard = UserCardIndex + 1;
              //username
              commonPage.verifyIfElementVisible(
                manageUsersPage.elements.getUserCardName(positionOfCard),
              );
              //user email
              commonPage.verifyIfElementVisible(
                manageUsersPage.elements.getUserCardEmail(positionOfCard),
              );

              // //user role
              manageUsersPage.elements
                .getUserCardRole(positionOfCard)
                .scrollIntoView()
                .invoke("text")
                .then((UserRole) => {
                  expect(UserRole).to.equal(tab.name);
                });
              //admin tags
              commonPage.verifyElementContainsText(
                manageUsersPage.elements
                  .getUserCardTag1(positionOfCard)
                  .next()
                  .next(),
                this.manageUsersData.admin_card_tag,
              );
            });
          //pagination
          commonPage.verifyPagination();
        }
      });
    } else {
      //verify the left menu is not accessible
      commonPage.clickOnLeftMenuWithText(
        this.commonData.manage_companies_left_menu,
      );
      commonPage.verifyErrorToastMessage(
        this.commonData.left_menu_disabled_message,
      );
    }
  });

  /**
   * TEST: Testing the manage users page
   * TEST STEP: click on the Left menu manage users
   * EXPECTED RESULT: The search bar should work properly
   */
});
//to add code for the search tab
//to verify that the data visible on searching something should be related to the search data only
