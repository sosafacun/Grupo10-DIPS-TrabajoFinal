import url from '../fixtures/url.json'
const pageLogin = require('../support/page_objects/pageLogin')
const pageHome = require('../support/page_objects/pageHome')
import { parseCurrencyToFloat } from './utils/currencyParser';

Cypress.Commands.add('login', (name, password) => {
  pageLogin.typeUserName(name)
  pageLogin.typeUserPassword(password)
  pageLogin.clickLoginButton()
})

// Consolidated Login API command
Cypress.Commands.add('apiLogin', (username, password, expectedStatus = 200) => {
  return cy.request({
    method: 'POST',
    url: `${url.api}/login`,
    failOnStatusCode: false,
    headers: { 'Content-Type': 'application/json' },
    body: { username, password }
  }).then((response) => {
    expect(response.status).to.eq(expectedStatus)
    if (response.status === 200) {
      window.localStorage.setItem('authToken', response.body.token)
      cy.wrap(`Bearer ${response.body.token}`).as('token')
    }
  })
})

Cypress.Commands.add('deleteCartAPI', (userId, token) => {
  cy.request({
    method: 'DELETE',
    url: `${url.apiCart}${userId}`,
    failOnStatusCode: false,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: token
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('postCheckOutAPI', (userId, token, expectedStatus) => {
  cy.request({
    method: 'POST',
    url: `${url.apiCheckout}${userId}`,
    failOnStatusCode: false,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: token
    },
    body: {
      orderDetails: [
        {
          book: {
            bookId: 3,
            title: 'Harry Potter and the Prisoner of Azkaban',
            author: 'JKR',
            category: 'Romance',
            price: 213,
            coverFileName: 'c63ade52-3f90-41fa-980a-1136b6ad2128HP3.jpg'
          },
          quantity: 1
        }
      ],
      cartTotal: 213
    }
  }).then((response) => {
    expect(response.status).to.eq(expectedStatus)
  })
})

Cypress.Commands.add('deleteWishlistAPI', (userId, token) => {
  cy.request({
    method: 'DELETE',
    url: `${url.apiWishlist}${userId}`,
    failOnStatusCode: false,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: token
    }
  })
})

Cypress.Commands.add('postToggleWishlistAPI', (userId, bookId, token, expectedStatus) => {
  cy.request({
    method: 'POST',
    url: `${url.apiToggleWishlist}${userId}/${bookId}`,
    failOnStatusCode: false,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: token
    },
    body: {}
  }).then((response) => {
    expect(response.status).to.eq(expectedStatus)
  })
})

Cypress.Commands.add('getBookById', (bookId, failOnStatusCode = true) => {
  return cy.request({
    method: 'GET',
    url: `${url.api}/Book/${bookId}`,
    failOnStatusCode: failOnStatusCode
  })
})

Cypress.Commands.add('getBookList', () => {
  cy.request('GET', `${url.api}/Book`).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('array')
    expect(response.body.length).to.be.greaterThan(0)
    expect(response.body[0]).to.have.property('bookId')
    expect(response.body[0]).to.have.property('title')
  })
})

Cypress.Commands.add('goToHome', () => {
    cy.visit(url.home);
    cy.url().should('include', url.home);
});

Cypress.Commands.add('verifyBooksUnderPrice', { prevSubject: 'element' }, (subject, maxPrice) => {
  cy.wrap(subject).each(($el) => {
    const priceValue = parseCurrencyToFloat($el.text());
    expect(priceValue).to.be.at.most(maxPrice);
  });
});