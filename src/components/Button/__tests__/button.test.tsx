import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from '../Button';

describe('Button', () => {
	const handleClick = jest.fn();

	it('renders value provided in props', () => {
		const { getByTestId } = render(
			<Button children='test button' dataTestid='test' />
		);
		const button = getByTestId('test');

		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent('test button');
	});

	it('onClick provided in props called when button is clicked', () => {
		const { getByTestId } = render(
			<Button children='test button' dataTestid='test' onClick={handleClick} />
		);
		const button = getByTestId('test');

		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
