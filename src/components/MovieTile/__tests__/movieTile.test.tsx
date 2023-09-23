import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MovieTile from '../MovieTile';
import { MovieType } from '../../../store/movies/types';

describe('MovieTile', () => {
	const handleMovieClicked = jest.fn();

	const movie: MovieType = {
		imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
		movieName: 'Movie 1',
		releaseYear: 2022,
		genresList: ['Action', 'Horror'],
		onMovieClick: handleMovieClicked,
	};

	it('renders MovieTile with the image equals to passed in props', () => {
		const { getByTestId } = render(<MovieTile {...movie} />);
		expect(getByTestId('movie-tile-img').getAttribute('src')).toBe(
			movie.imageUrl
		);
	});

	it('calls onMovieClick prop after clicking Go To All Movies button', () => {
		const { getByTestId } = render(<MovieTile {...movie} />);
		const goToMovie1Div = getByTestId('Movie1-div');
		fireEvent.click(goToMovie1Div);

		expect(movie.onMovieClick).toHaveBeenCalledTimes(1);
		expect(movie.onMovieClick).toHaveBeenCalledWith('Movie 1');
	});
});
