import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MovieTitle from '../MovieTile';
import { MovieType } from './../../../store/movies/types';

describe('MovieDetails', () => {
	const handleMovieClicked = jest.fn();

	const movie: MovieType = {
		imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
		movieName: 'Movie 1',
		releaseYear: 2022,
		genresList: ['Action', 'Horror'],
		onMovieClick: handleMovieClicked,
	};

	it('renders MovieTitle with the values equal to passed in props', () => {
		const { getByTestId } = render(<MovieTitle {...movie} />);
		expect(getByTestId('movie-title-img').getAttribute('src')).toBe(
			movie.imageUrl
		);
		expect(getByTestId('movie-title-movie-name')).toHaveTextContent(
			movie.movieName
		);
		expect(getByTestId('movie-title-release-year')).toHaveTextContent(
			movie.releaseYear.toString()
		);
		expect(getByTestId('movie-title-genres')).toHaveTextContent(
			movie.genresList.join(', ')
		);
	});

	it('calls onMovieClick prop after clicking Go To All Movies button', () => {
		const { getByTestId } = render(<MovieTitle {...movie} />);
		const goToMovie1Div = getByTestId('Movie1-div');
		fireEvent.click(goToMovie1Div);

		expect(movie.onMovieClick).toHaveBeenCalledTimes(1);
		expect(movie.onMovieClick).toHaveBeenCalledWith('Movie 1');
	});
});
