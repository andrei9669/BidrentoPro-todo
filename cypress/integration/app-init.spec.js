describe('App initialization', () => {
  it('Loads todos on page load', () => {
    cy.seedAndVisit();
    cy.get('[data-cy=todos] div').should('have.length', 4);
  });
  it('Displays an error on failure', () => {
    cy.server();
    cy.route({
      url: '/todos?userId=1',
      method: 'GET',
      status: 500,
      response: {},
    });
    cy.visit('/');

    cy.get('[data-cy=todos] div').should('not.exist');
    cy.get('#error-message').should('exist');
  });
});
