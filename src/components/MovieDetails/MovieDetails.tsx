import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import './MovieDetails.css';
import Netflixroulette from '../Netflixroulette/Netflixroulette';
import Button from '../Button/Button';
import Typography, { TypographyTypes } from '../Typography/Typography';
import getMovieDuration from './../../helpers/getMovieDuration';
import getReleaseYear from './../../helpers/getReleaseYear';
import { getMovie } from './../../services';

const MovieDetails = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState({
		id: movieId ? +movieId : 77,
		imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie',
		movieName: 'Unknown Movie',
		releaseDate: '2000-01-01',
		rating: 5,
		duration: 60,
		description: 'Unknown',
		genresList: ['All'],
	});
	useEffect(() => {
		getMovie(movieId)
			.then((m) => [m])
			.then((mv) =>
				mv.map((m) => ({
					id: m.id,
					tagline: m.tagline,
					imageUrl: m.poster_path,
					movieName: m.title,
					releaseDate: m.release_date,
					genresList: m.genres,
					rating: m.vote_average,
					ratingCount: m.vote_count,
					budget: m.budget,
					revenue: m.revenue,
					duration: m.runtime,
					description: m.overview,
				}))
			)
			.then((m) => setMovie(m[0]))
			.catch((err) => console.log('Error fetching movie', err));
	}, [movieId]);
	const ratingString =
		movie.rating % 1 == 0 ? movie.rating + '.0' : movie.rating + '';

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

	return (
		<>
			<div className='movie-details-netflixroulette-line'>
				<Netflixroulette light='light' />
				<Link to={link}>
					<Button
						buttonClass='go-to-all-movies-button'
						children='⚲'
						dataTestid='go-to-all-movies-button'
					/>
				</Link>
			</div>
			<div className='movie-details'>
				<div className='movie-details-poster'>
					<img
						data-testid={'movie-details-img-' + movie.id}
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
							{getMovieDuration(movie.duration)}
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
