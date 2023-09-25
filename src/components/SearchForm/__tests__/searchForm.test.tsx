import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import SearchForm from '../SearchForm';
import userEvent from '@testing-library/user-event';

describe('SearchForm', () => {
	const handleSearch = jest.fn();

	it('renders an input with the value equal to initial value passed in props', () => {
		const { getByTestId } = render(
			<SearchForm initialQuery='test' onSearch={handleSearch} />
		);
		expect(getByTestId('search-input')).toHaveValue('test');
	});

	it('calls onSearch prop with proper value after clicking Submit button', () => {
		const { getByTestId } = render(
			<SearchForm initialQuery='' onSearch={handleSearch} />
		);
		const input = getByTestId('search-input');
		const submitButton = getByTestId('search-button');

		fireEvent.change(input, { target: { value: 'test' } });
		fireEvent.click(submitButton);

		expect(handleSearch).toHaveBeenCalledWith('test');
	});

	it('calls onSearch prop with proper value after pressing Enter key', async () => {
		const { getByTestId } = render(
			<SearchForm initialQuery='' onSearch={handleSearch} />
		);

		const input = getByTestId('search-input');

		await act(async () => {
			await userEvent.type(input, 'test{enter}');
		});
		expect(handleSearch).toHaveBeenCalledWith('test');
	});
});
