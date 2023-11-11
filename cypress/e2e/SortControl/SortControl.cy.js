describe('SortControl', () => {
	it('SortControl initial state is RELEASE DATE', () => {
		cy.visit('http://localhost:3000/movies');
		cy.get('[data-testid="sort-select"]', { timeout: 10000 })
			.find(':selected')
			.contains('RELEASE DATE');
	});

	it('Sort by release date works correctly', () => {
		cy.visit('http://localhost:3000/movies');
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-release-year', { timeout: 10000 })
			.should('have.length', 50);
		cy.get('.movie-tile-release-year').then((items) => {
			const datesListFromUI = items
				.map((index, html) => Cypress.$(html).text())
				.get();
			const sortedDates = datesListFromUI.slice().sort().reverse();
			expect(
				datesListFromUI,
				'Movies are sorted by release date correctly'
			).to.deep.equal(sortedDates);
		});
	});

	it('SortControl has TITLE state after TITLE option choosen', () => {
		cy.visit('http://localhost:3000/movies');
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-release-year', { timeout: 10000 })
			.should('have.length', 50);
		cy.get('[data-testid="sort-select"]')
			.find('option')
			.then(($elm) => $elm.get(1).setAttribute('selected', 'selected'));
		cy.get('[data-testid="sort-select"]', { timeout: 10000 })
			.find(':selected')
			.contains('TITLE');
	});

	it('Sort by title works correctly', () => {
		cy.visit('http://localhost:3000/movies');
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-release-year', { timeout: 10000 })
			.should('have.length', 50);
		cy.get('[data-testid="sort-select"]')
			.find('option')
			.then(($elm) => $elm.get(1).setAttribute('selected', 'selected'));
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-title', { timeout: 10000 })
			.should('have.length', 50);
		cy.get('.movie-tile-title').then((items) => {
			const titleListFromUI = items
				.map((index, html) => Cypress.$(html).text())
				.get();
			const sortedTitles = titleListFromUI.slice().sort((t1, t2) => t1 - t2);
			expect(
				titleListFromUI,
				'Movies are sorted by title correctly'
			).to.deep.equal(sortedTitles);
		});
	});
});
