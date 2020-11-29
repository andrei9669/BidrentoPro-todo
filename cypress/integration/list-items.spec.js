describe('List items', () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });

  it('properly displays completed items', () => {
    cy.get('[data-cy=todos] div')
      .filter('[data-completed=true]')
      .should('have.length', 1)
      .and('contain', 'Eggs')
      .find('input')
      .should('have.prop', 'checked');
  });

  it('removes todo', () => {
    cy.get('[data-cy=todos] div').as('list');

    cy.get('@list')
      .first()
      .trigger('mouseover')
      .find('[data-cy=delete]')
      .click();

    cy.get('@list').should('have.length', 3).and('not.contain', 'Milk');
  });

  it('Edits todo', () => {
    cy.get('[data-cy=todos] div').first().as('item');

    cy.get('@item').click().find('textarea').first().clear().type('Buy 2 milk');
    cy.get('@item').find('button').click();
    cy.get('@item').contains('Buy 2 milk').and('not.contain', 'Save');
  });

  it('Marks an incomplete item complete', () => {
    cy.fixture('todos').then((todos) => {
      const target = Cypress._.head(todos);
      cy.route(
        'PUT',
        `/todos/${target.id}`,
        Cypress._.merge(target, { completed: true }),
      );
    });

    cy.get('[data-cy=todos] div').first().as('first-todo');

    cy.get('@first-todo').find('input').click().should('be.checked');

    cy.get('@first-todo').should('have.attr', 'data-completed');
  });
});
