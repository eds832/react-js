import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import GenreDropdownSelect, {
	GenreDropdownSelectProps,
} from '../GenreDropdownSelect';

describe('GenreDropdownSelect', () => {
	const props: GenreDropdownSelectProps = {
		labelText: 'GENRE',
		placeholderText: 'Select Genre',
		value: ['Comedy', 'Documentary'],
		error: 'Select at least one genre to proceed',
		onSelect: jest.fn(),
	};

	it('renders lable content passed in props', () => {
		const { getByTestId } = render(<GenreDropdownSelect {...props} />);
		expect(getByTestId('genre-dropdown-label')).toHaveTextContent('GENRE');
	});

	it('renders placeholder text content passed in props', () => {
		const { getByTestId } = render(<GenreDropdownSelect {...props} />);
		expect(getByTestId('genre-dropdown-select-main')).toHaveTextContent(
			'Select Genre'
		);
	});

	it('renders initially dropdown closed class', () => {
		const { getByTestId } = render(<GenreDropdownSelect {...props} />);
		expect(getByTestId('genre-dropdown-main')).toHaveClass(
			'dropdown-select-closed'
		);
	});

	it('renders dropdown open class after dropdown clicked', () => {
		const { getByTestId } = render(<GenreDropdownSelect {...props} />);
		const dropdown = getByTestId('genre-dropdown-select-main');
		fireEvent.click(dropdown);
		expect(getByTestId('genre-dropdown-main')).toHaveClass(
			'dropdown-select-opened'
		);
	});

	it('renders all genre options passed in props as checked', () => {
		const { getByTestId } = render(<GenreDropdownSelect {...props} />);
		const dropdownPlaceholder = getByTestId('genre-dropdown-select-main');
		fireEvent.click(dropdownPlaceholder);
		props.value.forEach((genre) => {
			expect(
				getByTestId(`${genre}-genre-dropdown-option`).hasAttribute('checked')
			);
		});
	});

	it('calls onSelect method in props without Comedy after dropdown Comedy checkbox clicked', () => {
		const { getByTestId } = render(<GenreDropdownSelect {...props} />);
		const dropdown = getByTestId('genre-dropdown-select-main');
		fireEvent.click(dropdown);
		const comedyOption = getByTestId('Comedy-genre-dropdown-option');
		fireEvent.click(comedyOption);
		expect(props.onSelect).toHaveBeenCalledWith(['Documentary']);
	});
});
