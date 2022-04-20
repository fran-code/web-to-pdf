const TESTFILE = 'testFile'

describe('Get PDF File', () => {

    it('should allow a typical user flow', () => {
        cy.visit('http://localhost:3000')
        cy.intercept('POST', 'http://localhost:4003/pdf/getPdf').as('apiCheck')

        cy.get('.getPdfForm').within(() => {
            cy.contains('div', 'Url').find('input').first().type('www.google.com')
            cy.contains('div', 'File Name').find('input').first().type(TESTFILE)
            cy.contains('div', 'Size').find('select').first().select('A2')
            cy.contains('button', 'Download').click()
        })

        cy.wait("@apiCheck").then((interception) => {
            cy.wrap(interception.response.statusCode).should("eq", 200);
        })

        cy.get('.lds-ring').should('not.exist')

        const downloadsFolder = Cypress.config("downloadsFolder");
        cy.readFile(`${downloadsFolder}\\${TESTFILE}.pdf`).should("exist");
    })
})