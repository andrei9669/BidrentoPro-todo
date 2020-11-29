describe('Input form', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('focused input on load', () => {
    cy.get('[data-cy=todo-input]').should('be.focused');
  });
  it('accepts input', () => {
    const inputValue = 'Buy Milk';
    cy.get('[data-cy=todo-input]')
      .type(inputValue)
      .should('have.value', inputValue);
  });

  context('Form submission', () => {
    beforeEach(() => {
      cy.server();
    });
    it('Adds new todo on submit', () => {
      const inputValue = 'Buy eggs';

      cy.route('POST', '/todos', {
        title: inputValue,
        id: 201,
        completed: false,
        userId: 1,
      });

      cy.get('[data-cy=todo-input]')
        .type(inputValue)
        .type('{enter}')
        .should('have.value', '');

      cy.get('[data-cy=todos]').should('contain', inputValue);
    });
    it('Shows an error on a failed submission', () => {
      cy.route({
        url: '/todos',
        method: 'post',
        status: 500,
        response: {},
      });
      cy.get('[data-cy=todo-input]').type('test{enter}');
      cy.get('#add-todo-error').should('be.visible');
    });
  });
});
