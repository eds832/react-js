import React from 'react';
import { act, render } from '@testing-library/react';

import Input, { InputProps } from '../Input';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
	const handleKeyDown = jest.fn();
	const handleOnChange = jest.fn();

	const val: InputProps = {
		value: '7777',
		onChange: handleOnChange,
		onKeyDown: handleKeyDown,
		inputId: 'input-test-id',
		labelText: 'test-label-text',
		type: 'number',
		size: 40,
		placeholderText: 'Test Placeholder',
		dataTestid: 'test-id',
		inputClassName: 'test-class',
		error: 'TEST Error',
	};

	it('renders Input with the value equals to passed in props', () => {
		const { getByTestId } = render(<Input {...val} />);
		expect(getByTestId('test-id')).toHaveValue(7777);
	});

	it('renders Input with the placeholder equals to passed in props', () => {
		const { getByTestId } = render(<Input {...val} value='' />);
		expect(getByTestId('test-id').getAttribute('placeholder')).toBe(
			'Test Placeholder'
		);
	});

	it('renders Input with size equals to passed in props', () => {
		const { getByTestId } = render(<Input {...val} />);
		expect(getByTestId('test-id').getAttribute('size')).toBe('40');
	});

	it('calls onKeyDown prop after clicking button 7', async () => {
		const { getByTestId } = render(<Input {...val} value='' />);
		const input = getByTestId('test-id');

		await act(async () => {
			await userEvent.type(input, '7');
		});
		expect(handleKeyDown).toBeCalledTimes(1);
	});

	it('calls onChange prop after clicking button 7', async () => {
		const { getByTestId } = render(<Input {...val} value='' />);
		const input = getByTestId('test-id');

		await act(async () => {
			await userEvent.type(input, '7');
		});
		expect(handleOnChange).toBeCalledTimes(1);
	});
});
