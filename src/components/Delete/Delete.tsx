import React from 'react';

import Typography, { TypographyTypes } from '../Typography/Typography';
import Button from '../Button/Button';

interface DeleteProps {
	handleDelete: () => void;
}

const Delete: React.FC<DeleteProps> = ({ handleDelete }) => {
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
				onClick={handleDelete}
				buttonClass='confirm-delete'
			>
				<Typography type={TypographyTypes.DELETE_CONFIRM}>CONFIRM</Typography>
			</Button>
		</>
	);
};

export default Delete;
