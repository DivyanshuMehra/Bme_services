import getPkce from "oauth-pkce";

//Start: Generate verifier & challenge
async function initializePkce() {
  return new Promise<{ verifier: string; challenge: string }>(
    (resolve, reject) => {
      getPkce(128, (error, { verifier, challenge }) => {
        if (error) {
          reject(error);
        } else {
          resolve({ verifier, challenge });
        }
      });
    },
  );
}

let authVerifier: string;
let authChallenge: string;
let authCode: string;
// let authType: string;
let authToken: string;
const apiBaseURL: string = Cypress.env("API_BASE_URL");
const username: string = Cypress.env("EMAIL");
const password: string = Cypress.env("PASSWORD");

initializePkce().then(({ challenge, verifier }) => {
  authVerifier = verifier;
  authChallenge = challenge;
});
//End:  Generate verifier & challenge

class generateAuthToken {
  getAuthToken() {
    cy.visit("/");
    cy.url().should("contain", "login");

    const authUrl = `${apiBaseURL}/oauth/authorization?grant_type=pkce&client_id=ce320bbe-4576-4cf9-aaa2-2083ed7143aa&code_challenge=${authChallenge}&algorithm=sha256&redirect_url=${apiBaseURL}`;

    cy.visit(authUrl);
    cy.url().should("contain", "authorization");
    cy.get("#email").type(username);
    cy.get("#password").type(password);
    cy.get("button[type='submit']").click();

    cy.url()
      .should("contain", "code")
      .then((url) => {
        const parsedParam = new URL(url);
        const searchParams = Object.fromEntries(parsedParam.searchParams);
        authCode = searchParams.code;

        cy.request({
          method: "POST",
          url: `${apiBaseURL}/oauth/token`,
          headers: {
            Accept: "application/json",
          },
          body: {
            code_verifier: authVerifier,
            code: authCode,
            grant_type: "pkce",
          },
        }).then((response) => {
          expect(response.status).to.eq(201);

          const responseData = response.body;
          // authType = responseData.type;
          authToken = responseData.access_token;
          cy.setCookie("authToken", authToken);
        });
      });
  }
}
export default new generateAuthToken();
