import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GenreSelect from './../GenreSelect';

describe('GenreSelect', () => {
	const genres = ['Action', 'Comedy', 'Drama'];
	const selectedGenre = 'Comedy';
	const onSelect = jest.fn();

	it('renders all genres passed in props', () => {
		const { getByText } = render(
			<GenreSelect
				genres={genres}
				selectedGenre={selectedGenre}
				onSelect={onSelect}
			/>
		);
		genres.forEach((genre) => {
			expect(getByText(genre)).toBeInTheDocument();
		});
	});

	it('highlights a selected genre passed in props', () => {
		const { getByText } = render(
			<GenreSelect
				genres={genres}
				selectedGenre={selectedGenre}
				onSelect={onSelect}
			/>
		);
		const selectedButton = getByText(selectedGenre);
		expect(selectedButton).toHaveClass('selected');
	});

	it('calls onSelect callback with correct genre after a click event on a genre button', () => {
		const { getByText } = render(
			<GenreSelect
				genres={genres}
				selectedGenre={selectedGenre}
				onSelect={onSelect}
			/>
		);
		const genreButton = getByText('Action');
		fireEvent.click(genreButton);
		expect(onSelect).toHaveBeenCalledWith('Action');
	});
});
