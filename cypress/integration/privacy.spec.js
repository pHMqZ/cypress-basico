//Teste de forma indepentende de outra página
it.only('Teste de verificação da página de políticas de privacidade', function() {
    cy.visit('./src/privacy.html')

    cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.').should('be.visible')
})