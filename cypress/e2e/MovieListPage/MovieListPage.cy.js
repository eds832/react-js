describe('MovieListPage', () => {
	it('shows correct MovieDetails after MovieTile clicked', () => {
		cy.visit('http://localhost:3000/');
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-description', { timeout: 10000 })
			.should('have.length', 50);
		cy.get('[data-testid="movie-tile-img-284054"]').click();
		cy.get('[data-testid="movie-details-movie-name-284054"]').should(
			'have.text',
			'Black Panther'
		);
	});

	it('shows SearchForm after MovieDetails search button clicked', () => {
		cy.visit('http://localhost:3000/');
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-description', { timeout: 10000 })
			.should('have.length', 50);
		cy.get('[data-testid="movie-tile-img-284054"]').click();
		cy.get('[data-testid="go-to-all-movies-button"]').click();
		cy.get('.search-form').should('be.visible');
	});
});
