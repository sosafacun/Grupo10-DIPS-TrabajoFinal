const pageHome = {

  // Verifica que el libro esté visible en el catálogo
  isSpecificBookVisible(bookName) {
    cy.get('app-book-card').contains(bookName).should('be.visible')
  },
  
  isBookVisible() {
    cy.get('app-book-card').should('be.visible')
  },

  // Hace click en el botón "Add to Cart" del primer libro
  clickAddToCartButton() {
    cy.get('button').contains('Add to Cart').click()
  },

  // Verifica el mensaje de confirmación al agregar al carrito
  validateAddToCartToast() {
    cy.contains('One Item added to cart').should('be.visible')
  },

  // Hace click en el ícono de favorito del primer libro
  clickFavouriteButton() {
    cy.get('.favourite-unselected').eq(0).click()
  },

  // Verifica el mensaje de confirmación al agregar a wishlist
  validateAddToWishlistToast() {
    cy.contains('Added to Wishlist!!!').should('exist')
  },

  setPriceFilterSlider(price) {
    cy.get('input.mdc-slider__input')
      .invoke('val', price)
      .trigger('input')
      .trigger('change')
  },

    openShoppingCart() {
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed')
      .contains('shopping_cart')
      .click();
  },

  verifyAllBooksAreUnderPrice(maxPrice) {
    cy.get('mat-card-content p').each(($el) => {

      const priceText = $el.text().replace('₹', '').replace(/,/g, '').trim()
      const priceValue = parseFloat(priceText)
      
      expect(priceValue).to.be.at.most(maxPrice)
    })
  }

}

module.exports = pageHome