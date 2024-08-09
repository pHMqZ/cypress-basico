/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => cy.visit('./src/index.html'))

    it('Teste de verificação de titulo', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenchimento de campos obrigatórios e envio de formulário', () => {
        cy.get('input[id="firstName"]').type('Phillip')
        cy.get('input[id="lastName"]').type('Marques')
        cy.get('input[id="email"]').type('phmarq@marq.com')
        cy.get('textarea[id="open-text-area"]').type('Teste de preenchimento de campos obrigatórios e envio de formulário', {delay: 0})
        cy.get('button[type="submit"]').click()
        
        cy.get('.success').should('be.visible')
    })

    it('Validação de máscara de e-mail', function(){
        cy.get('input[id="firstName"]').type('Phillip')
        cy.get('input[id="lastName"]').type('Marques')
        cy.get('input[id="email"]').type('phmarqmarq.com')
        cy.get('textarea[id="open-text-area"]').type('Teste de preenchimento de campos obrigatórios e envio de formulário', {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

  })