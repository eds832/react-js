import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import MovieDetails from '../MovieDetails';

describe('MovieDetails', () => {
	it('renders MovieDetails with the image equals to default', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<MovieDetails />
			</BrowserRouter>
		);
		expect(getByTestId('movie-details-img-77').getAttribute('src')).toBe(
			'https://via.placeholder.com/300x450.png?text=Movie'
		);
	});
});
