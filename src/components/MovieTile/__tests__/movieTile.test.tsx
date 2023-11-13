import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import MovieTile from '../MovieTile';
import { MovieType } from '../../../types/movies/types';

describe('MovieTile', () => {
	const movie: MovieType = {
		id: 99,
		imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie',
		movieName: 'Movie 1',
		releaseDate: '2022-01-01',
		genresList: ['Action', 'Horror'],
	};

	it('renders MovieTile with the image equals to passed in props', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<MovieTile movie={movie} />
			</BrowserRouter>
		);
		expect(getByTestId('movie-tile-img-99').getAttribute('src')).toBe(
			movie.imageUrl
		);
	});

	it('opens popup menu after clicking three dots button', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<MovieTile movie={movie} />
			</BrowserRouter>
		);
		fireEvent.click(getByTestId('three-dots-99'));
		const popupMenu = getByTestId('popup-menu');

		expect(popupMenu).toBeVisible();
	});
});
