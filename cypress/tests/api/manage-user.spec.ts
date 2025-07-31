import auth from "../../helpers/auth";
import getInvitationSchema from "../../fixtures/api-schema/user/getInvitation.json";
import Ajv from "ajv";
const ajv = new Ajv();

const validateGetInvitation = ajv.compile(getInvitationSchema);

const apiBaseURL: string = Cypress.env("API_BASE_URL");
const apiPrefixURL: string = Cypress.env("API_PREFIX_URL");
const authHeader = auth.getApiHeader();

const updatePassword = Cypress.env("PASSWORD");

//@todo-test - the test cases needs to be refactored
describe("question API", function () {
  before(function () {
    // cy.generateToken();
    // cy.getCookie("authToken").then((cookie) => {
    //   authHeader.Authorization = "Bearer " + cookie?.value;
    // });
  });

  /**
   * Invitation API should work correctly
   */
  it.skip("Invitation API should work correctly", function () {
    cy.request({
      method: "GET",
      url: `${apiBaseURL + apiPrefixURL}/users/invitations`,
      headers: authHeader,
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseData = response.body;
      const isValidResponse = validateGetInvitation(responseData);
      expect(isValidResponse).to.be.true;
    });
  });

  /**
   * Reset Profile Password API should work correctly
   */
  it.skip("Reset Profile Password API should work correctly", function () {
    cy.request({
      method: "PUT",
      url: `${apiBaseURL + apiPrefixURL}/users/password`,
      headers: authHeader,
      body: { old_password: updatePassword, password: updatePassword },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseData = response.body;

      cy.log(responseData);
    });
  });
});
