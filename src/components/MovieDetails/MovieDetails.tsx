import React, { FC } from 'react';

import './MovieDetails.css';
import { MovieType } from './../../types/movies/types';
import Netflixroulette from '../Netflixroulette/Netflixroulette';
import Button from '../Button/Button';
import Typography, { TypographyTypes } from '../Typography/Typography';
import getMovieDuration from './../../helpers/getMovieDuration';

const MovieDetails: FC<MovieType> = ({
	imageUrl,
	movieName,
	releaseYear,
	genresList,
	rating,
	duration,
	description,
	onMovieClick,
}) => {
	const ratingString = rating % 1 == 0 ? rating + '.0' : rating.toString();

	return (
		<>
			<div className='movie-details-netflixroulette-line'>
				<Netflixroulette light='light' />
				<Button
					buttonClass='go-to-all-movies-button'
					children='⚲'
					dataTestid='go-to-all-movies-button'
					onClick={() => onMovieClick(null)}
				/>
			</div>
			<div className='movie-details'>
				<div className='movie-details-poster'>
					<img data-testid='movie-details-img' src={imageUrl} alt={movieName} />
				</div>
				<div className='movie-details-info'>
					<div className='movie-details-title-and-rating'>
						<div className='movie-details-title-div'>
							<Typography
								dataTestid='movie-details-movie-name'
								type={TypographyTypes.TITLE}
							>
								{movieName}
							</Typography>
						</div>
						<div className='movie-details-rating-div'>
							<Typography
								dataTestid='movie-details-rating'
								type={TypographyTypes.MOVIE_DETAILS_RATING}
							>
								{ratingString}
							</Typography>
						</div>
					</div>
					<div className='movie-details-genres-div'>
						<Typography
							type={TypographyTypes.MOVIE_DETAILS_GENRES}
							children={genresList.join(' & ')}
						/>
					</div>
					<div className='movie-details-release-year-and-duration-div'>
						<Typography
							dataTestid='movie-details-release-year'
							type={TypographyTypes.MOVIE_DETAILS_RELEASE_YEAR_AND_DURATION}
						>
							{releaseYear}
						</Typography>
						<Typography
							dataTestid='movie-details-duration'
							type={TypographyTypes.MOVIE_DETAILS_RELEASE_YEAR_AND_DURATION}
						>
							{getMovieDuration(duration)}
						</Typography>
					</div>
					<Typography
						dataTestid='movie-details-description'
						type={TypographyTypes.MOVIE_DETILES_DESCRITION}
					>
						{description}
					</Typography>
				</div>
			</div>
		</>
	);
};

export default MovieDetails;
