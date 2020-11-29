describe('Header', () => {
  context('With a single todo', () => {
    it('displays a singular todo in count', () => {
      cy.seedAndVisit([{ id: 1, title: 'Buy Milk', completed: false }]);
      cy.get('[data-cy=task-count]').should('contain', '1 todo left');
    });
  });

  context('With multiple todos', () => {
    beforeEach(() => {
      cy.seedAndVisit();
    });
    it('Displays plural todos in count', () => {
      cy.get('[data-cy=task-count]').should('contain', '3 todos left');
    });
    it('Handles filter', () => {
      const filters = [
        { filterItem: 'Active', expectedLength: 3 },
        { filterItem: 'Completed', expectedLength: 1 },
        { filterItem: 'All', expectedLength: 4 },
      ];
      cy.wrap(filters).each((filter) => {
        cy.get('[data-cy=filters]').click();
        cy.contains(filter.filterItem).click();

        cy.get('[data-cy=todos] div').should(
          'have.length',
          filter.expectedLength,
        );
      });
    });
    it.only('Handles Search', () => {
      cy.get('[data-cy=search]').type('Milk');
      cy.get('[data-cy=todos] div')
        .should('have.length', 1)
        .and('contain', 'Milk');
    });
  });
});
