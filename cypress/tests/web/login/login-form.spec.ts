import loginPage from "../../../pages/loginPage";
import commonPage from "../../../pages/commonPage";
import { LoginInfo } from "../../../interfaces/user-info";
import { faker } from "@faker-js/faker";
import { defaultFakeEmailOptions } from "../../../interfaces/fake-info";

const loginDetail: LoginInfo = {
  email: Cypress.env("EMAIL"),
  password: Cypress.env("PASSWORD"),
};

const UserData: LoginInfo = {
  email: faker.internet.email({
    firstName: defaultFakeEmailOptions.firstname,
    provider: defaultFakeEmailOptions.provider,
  }),
  password: faker.internet.password({
    prefix: defaultFakeEmailOptions.lastname,
    memorable: true,
  }),
};

describe("Functional testing of login page", function () {
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
   * TEST: Verify Login Functionality with invalid credentials
   * TEST STEP: Visit to the website and hit login with empty fields
   * EXPECTED RESULT: Validation messages container should show if form submit with invalid credentials
   */
  it("Validation messages container should show if form submit with invalid credentials", function () {
    commonPage.verifyPageUrl(this.loginData.auth_url);

    //empty fields
    commonPage.verifyElementValue(loginPage.elements.getEmailField(), "");
    commonPage.verifyElementValue(loginPage.elements.getPasswordField(), "");
    loginPage.clickOnLoginButton();

    //validation container & messages
    commonPage.verfiyValidationErrorContainer();
    commonPage.elements.getValidationErrorLists().should(($lis) => {
      expect($lis).to.have.length(3);
      expect($lis.eq(0)).to.contain(this.loginData.validation_errors_txt[0]);
      expect($lis.eq(1)).to.contain(this.loginData.validation_errors_txt[1]);
      expect($lis.eq(2)).to.contain(this.loginData.validation_errors_txt[2]);
    });

    //wrong Email and correct Password
    commonPage.typeValueInField(
      loginPage.elements.getEmailField(),
      UserData.email,
    );
    commonPage.typeValueInField(
      loginPage.elements.getPasswordField(),
      loginDetail.password,
    );
    loginPage.clickOnLoginButton();
    commonPage.verfiyValidationErrorContainer();
    commonPage.elements.getValidationErrorLists().should(($lis) => {
      expect($lis).to.have.length(1);
      expect($lis.eq(0)).to.contain(this.loginData.validation_errors_txt[3]);
    });

    //correct Email and wrong Password
    commonPage.typeValueInField(
      loginPage.elements.getEmailField(),
      loginDetail.email,
    );
    commonPage.typeValueInField(
      loginPage.elements.getPasswordField(),
      UserData.password,
    );
    loginPage.clickOnLoginButton();
    commonPage.verfiyValidationErrorContainer();
    commonPage.elements.getValidationErrorLists().should(($lis) => {
      expect($lis).to.have.length(1);
      expect($lis.eq(0)).to.contain(this.loginData.validation_errors_txt[3]);
    });

    //wrong Email and wrong Password
    commonPage.typeValueInField(
      loginPage.elements.getEmailField(),
      UserData.email,
    );
    commonPage.typeValueInField(
      loginPage.elements.getPasswordField(),
      UserData.password,
    );
    loginPage.clickOnLoginButton();
    commonPage.verfiyValidationErrorContainer();
    commonPage.elements.getValidationErrorLists().should(($lis) => {
      expect($lis).to.have.length(1);
      expect($lis.eq(0)).to.contain(this.loginData.validation_errors_txt[3]);
    });
  });

  /**
   * TEST: Verify Login Functionality with correct Email and Password
   * TEST STEP: Enter the correct email and password and hit login
   * EXPECTED RESULT: The user should be able to login and redirect to the dashboard page
   */
  it("The user should be able to login and redirect to the dashboard page", function () {
    //space at end of email
    commonPage.typeValueInField(
      loginPage.elements.getEmailField(),
      loginDetail.email,
    );
    commonPage.typeValueInField(
      loginPage.elements.getPasswordField(),
      loginDetail.password,
    );
    loginPage.clickOnLoginButton();
    commonPage.loaderVisible();
    commonPage.loaderNotVisible();
    commonPage.verifyPageUrl(this.loginData.dashboard_url);
  });
});
