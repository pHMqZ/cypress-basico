/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const TIME_DIV = 3000

    beforeEach(() => cy.visit('./src/index.html'))
    
    // Teste de localização, preenchimento e clique em elementos
    it('Teste de verificação de titulo', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenchimento de campos obrigatórios e envio de formulário', () => {
        
        cy.clock()
        
        cy.get('#firstName').type('Phillip')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('phmarq@marq.com')
        cy.get('#open-text-area').type('Teste de preenchimento de campos obrigatórios e envio de formulário', {delay: 0})
        cy.contains('button','Enviar').click()
        
        cy.get('.success').should('be.visible')
        
        cy.tick(TIME_DIV)
        cy.get('.success').should('not.be.visible')
    })

    it('Validação de máscara de e-mail', function(){
        cy.clock()

        cy.get('#firstName').type('Phillip')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('phmarqmarq.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(TIME_DIV)
        cy.get('.error').should('not.be.visible')
    })

    Cypress._.times(5, ()=>{
        it('Validação de preenchimento com valores não numericos no campo telefone', ()=>{
            cy.get('#phone')
                .type('abcdef').should('have.value', '')
        })
    })
    

    it('Validação de obrigatoriedade de telefone', () =>{
       cy.clock()

        cy.get('#firstName').type('Phillip')
        cy.get('#lastName').type('Marques')
        cy.get('#email').type('phmarq@marq.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(TIME_DIV)
        cy.get('.error').should('not.be.visible')
    })


    it('Preenchimento e limpeza de campos',() =>{
        cy.get('#firstName').type('Phillip').should('have.value','Phillip').clear().should('have.value','')
        cy.get('#lastName').type('Marques').should('have.value','Marques').clear().should('have.value','')
        cy.get('#email').type('phmarq@marq.com').should('have.value','phmarq@marq.com').clear().should('have.value','')
        cy.get('#phone').type('19987344632').should('have.value','19987344632').clear().should('have.value','')
    })

    it('Validação de preenchimento de campos obrigatórios',() =>{
        cy.clock()

        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(TIME_DIV)
        cy.get('.error').should('not.be.visible')
    })


    it('Envio de formulário com comando customizado',() =>{
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit('Phillip', 'Marques', 'phillip@phillip.com')

        cy.get('.success').should('be.visible') 

        cy.tick(TIME_DIV)
        cy.get('.success').should('not.be.visible')
    })
    

    // Testes de seleção de campos de seleção suspensa
    it('Seleção do produto YouTube, pelo texto',() =>{
        cy.get('select').select('YouTube').should('have.value','youtube')
    })

    it('Seleção do produto Mentoria, pelo valor(value)',() =>{
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })

    it('Seleção do produto Mentoria, pelo índice',() =>{
        cy.get('#product').select(1).should('have.value','blog')
    })

    //Testes de seleção de inputs do tipo radio
    it('Marcação do tipo de atendimento "Feedback"', () =>{
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marcação de cada tipo de atendimento', () =>{
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) =>{
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    //Teste marcando (e desmarcando) inputs do tipo checkbox
    it('Marcando ambos checkboxes e após desmarcando o ultimo',() =>{
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        
    })

    //Teste de upload de arquivos
    it('Seleção de arquivos para upload',() => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(($input) =>{
                expect($input[0].files[0].name).to.equal('example.json')
            })
           
    })

    it('Seleção de arquivos através de drag-and-drop',() => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(($input) =>{
                expect($input[0].files[0].name).to.equal('example.json')
            })
           
    })

    it('Seleção de arquivos através de um alias',() => {
        cy.fixture('example.json').as('sampleFile')        
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(($input) =>{
                expect($input[0].files[0].name).to.equal('example.json')
            })
           
    })

    //Teste de abertura de link
    it('Verificação de abertura da política de privacidade abre em outra aba, sem clique',() => {
          cy.get('#privacy a').should('have.attr', 'target', '_blank')         
    })

    it('Acesso a página de políticas, remover target e clicando no link',() => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })

    //Testes forçando exibição de mensagens de erro e sucesso com o invoke
    it('Testes forçando exibição de mensagens de erro e sucesso com o invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('Teste de preenchimento de campo com .invoke()', () => {
        
        const longTest = Cypress._.repeat('0987654321', 200)

        cy.get('#open-text-area')
            .invoke('val', longTest)
            .should('have.value', longTest)
    })

  })