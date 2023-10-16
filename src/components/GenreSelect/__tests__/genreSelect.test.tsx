import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import GenreSelect, { GenreSelectProps } from '../GenreSelect';

describe('GenreSelect', () => {
	const props: GenreSelectProps = {
		genres: ['Action', 'Comedy', 'Drama'],
		selectedGenre: 'Comedy',
		onSelect: jest.fn(),
	};

	it('renders all genres passed in props', () => {
		const { getByTestId } = render(<GenreSelect {...props} />);
		props.genres.forEach((genre) => {
			expect(getByTestId(`${genre}-genre-button`)).toBeInTheDocument();
		});
	});

	it('highlights a selected genre passed in props', () => {
		const { getByTestId } = render(<GenreSelect {...props} />);
		const selectedButton = getByTestId(`${props.selectedGenre}-genre-button`);
		expect(selectedButton).toHaveClass('selected');
	});

	it('calls onSelect callback with correct genre after a click event on a genre button', () => {
		const { getByTestId } = render(<GenreSelect {...props} />);
		const genreButton = getByTestId('Action-genre-button');
		fireEvent.click(genreButton);
		expect(props.onSelect).toHaveBeenCalledWith('Action');
	});
});
