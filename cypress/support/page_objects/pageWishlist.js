// support/page_objects/pageWishlist.js

const BOOK_NAME = 'Harry Potter and the Chamber of Secrets'

const pageWishlist = {

  // Verifica que el libro aparezca en la wishlist
  isBookVisible() {
    cy.contains(BOOK_NAME).should('be.visible')
    cy.get('app-wishlist').contains(BOOK_NAME).should('be.visible')
  },

  // Hace click sobre el libro para ir al detalle
  clickBook() {
    cy.contains(BOOK_NAME).click()
  },

  // Vuelve a la página anterior
  goBack() {
    cy.go('back')
  }

}

module.exports = pageWishlist
