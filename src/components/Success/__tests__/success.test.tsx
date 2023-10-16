import React from 'react';
import { render } from '@testing-library/react';

import Success from '../Success';

describe('Success', () => {
	it('renders correct title', () => {
		const { getByTestId } = render(<Success />);
		expect(getByTestId('congratulations')).toHaveTextContent(
			'CONGRATULATIONS !'
		);
	});

	it('renders correct 1-st line of propmt', () => {
		const { getByTestId } = render(<Success />);
		expect(getByTestId('success-main-1-st-p')).toHaveTextContent(
			'The movie has been added to'
		);
	});

	it('renders correct 2-nd line of propmt', () => {
		const { getByTestId } = render(<Success />);
		expect(getByTestId('success-main-2-st-p')).toHaveTextContent(
			'database successfully'
		);
	});
});
