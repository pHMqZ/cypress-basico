Cypress.Commands.add('fillMandatoryFieldsAndSubmit',(name, lastName, email) =>{
    cy.get('#firstName').type(name)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type('Teste de preenchimento de campos obrigatórios e envio de formulário', {delay: 0})
    cy.get('button[type="submit"]').click()
})