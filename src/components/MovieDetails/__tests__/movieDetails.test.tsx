import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MovieDetails from '../MovieDetails';
import { MovieType } from './../../../store/movies/types';

describe('MovieDetails', () => {
	const handleMovieClicked = jest.fn();

	const movie: MovieType = {
		imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
		movieName: 'Movie 1',
		releaseDate: '2022-01-01',
		rating: 8.9,
		duration: 177,
		description: 'A description of the movie',
		genresList: ['Action', 'Comedy'],
		onMovieClick: handleMovieClicked,
	};

	it('renders MovieDetails with the image equals to passed in props', () => {
		const { getByTestId } = render(<MovieDetails {...movie} />);
		expect(getByTestId('movie-details-img').getAttribute('src')).toBe(
			movie.imageUrl
		);
	});

	it('calls onMovieClick prop after clicking Go To All Movies button', () => {
		const { getByTestId } = render(<MovieDetails {...movie} />);
		const goToAllMoviesButton = getByTestId('go-to-all-movies-button');
		fireEvent.click(goToAllMoviesButton);

		expect(movie.onMovieClick).toHaveBeenCalledTimes(1);
	});
});
