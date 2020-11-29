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

  it.only('removes todo', () => {
    cy.get('[data-cy=todos] div').as('list');

    cy.get('@list')
      .first()
      .trigger('mouseover')
      .find('[data-cy=delete]')
      .click();

    cy.get('@list').should('have.length', 3).and('not.contain', 'Milk');
  });
});
