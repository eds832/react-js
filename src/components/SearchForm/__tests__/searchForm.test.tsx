import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import SearchForm from '../SearchForm';

describe('SearchForm', () => {
	const handleSearch = jest.fn();

	it('renders an input with the value equal to initial value passed in props', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<SearchForm initialQuery='test' onSearch={handleSearch} />
			</BrowserRouter>
		);
		expect(getByTestId('search-input')).toHaveValue('test');
	});

	it('calls onSearch prop with proper value after clicking Submit button', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<SearchForm initialQuery='' onSearch={handleSearch} />
			</BrowserRouter>
		);
		const input = getByTestId('search-input');
		const submitButton = getByTestId('search-button');

		fireEvent.change(input, { target: { value: 'test' } });
		fireEvent.click(submitButton);

		expect(handleSearch).toHaveBeenCalledWith('test');
	});

	it('calls onSearch prop with proper value after pressing Enter key', async () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<SearchForm initialQuery='' onSearch={handleSearch} />
			</BrowserRouter>
		);

		const input = getByTestId('search-input');

		await act(async () => {
			await userEvent.type(input, 'test{enter}');
		});
		expect(handleSearch).toHaveBeenCalledWith('test');
	});
});
