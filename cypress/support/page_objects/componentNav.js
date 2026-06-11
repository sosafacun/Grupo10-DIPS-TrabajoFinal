// support/page_objects/componentNav.js

const componentNav = {

  // Valida el número que muestra el badge del carrito
  validationNumberCartBadge(expectedNumber) {
    cy.get('#mat-badge-content-0').contains(expectedNumber).should('be.visible')
  },

  // Valida el número que muestra el badge de wishlist
  validationNumberWishlistBadge(expectedNumber) {
    cy.get('mat-icon').contains('favorite')
      .closest('button')
      .find('.mat-badge-content')
      .contains(expectedNumber)
      .should('be.visible')
  },

  // Navega al carrito desde la barra de navegación
  goToCart() {
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed')
      .contains('shopping_cart')
      .click()
  },

  // Navega a la wishlist desde la barra de navegación
  goToWishlist() {
    cy.get('mat-icon').contains('favorite').click()
  }

}

module.exports = componentNav