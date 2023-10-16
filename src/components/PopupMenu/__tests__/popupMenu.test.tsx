import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import PopupMenu from '../PopupMenu';

describe('PopupMenu', () => {
	const handleClickThreeDots = jest.fn();
	const onEditClicked = jest.fn();
	const onDeleteClicked = jest.fn();

	it('calls handleClickThreeDots prop when close popup button clicked', () => {
		const { getByTestId } = render(
			<PopupMenu
				handleClickThreeDots={handleClickThreeDots}
				onEditClicked={onEditClicked}
				onDeleteClicked={onDeleteClicked}
			/>
		);
		const closePopupButton = getByTestId('close-popup');
		fireEvent.click(closePopupButton);

		expect(handleClickThreeDots).toHaveBeenCalledTimes(1);
	});

	it('calls onEditClicked prop when Edit button clicked', () => {
		const { getByTestId } = render(
			<PopupMenu
				handleClickThreeDots={handleClickThreeDots}
				onEditClicked={onEditClicked}
				onDeleteClicked={onDeleteClicked}
			/>
		);
		const editButton = getByTestId('edit-popup-button');
		fireEvent.click(editButton);

		expect(onEditClicked).toHaveBeenCalledTimes(1);
	});

	it('calls onDeleteClicked prop when Delete button clicked', () => {
		const { getByTestId } = render(
			<PopupMenu
				handleClickThreeDots={handleClickThreeDots}
				onEditClicked={onEditClicked}
				onDeleteClicked={onDeleteClicked}
			/>
		);
		const deleteButton = getByTestId('delete-popup-button');
		fireEvent.click(deleteButton);

		expect(onDeleteClicked).toHaveBeenCalledTimes(1);
	});
});
