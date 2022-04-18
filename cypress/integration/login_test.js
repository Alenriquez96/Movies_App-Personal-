describe('Login form test with incorrect parms', () => {
    it('Login scenario', () => {
        cy.visit(Cypress.env('URL_BASE'))
        cy.get('#login-home').click()
        cy.url().should('include', 'login')
        cy.url().should('eq', (Cypress.env('URL_BASE') + "login"))
        cy.get('[type="text"]').type("testuser@gmail.com")
        cy.get('[type="password"]').type("aslkjf32--gre23")
        cy.get('form').submit()
        cy.get('body').should('have.text', 'Email or password incorrect')
    })
})