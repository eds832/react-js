import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import './Delete.css';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Button from '../Button/Button';
import { deleteMovie } from './../../services';

const Delete = () => {
	const { movieId } = useParams();

	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();

	const link = `/${
		searchParams.get('query') ||
		searchParams.get('genre') ||
		searchParams.get('limit') ||
		searchParams.get('sortBy')
			? '?'
			: ''
	}${
		searchParams.get('query')
			? 'searchBy=title&query=' + searchParams.get('query')
			: ''
	}${searchParams.get('query') && searchParams.get('genre') ? '&' : ''}${
		searchParams.get('genre') ? 'genre=' + searchParams.get('genre') : ''
	}${
		(searchParams.get('query') || searchParams.get('genre')) &&
		searchParams.get('limit')
			? '&'
			: ''
	}${searchParams.get('limit') ? 'limit=' + searchParams.get('limit') : ''}${
		(searchParams.get('query') ||
			searchParams.get('genre') ||
			searchParams.get('limit')) &&
		searchParams.get('sortBy')
			? '&'
			: ''
	}${searchParams.get('sortBy') ? 'sortBy=' + searchParams.get('sortBy') : ''}`;

	const handleDelete = () => {
		deleteMovie(movieId);
		navigate(link);
		navigate(0);
	};
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
