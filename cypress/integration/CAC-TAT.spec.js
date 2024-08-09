/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => cy.visit('./src/index.html'))

    it('Teste de verificação de titulo', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenchimento de campos obrigatórios e envio de formulário', () => {
       
        cy.get('input[id="firstName"]').type('Phillip')
        .should('have.value','Phillip')
        cy.get('input[id="lastName"]').type('Marques')
        .should('have.value','Marques')
        cy.get('input[id="email"]').type('phmarq@marq.com')
        .should('have.value','phmarq@marq.com')
        cy.get('textarea[id="open-text-area"]').type('Teste de preenchimento de campos obrigatórios e envio de formulário', {delay: 0})
        .should('have.value','Teste de preenchimento de campos obrigatórios e envio de formulário')
        cy.get('button[type="submit"]').click()
        cy.get('span[class="success"]').should('be.visible')
    })
        
    
  })