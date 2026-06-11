class pageLogin {

    typeUserName(name) {
        cy.get('input[formcontrolname="username"]').type(name)
    }

    typeUserPassword(password) {
        cy.get('input[formcontrolname="password"]').type(password)
    }

    clickLoginButton() {
        cy.get('app-login button').contains('Login').click()
    }



} module.exports = new pageLogin();