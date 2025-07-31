import auth from "../helpers/auth";
class common {
  /**
   * @param filePath
   * @param testData
   */
  writeDataInFile(filePath: string, testData: any) {
    cy.writeFile(filePath, JSON.stringify(testData, null, 2));
  }

  /**
   * @returns
   */
  checkIfSTQuestionsFreezed() {
    return cy.getCookie("authTokenVal").then((authToken) => {
      let ifFreezed = true;

      const apiBaseURL: string = Cypress.env("API_BASE_URL");
      const apiPrefixURL: string = Cypress.env("API_PREFIX_URL");
      const authHeader = auth.getApiHeader();

      authHeader.Authorization = "Bearer " + authToken?.value;

      return cy
        .request({
          method: "GET",
          url: `${apiBaseURL + apiPrefixURL}/questions/frozen-status`,
          headers: authHeader,
        })
        .then((response) => {
          const responseData = response.body;
          const frozenOnDate = new Date(responseData.frozen_on).getTime();
          const unfrozenOnDate = new Date(responseData.unfrozen_on).getTime();

          ifFreezed = frozenOnDate > unfrozenOnDate ? true : false;
          return ifFreezed;
        });
    });
  }

  /**
   *
   * @param text
   * @returns
   */
  getRandomNumberInBetween(firstNumber: number, lastNumber: number) {
    return Cypress._.random(firstNumber, lastNumber);
  }

  /**
   * @returns
   */
  selectAssessmentDuration(currentIndex: number): number {
    const current_date = new Date();
    const IsDecMonth = current_date.getMonth() === 11 ? true : false;
    if (IsDecMonth && current_date.getDate() >= 29) {
      return -1;
    } else if (IsDecMonth && current_date.getDate() >= 17 && currentIndex > 0) {
      return 0;
    } else if (
      IsDecMonth &&
      current_date.getDate() >= 2 &&
      currentIndex === 2
    ) {
      return this.getRandomNumberInBetween(0, 1);
    }
    return currentIndex;
  }
}
export default new common();
