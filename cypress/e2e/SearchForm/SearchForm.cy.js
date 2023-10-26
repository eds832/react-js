describe('SearchForm', () => {
	it('find correct movie by a query', () => {
		cy.visit('http://localhost:3000/');
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-description', { timeout: 10000 })
			.should('have.length', 50);
		cy.get('[data-testid="search-input"]').type('The Matrix Reloaded{enter}');
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-description')
			.should('have.length', 1);
		cy.get('[data-testid="movie-tile-movie-id-604"]').should(
			'have.text',
			'The Matrix Reloaded'
		);
	});
});
