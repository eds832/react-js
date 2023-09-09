import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import SearchForm from './../SearchForm';
import userEvent from '@testing-library/user-event';

describe('SearchForm', () => {
	const handleSearch = jest.fn();

	it('renders an input with the value equal to initial value passed in props', () => {
		const { getByDisplayValue } = render(
			<SearchForm initialQuery='test' onSearch={handleSearch} />
		);
		expect(getByDisplayValue('test')).toBeInTheDocument();
	});

	it('calls onSearch prop with proper value after clicking Submit button', () => {
		const { getByPlaceholderText, getByText } = render(
			<SearchForm initialQuery='' onSearch={handleSearch} />
		);
		const input = getByPlaceholderText('What do you want to watch...');
		const submitButton = getByText('Search');

		fireEvent.change(input, { target: { value: 'test' } });
		fireEvent.click(submitButton);

		expect(handleSearch).toHaveBeenCalledWith('test');
	});

	it('calls onSearch prop with proper value after pressing Enter key', async () => {
		const { getByPlaceholderText } = render(
			<SearchForm initialQuery='' onSearch={handleSearch} />
		);

		const input = getByPlaceholderText('What do you want to watch...');

		await act(async () => {
			await userEvent.type(input, 'test{enter}');
		});
		expect(handleSearch).toHaveBeenCalledWith('test');
	});
});
