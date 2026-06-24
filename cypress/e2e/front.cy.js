import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')
const pageShoppingCart = require('../support/page_objects/pageShoppingCart')
const pageCheckout = require('../support/page_objects/pageCheckout')
const pageWishlist = require('../support/page_objects/pageWishlist')
const pageBookDetail = require('../support/page_objects/pageBookDetail')

describe('Casos de prueba de FRONT', () => {
  before(function () {
    cy.loginAPI(user.name, user.password)
  })

  it('Comprar carrito exitosamente y visualizar orden de compra', () => {
    cy.deleteCartAPI(user.userID, user.token)

    cy.visit(url.login)
    cy.login(user.name, user.password)
    cy.url().should('include', url.home)

    pageHome.isBookVisible()
    componentNav.validationNumberCartBadge('0')
    pageHome.clickAddToCartButton()
    pageHome.validateAddToCartToast()
    componentNav.validationNumberCartBadge('1')

    componentNav.goToCart()
    cy.url().should('include', url.shoppingCart)
    pageShoppingCart.isBookVisible()
    pageShoppingCart.clickCheckOutButton()

    cy.url().should('include', url.checkout)
    pageCheckout.isCheckoutFormVisible()
    pageCheckout.fillShippingForm(user.formName, user.address1, user.address2, user.pincode, user.state)
    pageCheckout.clickPlaceOrder()

    cy.url().should('include', url.myOrders)
    cy.get('.mat-mdc-row').should('be.visible')
    cy.get('.mat-mdc-row').eq(0).click()
  })

  it('Borrar item del carrito | Matias Crespo', () => {
    cy.visit(url.login);
    cy.login(user.name, user.password);
    cy.url().should('include', url.home);
    pageHome.isBookVisible();
    pageHome.clickAddToCartButton();
    cy.contains('One Item added to cart').should('be.visible');

    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed')
      .contains('shopping_cart')
      .click();

    cy.get('button[mattooltip="Delete item"]')
      .first()
      .click();

    cy.contains('Your shopping cart is empty')
      .should('be.visible');
  })

  it('Filtrar por categoría Fantasy y verificar detalle de libro | María Nuñez', () => {
    cy.visit(url.login)
    cy.login(user.name, user.password)
    cy.url().should('include', url.home)
    pageHome.isBookVisible()
    cy.contains('Fantasy').click()
    cy.get('app-book-card').should('have.length.greaterThan', 0)
    pageBookDetail.clickFirstBook()
    pageBookDetail.isDetailPageVisible()
    pageBookDetail.isBookTitleVisible()
    pageBookDetail.isCategoryFantasy()
    pageBookDetail.isAddToCartButtonVisible()
    pageBookDetail.seVisualizaLaCategoria()
  })

  it('Comprar carrito exitosamente y visualizar orden de compra | Magali Gonzalez', function () {
    cy.deleteCartAPI(user.userID, user.token)

    cy.visit(url.login)
    cy.login(user.name, user.password)
    cy.url().should('include', url.home)

    pageHome.isBookVisible()
    componentNav.validationNumberCartBadge('0')
    pageHome.clickAddToCartButton()
    pageHome.validateAddToCartToast()
    componentNav.validationNumberCartBadge('1')

    componentNav.goToCart()
    cy.url().should('include', url.shoppingCart)
    pageShoppingCart.isBookVisible()
    pageShoppingCart.clickCheckOutButton()

    cy.url().should('include', url.checkout)
    pageCheckout.isCheckoutFormVisible()
    pageCheckout.fillShippingForm(user.formName, user.address1, user.address2, user.pincode, user.state)
    pageCheckout.clickPlaceOrder()

    cy.url().should('include', url.myOrders)
    cy.get('.mat-mdc-row').should('be.visible')
    cy.get('.mat-mdc-row').eq(0).click()
  })

  it('Agregar libro a favoritos exitosamente Front | Magali Gonzalez', function () {
    cy.deleteWishlistAPI(user.userID, this.token)

    cy.visit(url.login)
    cy.login(user.name, user.password)
    cy.url().should('include', url.home)

    pageHome.isBookVisible()
    componentNav.validationNumberWishlistBadge('0')
    pageHome.clickFavouriteButton()
    pageHome.validateAddToWishlistToast()
    componentNav.validationNumberWishlistBadge('1')

    componentNav.goToWishlist()
    cy.url().should('include', url.wishlist)
    pageWishlist.isBookVisible()

    pageWishlist.clickBook()
    cy.url().should('include', url.bookDetail)
    cy.contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    pageWishlist.goBack()
    pageWishlist.isBookVisible()
  })

  it('Filtrar via slider y verificar todos los precios | Sosa, Facundo Nicolás', function () {
    const targetPrice = 900

    cy.visit(url.home)
    pageHome.setPriceFilterSlider(targetPrice)
    pageHome.verifyAllBooksAreUnderPrice(targetPrice)
  })
})
//it.only ejecutar solo ese caso de prueba
//it.skip no ejecuta ese caso de prueba
