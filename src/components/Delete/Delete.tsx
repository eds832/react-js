import React from 'react';

import './Delete.css';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Button from '../Button/Button';

export interface DeleteProps {
	onDelete: () => void;
}

const Delete: React.FC<DeleteProps> = ({ onDelete }) => {
	return (
		<>
			<div className='delete-title'>
				<Typography dataTestid='delete-title' type={TypographyTypes.TITLE}>
					DELETE MOVIE
				</Typography>
			</div>
			<div className='delete-main'>
				<Typography
					dataTestid='delete-main'
					type={TypographyTypes.SUCCESS_STYLE}
				>
					Are you sure you want to delete this movie?
				</Typography>
			</div>
			<Button
				dataTestid='confirm-delete'
				onClick={onDelete}
				buttonClass='confirm-delete'
			>
				<Typography type={TypographyTypes.DELETE_CONFIRM}>CONFIRM</Typography>
			</Button>
		</>
	);
};

export default Delete;
