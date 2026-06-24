import user from '../fixtures/user.json'

describe('Casos de prueba de APIs', () => {
    beforeEach(function () {
        cy.apiLogin(user.name, user.password)
    })

    it('API | Comprar carrito exitosamente', function () {
        cy.postCheckOutAPI(user.userID, this.token, 200)
    })

    it('API | Error al comprar carrito sin token', () => {
        cy.postCheckOutAPI(user.userID, '', 401)
    })

    it('Login API exitoso | Matias Crespo', () => {
        cy.apiLogin(user.name, user.password, 200)
    })

    it('Login API campo incorrecto | Matias Crespo', () => {
        cy.apiLogin(user.name, 'PasswordIncorrecta', 401)
    })

    it('API | Obtener catálogo de libros | Facundo Sosa', () => {
        cy.getBookList()
    })

    it('API | Obtener libro individual por ID válido | Facundo Sosa', () => {
        cy.getBookById(2, false).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('API | Obtener libro con ID inexistente | Facundo Sosa', () => {
        cy.getBookById(99999, false).then((response) => {
            expect(response.status).to.eq(404)
        })
    })

    it('Agregar libro a favoritos sin credenciales API | Magali Gonzalez', () => {
        cy.postToggleWishlistAPI(user.userID, user.wishlistBookId, '', 401)
    })
    
    it('API | Checkout exitoso con datos válidos | María Nuñez', function () {
        cy.postCheckOutAPI(user.userID, this.token, 200)
    })

    it('API | Error al comprar carrito sin token | María Nuñez', () => {
        cy.postCheckOutAPI(user.userID, '', 401)
    })
})