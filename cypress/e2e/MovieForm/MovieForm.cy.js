describe('MovieForm', () => {
	it('opens a dialog with empty movie form after navigating the "/new" link', () => {
		cy.visit('http://localhost:3000/new');
		cy.get('[data-testid="dialog-title"]').should('have.text', 'ADD MOVIE');
		cy.get('[data-testid="genre-dropdown-select-main"]').click();
		cy.get('[data-testid="movie-form-title-input"]').should('have.value', '');
		cy.get('[data-testid="movie-form-url-input"]').should('have.value', '');
		cy.get('[data-testid="Documentary-genre-dropdown-option"]').should(
			'not.be.checked'
		);
		cy.get('[data-testid="Comedy-genre-dropdown-option"]').should(
			'not.be.checked'
		);
		cy.get('[data-testid="Horror-genre-dropdown-option"]').should(
			'not.be.checked'
		);
		cy.get('[data-testid="Crime-genre-dropdown-option"]').should(
			'not.be.checked'
		);
		cy.get('[data-testid="movie-form-description-input"]').should(
			'have.text',
			''
		);
		cy.get('[data-testid="movie-form-date-input"]').should('have.value', '');
		cy.get('[data-testid="movie-form-rating-input"]').should('have.value', '');
		cy.get('[data-testid="movie-form-duration-input"]').should(
			'have.value',
			''
		);
	});

	it('selecting "Edit" from a movie context menu opens a dialog with pre-populated movie details', () => {
		cy.visit('http://localhost:3000/354912/edit');
		cy.get('[data-testid="dialog-title"]').should('have.text', 'EDIT MOVIE');
		cy.get('[data-testid="genre-dropdown-select-main"]').click();
		cy.get('[data-testid="movie-form-title-input"]').should(
			'have.value',
			'Coco'
		);
		cy.get('[data-testid="movie-form-url-input"]').should(
			'have.value',
			'https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg'
		);
		cy.get('[data-testid="Documentary-genre-dropdown-option"]').should(
			'not.be.checked'
		);
		cy.get('[data-testid="Comedy-genre-dropdown-option"]').should('be.checked');
		cy.get('[data-testid="Horror-genre-dropdown-option"]').should(
			'not.be.checked'
		);
		cy.get('[data-testid="Crime-genre-dropdown-option"]').should(
			'not.be.checked'
		);

		cy.get('[data-testid="movie-form-description-input"]').should(
			'have.value',
			`Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.`
		);
		cy.get('[data-testid="movie-form-date-input"]').should(
			'have.value',
			'2017-10-27'
		);
		cy.get('[data-testid="movie-form-rating-input"]').should(
			'have.value',
			'7.8'
		);
		cy.get('[data-testid="movie-form-duration-input"]').should(
			'have.value',
			'1h 45min'
		);
	});

	it('verify that a movie appears in the list after its addition', () => {
		cy.visit('http://localhost:3000/new');
		cy.get('[data-testid="dialog-title"]').should('have.text', 'ADD MOVIE');
		const id = Cypress._.random(0, 1e6);
		const testname = `testname${id}`;
		cy.get('[data-testid="movie-form-title-input"]').type(testname);
		cy.get('[data-testid="movie-form-url-input"]').type(
			'https://via.placeholder.com/300x450.png?text=Movie'
		);
		cy.get('[data-testid="movie-form-description-input"]').type(
			'Test description.'
		);
		cy.get('[data-testid="genre-dropdown-select-main"]').click();
		cy.get('[data-testid="Comedy-genre-dropdown-option"]').check({
			force: true,
		});
		cy.get('[data-testid="movie-form-date-input"]').type('2023-01-01');
		cy.get('[data-testid="movie-form-rating-input"]').type('7.7');
		cy.get('[data-testid="movie-form-duration-input"]').type('100{enter}');
		cy.get('[data-testid="congratulations"]', { timeout: 10000 }).should(
			'have.text',
			'CONGRATULATIONS !'
		);
		cy.get('[data-testid="close-dialog"]', { timeout: 10000 }).click();
		cy.visit(
			`http://localhost:3000/?limit=50&sortBy=RELEASE+DATE&query=${testname}&searchBy=title`
		);
		cy.get('[data-testid="movie-grid"]')
			.find('.movie-tile-title-div', { timeout: 10000 })
			.should('have.length', 1);
		cy.get('.movie-tile-title-div').each(($item) => {
			cy.wrap($item).should('include.text', `${testname}`);
		});
	});
});
