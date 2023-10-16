import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MovieForm, { MovieFormProps } from '../MovieForm';
import { MovieType } from '../../movies/types';

describe('MovieForm', () => {
	const handleMovieSubmitClicked = jest.fn();

	const movie: MovieType = {
		imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
		movieName: 'Movie 1',
		releaseDate: '2022-01-01',
		genresList: ['Action', 'Horror'],
		rating: 7.7,
		duration: 100,
		description: 'Movie description',
	};

	const props: MovieFormProps = {
		movie: movie,
		onMovieSubmit: handleMovieSubmitClicked,
	};

	it('renders MovieForm with image equals to passed in props', () => {
		const { getByTestId } = render(<MovieForm {...props} />);
		expect(getByTestId('movie-form-url-input')).toHaveValue(movie.imageUrl);
	});

	it('renders MovieForm with title equals to passed in props', () => {
		const { getByTestId } = render(<MovieForm {...props} />);
		expect(getByTestId('movie-form-title-input')).toHaveValue(movie.movieName);
	});

	it('renders MovieForm with release date equals to passed in props', () => {
		const { getByTestId } = render(<MovieForm {...props} />);
		expect(getByTestId('movie-form-date-input')).toHaveValue(movie.releaseDate);
	});

	it('renders MovieForm with rating equals to passed in props', () => {
		const { getByTestId } = render(<MovieForm {...props} />);
		expect(getByTestId('movie-form-rating-input')).toHaveValue(
			movie.rating.toString()
		);
	});

	it('renders MovieForm with duration equals to passed in props', () => {
		const { getByTestId } = render(<MovieForm {...props} />);
		expect(getByTestId('movie-form-duration-input')).toHaveValue('1h 40min');
	});

	it('renders MovieForm with description equals to passed in props', () => {
		const { getByTestId } = render(<MovieForm {...props} />);
		expect(getByTestId('movie-form-description-input')).toHaveValue(
			movie.description
		);
	});

	it('calls onMovieSubmit from props with movie after clicking submit button', () => {
		const { getByTestId } = render(<MovieForm {...props} />);
		const submit = getByTestId('submit-movie-form');
		fireEvent.click(submit);

		expect(handleMovieSubmitClicked).toHaveBeenCalledTimes(1);
		expect(handleMovieSubmitClicked).toHaveBeenCalledWith(movie);
	});
});
