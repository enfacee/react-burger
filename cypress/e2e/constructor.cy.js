describe("Test constructor", () => {
    beforeEach(() => {
      cy.intercept("GET", "api/ingredients", { fixture: "ingredients" });
      cy.intercept("GET", "api/auth/user", { fixture: "user" });
      cy.intercept("POST", "api/orders", { fixture: "order" });
      window.localStorage.setItem(
        "accessToken",
        JSON.stringify("test-accessToken")
      );
      cy.visit("http://localhost:3000/");
    });
    it("test user authentification", () => {      
      cy.get('[data-cy=user]').should("have.text", "Test User");
    })
    
    it("test open/close modal", () => {
      cy.get('[data-cy=modal-header]').should("not.exist");
      cy.get('[data-cy=ingredient]').contains("Краторная булка N-200i").click();
      cy.get('[data-cy=modal-header]').should("have.text", "Детали ингредиента");
      cy.get('[data-cy=modal-ingredient]').should("have.text", "Краторная булка N-200i");
      cy.get('[data-cy=modal-overlay]').click(20,20);
      cy.get('[data-cy=modal-header]').should("not.exist");
    });

    it("test order (with drag and drop)", () => {
      cy.get('[data-cy=ingredient]').contains("Краторная булка N-200i").trigger("dragstart");
      cy.get('[data-cy=bun-constructor-top]').trigger("drop");
      cy.get('[data-cy=order-button]').children().first().should("be.disabled");
      cy.get('[data-cy=ingredient]').contains("Биокотлета").trigger("dragstart");
      cy.get('[data-cy=ingredients-contructor]').trigger("drop");
      cy.get('[data-cy=order-button]').children().first().should("be.enabled");
      cy.get('[data-cy=ingredient]').contains("Соус").trigger("dragstart");
      cy.get('[data-cy=ingredients-contructor]').trigger("drop");
      cy.get('[data-cy=order-button]').children().first().click();
      cy.get('[data-cy=modal-header]').should("exist");
      cy.get('[data-cy=order-number]').should("have.text", "45445");
      cy.get('[data-cy=modal-close]').click();
      cy.get('[data-cy=modal-header]').should("not.exist");      
    })
  });
  