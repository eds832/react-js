import React from 'react';

import './PopupMenu.css';
import Button from '../Button/Button';

interface PopupMenuProps {
	handleClickThreeDots: (event: React.MouseEvent<HTMLElement>) => void;
	onEditClicked: (event: React.MouseEvent<HTMLElement>) => void;
	onDeleteClicked: (event: React.MouseEvent<HTMLElement>) => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({
	handleClickThreeDots,
	onEditClicked,
	onDeleteClicked,
}) => {
	return (
		<ul className='popup-select'>
			<li>
				<Button
					buttonClass='close-popup'
					dataTestid='close-popup'
					onClick={handleClickThreeDots}
				>
					<span className='popup-button-close'>╳</span>
				</Button>
			</li>
			<li>
				<Button
					buttonClass='select-popup-button'
					dataTestid='edit-popup-button'
					onClick={onEditClicked}
				>
					<span className='popup-button-text'>Edit</span>
				</Button>
			</li>
			<li>
				<Button
					buttonClass='select-popup-button'
					dataTestid='delete-popup-button'
					onClick={onDeleteClicked}
				>
					<span className='popup-button-text'>Delete</span>
				</Button>
			</li>
		</ul>
	);
};

export default PopupMenu;
