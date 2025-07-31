import loginPage from "../../../pages/loginPage";
import commonPage from "../../../pages/commonPage";
const apiBaseUrl: string = Cypress.env("API_BASE_URL");

describe("Test The Login Page", function () {
  beforeEach(function () {
    cy.fixture("loginData.json")
      .as("loginData")
      .then((loginData) => {
        commonPage.openPageUrl(loginData.landing_page_url);
        commonPage.verifyPageUrl(loginData.landing_page_url);
      });

    loginPage.clickOnGetStartButton();
  });

  /**
   * TEST: Test the login page UI
   * TEST STEP: Visit to the website using the landing page URL
   * EXPECTED RESULT: login page ui elements and text should be correct
   */
  it("Login page ui elements and text should be correct", function () {
    commonPage.verifyPageUrl(this.loginData.auth_url);
    commonPage.verifyPageTitle(this.loginData.page_title);

    //verify heading
    commonPage.verifyElementText(
      loginPage.elements.getFormHeading1(),
      this.loginData.form_heading1,
    );
    commonPage.verifyElementText(
      loginPage.elements.getFormHeading2(),
      this.loginData.form_heading2,
    );

    //verify form ui
    //email
    commonPage.verifyIfElementVisible(loginPage.elements.getEmailLabel());
    commonPage.verifyElementText(
      loginPage.elements.getEmailLabel(),
      this.loginData.email_label,
    );
    commonPage.verifyIfElementVisible(loginPage.elements.getEmailField());
    commonPage.verifyIfElementEnabled(loginPage.elements.getEmailField());

    //password
    commonPage.verifyIfElementVisible(loginPage.elements.getPasswordLabel());
    commonPage.verifyElementText(
      loginPage.elements.getPasswordLabel(),
      this.loginData.password_label,
    );
    commonPage.verifyIfElementVisible(loginPage.elements.getPasswordField());
    commonPage.verifyIfElementEnabled(loginPage.elements.getPasswordField());

    //eye icon
    commonPage.verifyIfElementVisible(loginPage.elements.getEyeIcon());
    loginPage.clickOnEyeIcon();
    commonPage.verifyElementAttributeValue(
      loginPage.elements.getPasswordField(),
      "type",
      "text",
    );

    //submit button
    commonPage.verifyIfElementEnabled(loginPage.elements.getLoginButton());
    commonPage.verifyElementText(
      loginPage.elements.getLoginButton(),
      this.loginData.button_text,
    );
  });

  /**
   * TEST: Testing the forgot password link is visible and enabled
   * TEST STEP: Visit the website
   * EXPECTED RESULT: The forgot password link should be visible and working
   */
  it("The forgot password link should be visible and working", function () {
    const forgotPasswordUrl = apiBaseUrl + this.loginData.forgot_password_url;
    commonPage.verifyIfElementVisible(
      loginPage.elements.getForgotPasswordLink(),
    );

    commonPage.verifyElementText(
      loginPage.elements.getForgotPasswordLink(),
      this.loginData.forgot_password_text,
    );

    commonPage.verifyElementAttributeValue(
      loginPage.elements.getForgotPasswordLink(),
      "href",
      forgotPasswordUrl,
    );
  });

  /**
   * TEST: Testing the privacy and terms
   * TEST STEP: Visit the website
   * EXPECTED RESULT: The terms and privacy button must be visible and enabled
   */
  it("The terms and privacy button must be visible and enabled", function () {
    // privacy
    commonPage.verifyIfElementVisible(loginPage.elements.getPrivacyLink());
    commonPage.verifyElementText(
      loginPage.elements.getPrivacyLink(),
      this.loginData.privacy_text,
    );

    loginPage.clickOnPrivacyButton();
    commonPage.verifyIfElementVisible(
      loginPage.elements.getPrivacyPolicyModal(),
    );
    commonPage.verifyElementAttributeValue(
      loginPage.elements.getPrivacyPolicyModal(),
      "src",
      this.loginData.privacy_link,
    );
    //close modal
    loginPage.clickOnPrivacyModalCloseButton();
    loginPage.elements.getPrivacyPolicyModal().should("not.have.class", "show");

    // terms
    commonPage.verifyIfElementVisible(loginPage.elements.getTermsLink());
    commonPage.verifyElementText(
      loginPage.elements.getTermsLink(),
      this.loginData.terms_text,
    );
    //@test-todo: skipped for now
    // loginPage.clickOnTermsButton();
    // commonPage.verifyIfElementVisible(
    //   loginPage.elements.getTermsConditionsModal(),
    // );
    commonPage.verifyElementAttributeValue(
      loginPage.elements.getTermsConditionsModal(),
      "src",
      this.loginData.terms_link,
    );
  });
});
