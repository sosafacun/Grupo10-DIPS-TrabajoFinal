// support/page_objects/pageShoppingCart.js

const BOOK_NAME = 'Harry Potter and the Chamber of Secrets'

const pageShoppingCart = {

  // Verifica que el libro aparezca en el carrito
  isBookVisible() {
    cy.get('app-shoppingcart').contains(BOOK_NAME).should('be.visible')
  },

  // Hace click en el botón de checkout
  clickCheckOutButton() {
    cy.get('button').contains('CheckOut').click()
  }

}

module.exports = pageShoppingCart
