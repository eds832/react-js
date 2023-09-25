import React, { FC, useState } from 'react';

import './MovieTile.css';
import { MovieType } from './../../store/movies/types';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Button from '../Button/Button';
import PopupMenu from '../PopupMenu/PopupMenu';

interface MovieTileProps {
	movie: MovieType;
	handleEditClicked?: (movieName: string) => void;
	handleDeleteClicked?: (movieName: string) => void;
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

	const { imageUrl, movieName, releaseYear, genresList, onMovieClick } = movie;

	const onEditClicked = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		handleEditClicked(movieName);
		handleClickThreeDots(event);
	};

	const onDeleteClicked = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		handleDeleteClicked(movieName);
		handleClickThreeDots(event);
	};

	return (
		<div
			onClick={() => onMovieClick(movieName)}
			data-testid={`${movieName.replaceAll(/\s+/g, '')}-div`}
		>
			<div className='movie-img'>
				<img
					data-testid='movie-tile-img'
					className='movie-img'
					src={imageUrl}
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
						dataTestid='three-dots'
					/>
				)}
			</div>
			<div className='movie-tile-description'>
				<Typography
					type={TypographyTypes.MOVIE_TILE_TITLE}
					dataTestid='movie-tile-movie-name'
				>
					{movieName}
				</Typography>
				<div className='movie-release-year'>
					<Typography
						dataTestid='movie-tile-release-year'
						children={releaseYear}
						type={TypographyTypes.MOVIE_TILE_RELEASE_YEAR}
					/>
				</div>
				<Typography
					dataTestid='movie-tile-genres'
					type={TypographyTypes.MOVIE_GENRES}
				>
					{genresList.join(', ')}
				</Typography>
			</div>
		</div>
	);
};

export default MovieTile;
