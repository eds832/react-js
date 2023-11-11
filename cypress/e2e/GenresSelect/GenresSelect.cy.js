describe('GenresSelect', () => {
	it('check all movies have Documentary genre after Documentary button clicked', () => {
		cy.visit('http://localhost:3000/movies');
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-description', { timeout: 10000 })
			.should('have.length', 50);
		cy.get('[data-testid="documentary-genre-button"]').click();
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-description', { timeout: 10000 })
			.should('have.length', 13);
		cy.get('.movie-genres').each(($item) => {
			cy.wrap($item).should('include.text', 'Documentary');
		});
	});
});
