class CartPage {

  deleteFirstItem() {
    cy.get('button[mattooltip="Delete item"]')
      .first()
      .click();
  }

  verifyEmptyCartMessage() {
    cy.contains('Your shopping cart is empty')
      .should('be.visible');
  }
}

export default new CartPage();