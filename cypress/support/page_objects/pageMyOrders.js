class PageMyOrders {
  verifyOrderIsVisible() {
    cy.get('.mat-mdc-row').should('be.visible')
  }

  clickFirstOrder() {
    cy.get('.mat-mdc-row').eq(0).click()
  }
}

module.exports = new PageMyOrders()