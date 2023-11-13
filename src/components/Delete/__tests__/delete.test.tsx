import React from 'react';
import { render } from '@testing-library/react';

import Delete from '../Delete';
import { BrowserRouter } from 'react-router-dom';

describe('Delete', () => {
	it('renders correct title', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<Delete />
			</BrowserRouter>
		);
		expect(getByTestId('delete-title')).toHaveTextContent('DELETE MOVIE');
	});

	it('renders correct propmt', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<Delete />
			</BrowserRouter>
		);
		expect(getByTestId('delete-main')).toHaveTextContent(
			'Are you sure you want to delete this movie?'
		);
	});
});
