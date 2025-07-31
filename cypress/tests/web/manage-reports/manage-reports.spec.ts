import manageReportsPage from "../../../pages/manageReportsPage";
import commonPage from "../../../pages/commonPage";
import { defaultUserName } from "../../../interfaces/fake-info";

const admin_name = `${defaultUserName.first_name} mob admin`;
describe("Test The Manage Reports Page", function () {
  beforeEach(function () {
    cy.fixture("commonData.json")
      .as("commonData")
      .then((commonData) => {
        cy.loginWithSession(commonData.user_type_super_admin);
      });
    cy.fixture("manageReportsData.json")
      .as("manageReportsData")
      .then((manageCompanyData) => {
        commonPage.openPageUrl(manageCompanyData.page_url);
        commonPage.verifyPageUrl(manageCompanyData.page_url);
      });
  });
  /**
   * TEST: Manage Reports page URL and the page ui should be correct
   * TEST STEP: click on the Left menu Manage Reports
   * EXPECTED RESULT: manage Reports page URL and the page ui should be correct
   */
  it("Manage Reports page URL and the page ui should be correct", function () {
    commonPage.verifyIfLeftMenuLogoIsVisible();
    //logo
    commonPage.verifyIfLeftMenuLogoIsVisible();

    //profile name
    commonPage.verifyIfElementVisible(commonPage.elements.getProfileNameLink());

    //left menu
    commonPage.verifyIfElementVisible(
      commonPage.elements.getSelectedLeftMenu(),
    );
    commonPage.verifyIfElementVisible(
      manageReportsPage.elements.getLeftMenuIcon(),
    );
    commonPage.verifyElementText(
      commonPage.elements.getSelectedLeftMenu(),
      this.manageReportsData.menu_name,
    );

    //page Heading and sub heading
    commonPage.verifyElementText(
      manageReportsPage.elements.getPageHeading(),
      this.manageReportsData.page_heading,
    );
    commonPage.verifyElementText(
      manageReportsPage.elements.getPageSubHeading(),
      this.manageReportsData.page_sub_heading,
    );

    //list size
    commonPage.verifyMaximumLength(
      manageReportsPage.elements.getAdminCards(),
      this.manageReportsData.max_admins_on_page,
    );
  });

  /**
   * TEST: Reports should be generated when clicking on download icon
   * TEST STEP: click on the Left menu Manage Reports then select an admin
   * EXPECTED RESULT: Reports should be downloaded everytime we click on the download button
   */
  it("Reports should be downloaded everytime we click on the download button", function () {
    //pagination
    commonPage.verifyPagination();
    //last page of admins listing and select an admin
    // let AdminFound: boolean = false;

    manageReportsPage.elements
      .getAdminCards()
      .each((AdminCard, AdminCardNumber) => {
        cy.log("Admin Card: ", AdminCard);
        const positionOfCard = AdminCardNumber + 4;
        manageReportsPage.elements
          .getAdminCardName(positionOfCard)
          .invoke("text")
          .then((AdminName) => {
            if (AdminName === admin_name) {
              // AdminFound = true;
              commonPage.clickOnElementWithText(
                manageReportsPage.elements.getAdminCardName(positionOfCard),
                admin_name,
              );
              commonPage.loaderNotVisible();
              const reportDownloaded = false;
              manageReportsPage.elements
                .getParticipantCards()
                .each((ParticipantCard, CardNumber) => {
                  cy.log("Participant Card: ", ParticipantCard);
                  manageReportsPage.elements
                    .getParticipantCardDownloadOption(CardNumber)
                    .then(($option) => {
                      if ($option.is(":visible") && !reportDownloaded) {
                        manageReportsPage.clickOnDownloadBtn(CardNumber);
                      }
                    });
                });
            }
          });
      });
    //@todo: to be done
    // commonPage.elements
    //   .getPaginationLastButton()
    //   .click();
    //   commonPage.loaderNotVisible();
    // commonPage.elements
    //   .getPaginationLastButton()
    //   .click()
    //   .then(() => {
    //     commonPage.elements
    //       .getPaginationActiveIndex()
    //       .invoke("text")
    //       .then((lastPage) => {
    //         console.log(lastPage);
    //         const lastPageNumber = parseInt(lastPage);

    //         for (let pageNo = 1; pageNo < lastPageNumber; pageNo++) {
    //           if (!AdminFound) {
    //             commonPage.loaderNotVisible();
    //             checkAdminName();
    //             commonPage.elements
    //               .getPaginationIndex(
    //                 this.commonData.pagination_previous_arrow_position,
    //               )
    //               .click();
    //           }
    //         }
    //       });
    //   });

    manageReportsPage.elements
      .getAdminCards()
      .each((AdminCard, AdminCardNumber) => {
        cy.log("Admin Card: ", AdminCard);
        const positionOfCard = AdminCardNumber + 4;
        manageReportsPage.elements
          .getAdminCardName(positionOfCard)
          .invoke("text")
          .then((AdminName) => {
            if (AdminName === admin_name) {
              commonPage.clickOnElementWithText(
                manageReportsPage.elements.getAdminCardName(positionOfCard),
                admin_name,
              );
              cy.get("i.bi-download")
                .parent()
                .invoke("removeAttr", "target")
                .click();
              commonPage.verifyPageUrl("/report/pdf");
            }
          });
      });
  });
});
