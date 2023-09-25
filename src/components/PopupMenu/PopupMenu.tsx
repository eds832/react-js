import React from 'react';

import './PopupMenu.css';
import Button from '../Button/Button';

interface PopupMenuProps {
	handleClickThreeDots: (event: React.MouseEvent<HTMLElement>) => void;
	onEditClicked: (event: React.MouseEvent<HTMLElement>) => void;
	onDeleteClicked: (event: React.MouseEvent<HTMLElement>) => void;
}

export const PopupMenu: React.FC<PopupMenuProps> = ({
	handleClickThreeDots,
	onEditClicked,
	onDeleteClicked,
}) => {
	return (
		<ul className='popup-select'>
			<li>
				<Button buttonClass='close-popup' onClick={handleClickThreeDots}>
					<span className='popup-button-close'>╳</span>
				</Button>
			</li>
			<li>
				<Button buttonClass='select-popup-button' onClick={onEditClicked}>
					<span className='popup-button-text'>Edit</span>
				</Button>
			</li>
			<li>
				<Button buttonClass='select-popup-button' onClick={onDeleteClicked}>
					<span className='popup-button-text'>Delete</span>
				</Button>
			</li>
		</ul>
	);
};
