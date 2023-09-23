import React, { FC } from 'react';

import './MovieTile.css';
import { MovieType } from 'src/store/movies/types';
import Typography, { TypographyTypes } from '../Paragraph/Typography';

const MovieTile: FC<MovieType> = ({
	imageUrl,
	movieName,
	releaseYear,
	genresList,
	onMovieClick,
}) => {
	return (
		<div
			onClick={() => onMovieClick(movieName)}
			data-testid={`${movieName.replaceAll(/\s+/g, '')}-div`}
		>
			<img data-testid='movie-tile-img' className='movie-img' src={imageUrl} />
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
