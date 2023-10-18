import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Delete, { DeleteProps } from '../Delete';

describe('Delete', () => {
	const props: DeleteProps = {
		onDelete: jest.fn(),
	};

	it('renders correct title', () => {
		const { getByTestId } = render(<Delete {...props} />);
		expect(getByTestId('delete-title')).toHaveTextContent('DELETE MOVIE');
	});

	it('renders correct propmt', () => {
		const { getByTestId } = render(<Delete {...props} />);
		expect(getByTestId('delete-main')).toHaveTextContent(
			'Are you sure you want to delete this movie?'
		);
	});

	it('calls onDelete method in props after confirm batton clicked', () => {
		const { getByTestId } = render(<Delete {...props} />);
		const confirm = getByTestId('confirm-delete');
		fireEvent.click(confirm);
		expect(props.onDelete).toHaveBeenCalledTimes(1);
	});
});
