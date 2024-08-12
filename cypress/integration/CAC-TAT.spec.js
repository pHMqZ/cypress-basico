/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => cy.visit('./src/index.html'))

    it('Teste de verificação de titulo', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenchimento de campos obrigatórios e envio de formulário', () => {
        cy.get('#firstName').type('Phillip')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('phmarq@marq.com')
        cy.get('#open-text-area').type('Teste de preenchimento de campos obrigatórios e envio de formulário', {delay: 0})
        cy.contains('button','Enviar').click()
        
        cy.get('.success').should('be.visible')
    })

    it('Validação de máscara de e-mail', function(){
        cy.get('#firstName').type('Phillip')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('phmarqmarq.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Validação de preenchimento com valores não numericos no campo telefone', ()=>{
        cy.get('#phone')
            .type('abcdef').should('have.value', '')
    })

    it('Validação de obrigatoriedade de telefone', () =>{
        cy.get('#firstName').type('Phillip')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('phmarq@marq.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        
        cy.contains('button','Enviar').click()
    })

    it('Preenchimento e limpeza de campos',() =>{
        cy.get('#firstName').type('Phillip').should('have.value','Phillip').clear().should('have.value','')
        cy.get('#lastName').type('Marques').should('have.value','Marques').clear().should('have.value','')
        cy.get('#email').type('phmarq@marq.com').should('have.value','phmarq@marq.com').clear().should('have.value','')
        cy.get('#phone').type('19987344632').should('have.value','19987344632').clear().should('have.value','')
    })

    it('Validação de preenchimento de campos obrigatórios',() =>{
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Envio de formulário com comando customizado',() =>{
        cy.fillMandatoryFieldsAndSubmit('Phillip', 'Marques', 'phillip@phillip.com')

        cy.get('.success').should('be.visible') 
    })
  })