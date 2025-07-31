describe("Index page test cases.", function () {
  it("landing page should be correct.", function () {
    cy.visit("/login");
    cy.task("customLog", "This is the sample test case");
    // cy.dataCy("fieldtxt");
  });
});
