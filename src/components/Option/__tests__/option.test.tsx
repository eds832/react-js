import React from 'react';
import { render } from '@testing-library/react';

import Option from '../Option';

describe('Option', () => {
	it('renders Option with the values similar to passed in props', () => {
		const { getByTestId } = render(
			<Option
				value='testVal'
				dataTestid='test-val-option'
				textContent='TEST VAL'
			/>
		);
		expect(getByTestId('test-val-option')).toHaveTextContent('TEST VAL');
	});
});
