import React, { FC } from 'react';

import './MovieTitle.css';
import { MovieType } from 'src/store/movies/types';

const MovieTitle: FC<MovieType> = ({
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
			<img data-testid='movie-title-img' className='movie-img' src={imageUrl} />
			<figcaption className='movie-figcaption'>
				<h2 data-testid='movie-title-movie-name'>{movieName}</h2>
				<div className='movie-release-year'>
					<p data-testid='movie-title-release-year'>{releaseYear}</p>
				</div>
				<p data-testid='movie-title-genres' className='movie-genres'>
					{genresList.join(', ')}
				</p>
			</figcaption>
		</div>
	);
};

export default MovieTitle;
