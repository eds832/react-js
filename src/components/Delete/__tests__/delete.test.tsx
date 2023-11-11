import React from 'react';
import { render } from '@testing-library/react';

import Delete from '../Delete';

describe('Delete', () => {
	const handleDelete = jest.fn();
	it('renders correct title', () => {
		const { getByTestId } = render(<Delete handleDelete={handleDelete} />);
		expect(getByTestId('delete-title')).toHaveTextContent('DELETE MOVIE');
	});

	it('renders correct propmt', () => {
		const { getByTestId } = render(<Delete handleDelete={handleDelete} />);
		expect(getByTestId('delete-main')).toHaveTextContent(
			'Are you sure you want to delete this movie?'
		);
	});
});
