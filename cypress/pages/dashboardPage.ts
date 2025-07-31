class DashboardPage {
  elements = {
    getDashboardStatsCount(
      text: string,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
      return cy
        .get(".stats-card>div>.title")
        .contains(`${text}`)
        .parent()
        .parent()
        .find("span.value");
    },
  };
}
export default new DashboardPage();
