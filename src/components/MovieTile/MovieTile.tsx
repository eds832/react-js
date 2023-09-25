import React, { FC, useState } from 'react';

import './MovieTile.css';
import { MovieType } from './../../store/movies/types';
import Typography, { TypographyTypes } from '../Paragraph/Typography';
import Button from '../Button/Button';

export interface MovieTileProps {
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

	const handleClickThreeDot = (event: React.MouseEvent<HTMLElement>) => {
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
		handleClickThreeDot(event);
	};

	const onDeleteClicked = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		handleDeleteClicked(movieName);
		handleClickThreeDot(event);
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
					<ul className='popup-select'>
						<li>
							<Button buttonClass='close-popup' onClick={handleClickThreeDot}>
								<span className='popup-button-close'>╳</span>
							</Button>
						</li>
						<li>
							<Button buttonClass='select-popup-button' onClick={onEditClicked}>
								<span className='popup-button-text'>Edit</span>
							</Button>
						</li>
						<li>
							<Button
								buttonClass='select-popup-button'
								onClick={onDeleteClicked}
							>
								<span className='popup-button-text'>Delete</span>
							</Button>
						</li>
					</ul>
				) : (
					<Button
						children='⋮'
						onClick={handleClickThreeDot}
						buttonClass='three-dot'
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
