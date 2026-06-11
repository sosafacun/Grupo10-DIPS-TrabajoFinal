class ShopPage {
  visit() {
    cy.visit('https://app.bookdbqa.online')
  }

  selectCategory(category) {
    cy.contains(category).click()
  }

  getBookCards() {
    return cy.get('.book-card, .mat-card, [class*="card"]')
  }
}

export default new ShopPage()