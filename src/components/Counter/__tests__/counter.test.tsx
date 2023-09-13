import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from '../Counter';

describe('Counter', () => {
	it('renders initial value provided in props', () => {
		const { getByTestId } = render(<Counter initialValue={5} />);
		expect(getByTestId('counter-value')).toBeInTheDocument();
	});

	it('decrements the displayed value on click of decrement button', () => {
		const { getByTestId } = render(<Counter initialValue={5} />);
		const decrementButton = getByTestId('counter-minus');
		const value = getByTestId('counter-value');

		fireEvent.click(decrementButton);

		expect(value).toHaveTextContent('4');
	});

	it('increments the displayed value on click of increment button', () => {
		const { getByTestId } = render(<Counter initialValue={5} />);
		const incrementButton = getByTestId('counter-plus');
		const value = getByTestId('counter-value');

		fireEvent.click(incrementButton);

		expect(value).toHaveTextContent('6');
	});
});
