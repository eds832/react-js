import React, { FC } from 'react';

import './MovieDetails.css';
import { MovieType } from './../../store/movies/types';

const MovieDetails: FC<MovieType> = ({
	imageUrl,
	movieName,
	releaseYear,
	rating,
	duration,
	description,
	onMovieClick,
}) => {
	return (
		<div className='movie-details'>
			<div className='movie-details-poster'>
				<img data-testid='movie-details-img' src={imageUrl} alt={movieName} />
			</div>
			<div className='movie-details-info'>
				<h2 data-testid='movie-details-movie-name'>{movieName}</h2>
				<p data-testid='movie-details-release-year'>
					<strong>Release Year:</strong> {releaseYear}
				</p>
				<p data-testid='movie-details-rating'>
					<strong>Rating:</strong> {rating}
				</p>
				<p data-testid='movie-details-duration'>
					<strong>Duration:</strong> {duration} min
				</p>
				<p data-testid='movie-details-description'>{description}</p>
				<button
					data-testid='go-to-all-movies-button'
					onClick={() => onMovieClick(null)}
				>
					Go To All Movies
				</button>
			</div>
		</div>
	);
};

export default MovieDetails;
