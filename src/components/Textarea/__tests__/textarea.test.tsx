import React from 'react';
import { act, render } from '@testing-library/react';

import Textarea, { TextAreaProps } from '../Textarea';
import userEvent from '@testing-library/user-event';

describe('Textarea', () => {
	const handleKeyDown = jest.fn();
	const handleOnChange = jest.fn();

	const val: TextAreaProps = {
		value: '7777',
		onChange: handleOnChange,
		onKeyDown: handleKeyDown,
		inputId: 'textarea-test-id',
		labelText: 'test-label-text',
		placeholderText: 'Test Placeholder',
		dataTestid: 'test-id',
		error: 'TEST Error',
	};

	it('renders Textarea with the value equals to passed in props', () => {
		const { getByTestId } = render(<Textarea {...val} />);
		expect(getByTestId('test-id')).toHaveValue('7777');
	});

	it('renders Textarea with the placeholder equals to passed in props', () => {
		const { getByTestId } = render(<Textarea {...val} value='' />);
		expect(getByTestId('test-id').getAttribute('placeholder')).toBe(
			'Test Placeholder'
		);
	});

	it('calls onKeyDown in props after clicking button 7', async () => {
		const { getByTestId } = render(<Textarea {...val} value='' />);
		const input = getByTestId('test-id');

		await act(async () => {
			await userEvent.type(input, '7');
		});
		expect(handleKeyDown).toBeCalledTimes(1);
	});

	it('calls onChange in props after clicking button 7', async () => {
		const { getByTestId } = render(<Textarea {...val} value='' />);
		const input = getByTestId('test-id');

		await act(async () => {
			await userEvent.type(input, '7');
		});
		expect(handleOnChange).toBeCalledTimes(1);
	});
});
