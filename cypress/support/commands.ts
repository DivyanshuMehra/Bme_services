// @ts-check
///<reference types="../global.d.ts" />
import "./index";
import generateAuthToken from "../helpers/api/generateToken";
import commonPage from "../pages/commonPage";

//Custom login command
Cypress.Commands.add("login", function (username, password) {
  cy.visit("/");
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.get("div>a.btn-primary").click();
  cy.url().should("contain", "authorization");
  cy.get("#email").type(username);
  cy.get("#password").type(password, { log: false });
  cy.get("button[type='submit']").click();
});

//login with session command
Cypress.Commands.add("loginWithSession", function (userRole: string) {
  cy.visit("/");
  cy.clearLocalStorage();
  cy.clearCookies();
  let username: string;
  const password = Cypress.env("PASSWORD");
  cy.session(password, () => {
    cy.visit("/");
    cy.get(".btn-primary").contains("Let's Get Started").click();
    cy.url().should("contain", "authorization");
    switch (userRole) {
      case "super_admin":
        username = Cypress.env("EMAIL");
        break;
      case "admin":
        username = Cypress.env("ADMIN_EMAIL");
        break;
      case "participant":
        username = Cypress.env("PARTICIPANT_EMAIL");
        break;
      case "rater":
        username = Cypress.env("RATER_EMAIL");
        break;
    }
    cy.get("#email").type(username);
    cy.get("#password").type(password);
    cy.get("button[type='submit']").click();
    if (userRole !== "participant") {
      cy.url().should("contain", "dashboard");
    } else {
      cy.url().should(
        "satisfy",
        (url) => url.includes("dashboard") || url.includes("choose-account"),
      );
    }
    commonPage.loaderNotVisible();
    cy.window()
      .its("localStorage")
      .invoke("getItem", "token")
      .then((token) => {
        const tokenData = JSON.parse(token || "{}");
        cy.setCookie("authTokenVal", tokenData.access_token);
      });
  });
});

//get auth Token to verify API
Cypress.Commands.add("generateToken", function () {
  generateAuthToken.getAuthToken();
});

//command to create a company
Cypress.Commands.add(
  "createNewCompany",
  function (name, email, description, logo_path) {
    cy.get(".wrap-company-view>div>button.btn-primary").click();
    cy.get("input[type='text']").type(name);
    cy.get("input[placeholder='Email']").type(email);
    cy.get("textarea.form-control").type(description);
    cy.get("input[type='file']").selectFile(logo_path);
    cy.contains("Submit").click();
    cy.url().should("include", "/manage-companies");
  },
);

//command to delete a company
Cypress.Commands.add("deleteCompany", function (index) {
  cy.get(
    `.wrap-company-view>:nth-child(${index})>.group-btns>button>.bi-trash3`,
  ).click();
  cy.get(".btn-danger").click();
  commonPage.loaderNotVisible();
});

//command to verify the Question data
Cypress.Commands.add(
  "verifyQuestionCardData",
  function (index, question_text, type, category, sub_category) {
    const verifyIfVisible = function (text: string) {
      cy.get(`.all-question>:nth-child(${index})>.question-wrapper>.tags>span`)
        .contains(text)
        .should("be.visible");
    };
    cy.get(`.all-question>:nth-child(${index})>.question-wrapper>.question`)
      .invoke("text")
      .then((Question) => {
        expect(Question).to.equal(question_text);
      });
    if (type) {
      verifyIfVisible(type);
    }
    if (category) {
      verifyIfVisible(category);
    }
    if (sub_category) {
      verifyIfVisible(sub_category);
    }
  },
);
//command to verify the company data
Cypress.Commands.add(
  "verifyCompanyCardData",
  function (index, name, email, date) {
    cy.get(`.wrap-company-view>:nth-child(${index})>.company-info>h6`)
      .invoke("text")
      .then((CompanyName) => {
        expect(CompanyName).to.equal(name);
      });
    cy.get(`.wrap-company-view>:nth-child(${index})>.company-info>div>.email`)
      .invoke("text")
      .then((CompanyEmail) => {
        expect(CompanyEmail).to.equal(email);
      });
    cy.get(`.wrap-company-view>:nth-child(${index})>.company-info>div>p>strong`)
      .invoke("text")
      .then((CompanyCreationDate) => {
        expect(CompanyCreationDate).to.equal(date);
      });
  },
);

//command to add user details in modal
Cypress.Commands.add("addAdmin", function (email, first_name, last_name) {
  cy.get(".btn-wrapper>.btn-primary").click();
  cy.get("input[type='email']").type(email);
  cy.get("input[placeholder='First Name']").type(first_name);
  cy.get("input[placeholder='Last Name']").type(last_name);
  cy.get("div.mb-3>label")
    .contains("User Type")
    .parent()
    .find("select")
    .select("admin");
  cy.get(".modal-footer>button").click();
  commonPage.loaderNotVisible();
});

//command to add user details in modal
Cypress.Commands.add(
  "addParticipant",
  function (email, first_name, last_name, feedback_duration, select_admin) {
    cy.get(".btn-wrapper>.btn-primary").click();
    cy.get("input[type='email']").type(email);
    cy.get("input[placeholder='First Name']").type(first_name);
    cy.get("input[placeholder='Last Name']").type(last_name);
    if (select_admin) {
      cy.get(".mb-3>label.form-label")
        .contains("User Type")
        .parent()
        .find("select")
        .select("participant");
      cy.get(".mb-3>label")
        .contains("Select Admin")
        .parent()
        .find("select")
        .select(select_admin);
    }
    cy.get(".mb-3>label")
      .contains("Assessment Duration Days")
      .parent()
      .find("select")
      .select(feedback_duration);
    cy.get(".modal-footer>button").click();
    commonPage.loaderNotVisible();
  },
);

//command to send invitation to the user
Cypress.Commands.add("sendInvitation", function (index) {
  cy.get(
    `:nth-child(${index})>.action-items>button[title='Send Invitation Email']`,
  ).click();
  cy.get(".modal-body>div>button").contains(" Send Invitation ").click();
  commonPage.loaderNotVisible();
});

//command to verify the users data
Cypress.Commands.add(
  "verifyUserCardData",
  function (index, name, email, icon_class, role) {
    cy.get(`:nth-child(${index})>div>.name`)
      .invoke("text")
      .then((UserName) => {
        expect(UserName).to.equal(name);
      });
    cy.get(`:nth-child(${index})>div>.email`)
      .invoke("text")
      .then((UserEmail) => {
        expect(UserEmail).to.equal(email);
      });
    cy.get(`:nth-child(${index})>div>i`).should("have.class", icon_class);
    if (role) {
      cy.get(`:nth-child(${index})>div>.role-wrapper>span`)
        .contains(role)
        .should("be.visible");
    }
  },
);
//command to delete a user
Cypress.Commands.add("deleteUser", function (index) {
  cy.get(`:nth-child(${index})>.action-items>button>.bi-trash3`).click();
  cy.get(".btn-danger").click();
  commonPage.loaderNotVisible();
});

//command to verify the users data
Cypress.Commands.add(
  "verifyParticipantCardData",
  function (index, email, name) {
    cy.get(`.all-participant>:nth-child(${index})>div>.name`)
      .invoke("text")
      .then((ParticipantName) => {
        expect(ParticipantName).to.equal(name);
      });
    cy.get(`.all-participant>:nth-child(${index})>div>.email`)
      .invoke("text")
      .then((ParticipantEmail) => {
        expect(ParticipantEmail).to.equal(email);
      });
    cy.get(`.all-participant>:nth-child(${index})>div>i`).should(
      "have.class",
      "bi-person-fill",
    );
  },
);

//command to verify the delete user modal confirmation message
Cypress.Commands.add(
  "verifyDeleteModalMessage",
  function (invited_user, invited_for, user_type) {
    const message: string = ` Are you sure you want to remove ${invited_user} as ${user_type} for ${invited_for}? `;

    commonPage.elements
      .getDeleteUserModalMessage()
      .invoke("text")
      .then((text) => {
        expect(text).to.equal(message);
      });
  },
);
