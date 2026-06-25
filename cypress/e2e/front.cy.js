import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
import book from '../fixtures/book.json'

const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')
const pageShoppingCart = require('../support/page_objects/pageShoppingCart')
const pageCheckout = require('../support/page_objects/pageCheckout')
const pageWishlist = require('../support/page_objects/pageWishlist')
const pageBookDetail = require('../support/page_objects/pageBookDetail')
const pageCart = require('../support/page_objects/cartPage')
const pageMyOrders = require('../support/page_objects/pageMyOrders')

describe('Casos de prueba de FRONT', () => {
  before(function () {
    cy.apiLogin(user.name, user.password)
  })

  it("Comprar carrito exitosamente y visualizar orden de compra", function () {
    cy.deleteCartAPI(user.userID, user.token);

    cy.visit(url.login);
    cy.login(user.name, user.password);
    cy.url().should('include', url.home);

    pageHome.isBookVisible();
    componentNav.validationNumberCartBadge('0');
    pageHome.clickAddToCartButton();
    pageHome.validateAddToCartToast();
    componentNav.validationNumberCartBadge('1');

    componentNav.goToCart();
    cy.url().should('include', url.shoppingCart);
    pageShoppingCart.isBookVisible();
    pageShoppingCart.clickCheckOutButton();

    cy.url().should('include', url.checkout);
    pageCheckout.isCheckoutFormVisible();
    pageCheckout.fillShippingForm(user.formName, user.address1, user.address2, user.pincode, user.state);
    pageCheckout.clickPlaceOrder();

    cy.url().should('include', url.myOrders);
    pageMyOrders.verifyOrderIsVisible();
    pageMyOrders.clickFirstOrder();
    cy.contains(book.bookOneTitle).should('be.visible');
  })

  it('Eliminar item del carrito | Matias Crespo', () => {

    cy.goToHome();

    pageHome.isBookVisible();
    pageHome.clickAddToCartButton();
    pageHome.openShoppingCart();

    pageCart.deleteFirstItem();
    pageCart.verifyEmptyCartMessage();
  });

  it('Filtrar por categoría Fantasy y verificar detalle de libro | María Nuñez', () => {
    cy.visit(url.login)
    cy.login(user.name, user.password)
    cy.url().should('include', url.home)
    pageHome.isSpecificBookVisible(book.bookOneTitle)
    cy.contains('Fantasy').click()
    cy.get('app-book-card').should('have.length.greaterThan', 0)
    pageBookDetail.clickFirstBook()
    pageBookDetail.isDetailPageVisible()
    pageBookDetail.isBookTitleVisible()
    pageBookDetail.isCategoryFantasy()
    pageBookDetail.isAddToCartButtonVisible()
    pageBookDetail.isCategoryVisible()
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
    cy.contains(book.bookOneTitle).should('be.visible')
    pageWishlist.goBack()
    pageWishlist.isBookVisible()
  })

  it('Filtrar via slider y verificar todos los precios sean iguales o estén por debajo del valor del filtro | Sosa, Facundo Nicolás', () => {
    const targetPrice = 250

    cy.goToHome();
    pageHome.setPriceFilterSlider(targetPrice)
    pageHome.verifyAllBooksAreUnderPrice(targetPrice)
  })
})