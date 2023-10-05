import React from 'react';
import { render } from '@testing-library/react';

import Typography, { TypographyTypes } from '../Typography';

describe('Typography', () => {
	it('renders Typography with the values equal to passed in props', () => {
		const { getByTestId } = render(
			<Typography dataTestid='test-id' type={TypographyTypes.TITLE}>
				Test <span data-testid='span-test'>Info</span>
			</Typography>
		);
		expect(getByTestId('test-id')).toHaveTextContent('Test Info');
		expect(getByTestId('span-test')).toHaveTextContent('Info');
	});
});
