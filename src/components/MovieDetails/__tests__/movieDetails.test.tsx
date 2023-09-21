import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MovieDetails from '../MovieDetails';
import { MovieType } from './../../../store/movies/types';

describe('MovieDetails', () => {
	const handleMovieClicked = jest.fn();

	const movie: MovieType = {
		imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
		movieName: 'Movie 1',
		releaseYear: 2022,
		rating: 8.9,
		duration: 177,
		description: 'A description of the movie',
		onMovieClick: handleMovieClicked,
	};

	it('renders MovieDetails with the values equal to passed in props', () => {
		const { getByTestId } = render(<MovieDetails {...movie} />);
		expect(getByTestId('movie-details-img').getAttribute('src')).toBe(
			movie.imageUrl
		);
		expect(getByTestId('movie-details-movie-name')).toHaveTextContent(
			movie.movieName
		);
		expect(getByTestId('movie-details-release-year')).toHaveTextContent(
			`Release Year: ${movie.releaseYear}`
		);
		expect(getByTestId('movie-details-rating')).toHaveTextContent(
			`Rating: ${movie.rating}`
		);
		expect(getByTestId('movie-details-duration')).toHaveTextContent(
			`Duration: ${movie.duration} min`
		);
		expect(getByTestId('movie-details-description')).toHaveTextContent(
			movie.description
		);
	});

	it('calls onMovieClick prop after clicking Go To All Movies button', () => {
		const { getByTestId } = render(<MovieDetails {...movie} />);
		const goToAllMoviesButton = getByTestId('go-to-all-movies-button');
		fireEvent.click(goToAllMoviesButton);

		expect(movie.onMovieClick).toHaveBeenCalledTimes(1);
	});
});
