import React, { FC, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './MovieTile.css';
import { MovieType } from './../../types/movies/types';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Button from '../Button/Button';
import PopupMenu from '../PopupMenu/PopupMenu';
import getReleaseYear from './../../helpers/getReleaseYear';

interface MovieTileProps {
	movie: MovieType;
	handleEditClicked?: (id: number) => void;
	handleDeleteClicked?: (id: number) => void;
}

const MovieTile: FC<MovieTileProps> = ({
	movie,
	handleEditClicked,
	handleDeleteClicked,
}) => {
	const [showPopupMenu, setShowPopupMenu] = useState(false);

	const handleClickThreeDots = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		if (showPopupMenu) {
			setShowPopupMenu(false);
		} else {
			setShowPopupMenu(true);
		}
	};

	const { id, imageUrl, movieName, releaseDate, genresList } = movie;

	const onEditClicked = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		handleEditClicked(id);
		handleClickThreeDots(event);
	};

	const onDeleteClicked = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		handleDeleteClicked(id);
		handleClickThreeDots(event);
	};

	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();

	const link = `/${id}${
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

	return (
		<div onClick={() => navigate(link)} data-testid={`movie-tile-${id}-div`}>
			<div className='movie-img'>
				<img
					data-testid={'movie-tile-img-' + id}
					className='movie-img'
					src={imageUrl}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null;
						currentTarget.src =
							'https://via.placeholder.com/300x450.png?text=Movie';
					}}
				/>
				{showPopupMenu ? (
					<PopupMenu
						handleClickThreeDots={handleClickThreeDots}
						onEditClicked={onEditClicked}
						onDeleteClicked={onDeleteClicked}
					/>
				) : (
					<Button
						children='⋮'
						onClick={handleClickThreeDots}
						buttonClass='three-dots'
						dataTestid={'three-dots-' + id}
					/>
				)}
			</div>
			<div className='movie-tile-description'>
				<div className='movie-tile-title-div'>
					<Typography
						type={TypographyTypes.MOVIE_TILE_TITLE}
						dataTestid={'movie-tile-movie-id-' + id}
					>
						{movieName}
					</Typography>
				</div>
				<div className='movie-release-year'>
					<Typography
						dataTestid={'movie-tile-release-year-' + id}
						children={getReleaseYear(releaseDate)}
						type={TypographyTypes.MOVIE_TILE_RELEASE_YEAR}
					/>
				</div>
				<Typography
					dataTestid={'movie-tile-genres-' + id}
					type={TypographyTypes.MOVIE_GENRES}
				>
					{genresList.join(', ')}
				</Typography>
			</div>
		</div>
	);
};

export default MovieTile;
