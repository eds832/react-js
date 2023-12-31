describe('App', () => {
	it('shows correct page after opening URL with parametres', () => {
		cy.visit(
			'http://localhost:3000/movies?sortBy=TITLE&limit=50&filter=comedy&search=co&searchBy=TITLE'
		);
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-description', { timeout: 10000 })
			.should('have.length', 40);
		cy.get('[data-testid="search-input"]').should('have.value', 'co');
		cy.get('.movie-tile-title').each(($item) => {
			cy.wrap($item).invoke('text').should('match', /co/i);
		});
		cy.get('[data-testid="comedy-genre-button"]').should(
			'have.class',
			'selected'
		);
		cy.get('[data-testid="sort-select"]').find(':selected').contains('TITLE');
	});

	it('shows correct COCO movie page by its link', () => {
		cy.visit(
			'http://localhost:3000/movies/354912?filter=comedy&limit=50&sortBy=TITLE&search=co&searchBy=TITLE'
		);
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-description', { timeout: 10000 })
			.should('have.length', 40);
		cy.get('.title').invoke('text').should('match', /COCO/i);
		cy.get('[data-testid="comedy-genre-button"]').should(
			'have.class',
			'selected'
		);
		cy.get('[data-testid="sort-select"]').find(':selected').contains('TITLE');
		cy.get('.movie-tile-title').each(($item) => {
			cy.wrap($item).invoke('text').should('match', /co/i);
		});
	});
});
