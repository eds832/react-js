import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import Netflixroulette from '../Netflixroulette/Netflixroulette';
import Button from '../Button/Button';
import Typography, { TypographyTypes } from '../Typography/Typography';
import getMovieDuration from './../../helpers/getMovieDuration';
import getReleaseYear from './../../helpers/getReleaseYear';
import useQuery from '../../hooks/useQuery';
import { MovieType } from '../../types/movies/types';

interface MovieDetailsProps {
	movie: MovieType;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
	const router = useRouter();
	const q = useQuery();
	const { query } = router;

	const handleGoToAllMoviesClick = () => {
		q.delete('movie');
		delete query.movieId;
		router.replace({
			pathname: '/movies',
			query: { ...query },
		});
	};

	const ratingString =
		+movie.rating % 1 == 0 ? movie.rating + '.0' : movie.rating + '';
	return (
		<>
			<div className='movie-details-netflixroulette-line'>
				<Netflixroulette light='light' />
				<Button
					onClick={handleGoToAllMoviesClick}
					buttonClass='go-to-all-movies-button'
					children='⚲'
					dataTestid='go-to-all-movies-button'
				/>
			</div>
			<div className='movie-details'>
				<div className='movie-details-poster'>
					<img
						data-testid={'movie-details-img'}
						src={movie.imageUrl}
						alt={movie.movieName}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null;
							currentTarget.src =
								'https://via.placeholder.com/300x450.png?text=Movie';
						}}
					/>
				</div>
				<div className='movie-details-info'>
					<div className='movie-details-title-and-rating'>
						<div className='movie-details-title-div'>
							<Typography
								dataTestid={'movie-details-movie-name-' + movie.id}
								type={TypographyTypes.TITLE}
							>
								{movie.movieName}
							</Typography>
						</div>
						<div className='movie-details-rating-div'>
							<Typography
								dataTestid={'movie-details-rating-' + movie.id}
								type={TypographyTypes.MOVIE_DETAILS_RATING}
							>
								{ratingString}
							</Typography>
						</div>
					</div>
					<div className='movie-details-genres-div'>
						<Typography
							type={TypographyTypes.MOVIE_DETAILS_GENRES}
							children={movie.genresList?.join(' & ')}
						/>
					</div>
					<div className='movie-details-release-year-and-duration-div'>
						<Typography
							dataTestid={'movie-details-release-year-' + movie.id}
							type={TypographyTypes.MOVIE_DETAILS_RELEASE_YEAR_AND_DURATION}
						>
							{getReleaseYear(movie.releaseDate)}
						</Typography>
						<Typography
							dataTestid={'movie-details-duration-' + movie.id}
							type={TypographyTypes.MOVIE_DETAILS_RELEASE_YEAR_AND_DURATION}
						>
							{getMovieDuration(+movie.duration)}
						</Typography>
					</div>
					<Typography
						dataTestid={'movie-details-description-' + movie.id}
						type={TypographyTypes.MOVIE_DETILES_DESCRITION}
					>
						{movie.description}
					</Typography>
				</div>
			</div>
		</>
	);
};

export default MovieDetails;
