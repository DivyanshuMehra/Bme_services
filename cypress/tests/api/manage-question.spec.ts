import { faker } from "@faker-js/faker";
import { QuestionInfo } from "../../interfaces/api/question-info";
import auth from "../../helpers/auth";
import getQuestionSchema from "../../fixtures/api-schema/question/getQuestion.json";
import postQuestionSchema from "../../fixtures/api-schema/question/postQuestion.json";
import Ajv from "ajv";
const ajv = new Ajv();

const validateGetQuestion = ajv.compile(getQuestionSchema);
const validatePostQuestion = ajv.compile(postQuestionSchema);

const apiBaseURL: string = Cypress.env("API_BASE_URL");
const apiPrefixURL: string = Cypress.env("API_PREFIX_URL");
const authHeader = auth.getApiHeader();

const questionPostData: QuestionInfo = {
  question_text: faker.string.alpha(10),
  question_category: "results",
  input_type: "paragraph",
  question_subcategory: "Set Direction",
};
//@todo-test - the test cases needs to be refactored
describe("question API", function () {
  before(function () {
    cy.visit("/");
    // cy.generateToken();
    // cy.getCookie("authToken").then((cookie) => {
    //   authHeader.Authorization = "Bearer " + cookie?.value;
    // });
  });

  /**
   * Get question API should work correctly
   */
  it.skip("Get question API should work correctly", function () {
    cy.request({
      method: "GET",
      url: `${apiBaseURL + apiPrefixURL}/questions`,
      headers: authHeader,
    }).then((response) => {
      expect(response.status).to.eq(200);
      const questionsData = response.body;
      const isValidGetResponse = validateGetQuestion(questionsData);
      if (!isValidGetResponse) {
        cy.log("questionsData: schema property missing/mismatched");
        cy.log("questionsData: ", questionsData);
      }
      expect(isValidGetResponse).to.be.true;
    });
  });

  /**
   * POST question API should work correctly
   */
  it.skip("POST question API should work correctly", function () {
    const isValidPostResponse = validatePostQuestion(questionPostData);
    cy.log("isValidPostResponse: ", isValidPostResponse);

    //todo: only work until questions freez else forbidden 403
    // cy.request({
    //   method: "POST",
    //   url: `${apiBaseURL + apiPrefixURL}/questions`,
    //   body: questionPostData,
    //   headers: authHeader,
    // }).then((response) => {
    //   expect(response.status).to.eq(201);
    //   const responseData = response.body;
    //   //posted data got as response
    //   expect(responseData).to.deep.include(questionPostData);
    //   //validate response schema
    //   const isValidPostResponse = validatePostQuestion(responseData);
    //   expect(isValidPostResponse).to.be.true;
    // });
  });
});
