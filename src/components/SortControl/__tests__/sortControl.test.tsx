import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SortControl from '../SortControl';

describe('SortControl', () => {
	const handleChange = jest.fn();

	beforeEach(() => {
		handleChange.mockClear();
	});

	it('renders the label and initial value of the select', () => {
		const { getByTestId } = render(
			<SortControl initialValue='releaseDate' onChange={handleChange} />
		);

		expect(getByTestId('sort-control-label')).toHaveTextContent('SORT BY');
		expect(getByTestId('sort-select')).toHaveValue('releaseDate');
	});

	it('calls the onChange callback when the select value changes', () => {
		const { getByTestId } = render(
			<SortControl initialValue='releaseDate' onChange={handleChange} />
		);

		fireEvent.change(getByTestId('sort-select'), {
			target: { value: 'title' },
		});

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith('title');
	});
});
