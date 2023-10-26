import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MovieTile from '../MovieTile';
import { MovieType } from '../../../types/movies/types';

describe('MovieTile', () => {
	const handleMovieClicked = jest.fn();

	const movie: MovieType = {
		id: 99,
		imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
		movieName: 'Movie 1',
		releaseDate: '2022-01-01',
		genresList: ['Action', 'Horror'],
		onMovieClick: handleMovieClicked,
	};

	it('renders MovieTile with the image equals to passed in props', () => {
		const { getByTestId } = render(<MovieTile movie={movie} />);
		expect(getByTestId('movie-tile-img-99').getAttribute('src')).toBe(
			movie.imageUrl
		);
	});

	it('calls onMovieClick prop after clicking Movie 1 div', () => {
		const { getByTestId } = render(<MovieTile movie={movie} />);
		const movie1Div = getByTestId('movie-tile-99-div');
		fireEvent.click(movie1Div);

		expect(movie.onMovieClick).toHaveBeenCalledTimes(1);
		expect(movie.onMovieClick).toHaveBeenCalledWith(99);
	});

	it('opens popup menu after clicking three dots button', () => {
		const { getByTestId } = render(<MovieTile movie={movie} />);
		fireEvent.click(getByTestId('three-dots-99'));
		const popupMenu = getByTestId('popup-menu');

		expect(popupMenu).toBeVisible();
	});
});
