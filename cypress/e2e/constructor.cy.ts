describe("Test constructor", () => {
    beforeEach(() => {
      cy.intercept("GET", "api/ingredients", { fixture: "ingredients" });
      cy.intercept("GET", "api/auth/user", { fixture: "user" });
      window.localStorage.setItem(
        "accessToken",
        JSON.stringify("test-accessToken")
      );
      cy.visit("/");
    });
    it("test user authentification", () => {      
      cy.get('[data-cy=user]').should("have.text", "Test User");
    })
    const bunName = "Краторная булка N-200i";
    it("test open/close modal", () => {
      cy.getModalHeader().should("not.exist");
      cy.getIngredient(bunName).click();
      cy.getModalHeader().should("have.text", "Детали ингредиента");
      cy.get('[data-cy=modal-ingredient]').should("have.text", bunName);
      cy.get('[data-cy=modal-overlay]').click(20,20);
      cy.getModalHeader().should("not.exist");
    });

    it("test order (with drag and drop)", () => {
      cy.intercept("POST", "api/orders", { fixture: "order" });
      cy.get('[data-cy=ingredients-contructor]').as('ingredientConstructor');
      cy.getIngredient(bunName).trigger("dragstart");
      cy.get('[data-cy=bun-constructor-top]').trigger("drop");
      cy.getOrderButton().should("be.disabled");
      cy.getIngredient("Биокотлета").trigger("dragstart");
      cy.get('@ingredientConstructor').trigger("drop");
      cy.getOrderButton().should("be.enabled");
      cy.getIngredient("Соус").trigger("dragstart");
      cy.get('@ingredientConstructor').trigger("drop");
      cy.getOrderButton().click();
      cy.getModalHeader().should("exist");
      cy.get('[data-cy=order-number]').should("have.text", "45445");
      cy.get('[data-cy=modal-close]').click();
      cy.getModalHeader().should("not.exist");      
    })
  });
  