describe('MovieListPage', () => {
	it('shows correct MovieDetails after MovieTile clicked', () => {
		cy.visit('http://localhost:3000/movies');
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-description', { timeout: 10000 })
			.should('have.length', 50);
		cy.get('[data-testid="movie-tile-img-424785"]').click();
		cy.get('[data-testid="movie-details-movie-name-424785"]').should(
			'have.text',
			'Transformers 7'
		);
	});

	it('shows SearchForm after MovieDetails search button clicked', () => {
		cy.visit('http://localhost:3000/movies');
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-description', { timeout: 10000 })
			.should('have.length', 50);
		cy.get('[data-testid="movie-tile-img-424785"]').click();
		cy.get('[data-testid="go-to-all-movies-button"]').click();
		cy.get('.search-form').should('be.visible');
	});
});
