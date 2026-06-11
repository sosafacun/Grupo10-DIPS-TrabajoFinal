// support/page_objects/pageCheckout.js

const BOOK_NAME = 'Harry Potter and the Chamber of Secrets'

const pageCheckout = {

  // Verifica que el libro y todos los campos del formulario estén visibles
  isCheckoutFormVisible() {
    cy.get('.table').contains(BOOK_NAME).should('be.visible')
    cy.get('input[formcontrolname="name"]').should('be.visible')
    cy.get('input[formcontrolname="addressLine1"]').should('be.visible')
    cy.get('input[formcontrolname="addressLine2"]').should('be.visible')
    cy.get('input[formcontrolname="pincode"]').should('be.visible')
    cy.get('input[formcontrolname="state"]').should('be.visible')
  },

  // Completa el formulario de envío con datos del fixture user.json
  fillShippingForm(name, address1, address2, pincode, state) {
    cy.get('input[formcontrolname="name"]').type(name)
    cy.get('input[formcontrolname="addressLine1"]').type(address1)
    cy.get('input[formcontrolname="addressLine2"]').type(address2)
    cy.get('input[formcontrolname="pincode"]').type(pincode)
    cy.get('input[formcontrolname="state"]').type(state)
  },

  // Hace click en Place Order y verifica el mensaje de confirmación
  clickPlaceOrder() {
    cy.get('button').contains('Place Order').click()
    cy.contains('Cart cleared').should('be.visible')
  }

}

module.exports = pageCheckout