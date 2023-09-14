describe('Counter', () => {
	it('increments and decrements the counter value', () => {
		cy.visit('http://localhost:3000/');
		cy.get('[data-testid="counter-value"]').should('have.text', '0');
		cy.get('[data-testid="counter-plus"]').click();
		cy.get('[data-testid="counter-value"]').should('have.text', '1');
		cy.get('[data-testid="counter-minus"]').click();
		cy.get('[data-testid="counter-value"]').should('have.text', '0');
	});
});
