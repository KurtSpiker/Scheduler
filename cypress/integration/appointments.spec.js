describe("Appointments", () => {
  
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  })

  it("should book an interview", () => {

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones", 150);

    cy.get(".interviewers__item")
      .first()
      .click();

    cy.contains("Save")
      .click();
      
    cy.contains(".appointment__card--show", "Lydia Miller-Jones", "Sylvia Palmer");

  });

  it("should edit an interview", () => {
    
    cy.get("[alt=Edit]")
      .click({ force: true });

    cy.get(".interviewers__item")
      .last()
      .click();
      
    cy.contains("Save")
      .click();
      
    cy.contains(".appointment__card--show", "Archie Cohen", "Tori Malcolm");

  });

  it("should cancel an interview", () => {

    cy.get("[alt=Delete]")
      .click({ force: true });

    cy.contains("Confirm")
      .click();

    cy.contains("Deleting")

    cy.contains("Deleting").should("not.exist")

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist")
  })

});