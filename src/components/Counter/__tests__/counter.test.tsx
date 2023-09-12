import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from '../Counter';

describe('Counter', () => {
	it('renders initial value provided in props', () => {
		const { getByText } = render(<Counter initialValue={5} />);
		expect(getByText('5')).toBeInTheDocument();
	});

	it('decrements the displayed value on click of decrement button', () => {
		const { getByText } = render(<Counter initialValue={5} />);
		const decrementButton = getByText('-');
		const value = getByText('5');

		fireEvent.click(decrementButton);

		expect(value).toHaveTextContent('4');
	});

	it('increments the displayed value on click of increment button', () => {
		const { getByText } = render(<Counter initialValue={5} />);
		const incrementButton = getByText('+ ADD MOVIE');
		const value = getByText('5');

		fireEvent.click(incrementButton);

		expect(value).toHaveTextContent('6');
	});
});
