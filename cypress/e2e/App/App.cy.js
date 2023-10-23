describe('App', () => {
	it('shows correct page after opening URL with parametres', () => {
		cy.visit(
			'http://localhost:3000/?sortBy=TITLE&limit=50&genre=comedy&query=co&searchBy=title'
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
		cy.visit('http://localhost:3000/354912?genre=comedy&limit=50&sortBy=TITLE');
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-description', { timeout: 10000 })
			.should('have.length', 50);
		cy.get('.title').invoke('text').should('match', /COCO/i);
		cy.get('[data-testid="comedy-genre-button"]').should(
			'have.class',
			'selected'
		);
		cy.get('[data-testid="sort-select"]').find(':selected').contains('TITLE');
	});
});
