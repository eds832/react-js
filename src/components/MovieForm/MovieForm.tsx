import React, { useEffect, useState } from 'react';

import './MovieForm.css';
import Button from '../Button/Button';
import getMovieDuration from './../../helpers/getMovieDuration';
import getReleaseYear from './../../helpers/getReleaseYear';
import Input from '../Input/Input';
import TextArea from '../Textarea/Textarea';
import GenreDropdownSelect from '../GenreDropdownSelect/GenreDropdownSelect';
import Typography, { TypographyTypes } from '../Typography/Typography';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { addMovie, getMovie, updateMovie } from './../../services';

const MovieForm = () => {
	const { movieId } = useParams();

	const [newMovie, setNewMovie] = useState({
		imageUrl: '',
		movieName: '',
		releaseDate: '',
		genresList: [],
		rating: 0,
		duration: 0,
		description: '',
	});

	useEffect(() => {
		if (movieId) {
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
				.then((m) => setNewMovie(m[0]))
				.catch((err) => console.log('Error fetching movie', err));
		}
	}, [movieId]);

	useEffect(() => handleReset(), [newMovie]);

	const [searchParams, setSearchParams] = useSearchParams();

	const link = `/success${
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

	const [imageUrl, setImageUrl] = useState(newMovie.imageUrl);
	const [movieName, setMovieName] = useState(newMovie.movieName);
	const [releaseDate, setReleaseDate] = useState(newMovie.releaseDate);
	const [genresList, setGenresList] = useState(
		newMovie.genresList ? newMovie.genresList : []
	);
	const [ratingString, setRatingString] = useState(
		newMovie.rating ? newMovie.rating.toString() : ''
	);
	const [durationString, setDurationString] = useState(
		newMovie.duration ? newMovie.duration.toString() : ''
	);
	const [durationValue, setDurationValue] = useState(
		newMovie.duration ? getMovieDuration(newMovie.duration) : ''
	);
	const [description, setDescription] = useState(newMovie.description);
	const [dateType, setDateType] = useState('text');

	const [imageUrlError, setImageUrlError] = useState('');
	const [movieNameError, setMovieNameError] = useState('');
	const [releaseDateError, setReleaseDateError] = useState('');
	const [genresError, setGenresError] = useState('');
	const [ratingError, setRatingError] = useState('');
	const [durationError, setDurationError] = useState('');
	const [descriptionError, setDescriptionError] = useState('');

	const cleanErrors = () => {
		setImageUrlError('');
		setMovieNameError('');
		setReleaseDateError('');
		setGenresError('');
		setRatingError('');
		setDurationError('');
		setDescriptionError('');
	};

	const navigate = useNavigate();

	const handleSubmitMovie = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		cleanErrors();
		let isError = false;
		if (!imageUrl || imageUrl.trim().length < 5) {
			setImageUrlError('Incorrect movie image URL');
			isError = true;
		}
		if (!movieName || movieName.trim().length < 2) {
			setMovieNameError('Incorrect movie title');
			isError = true;
		}
		if (
			!releaseDate ||
			+getReleaseYear(releaseDate) < 1900 ||
			+getReleaseYear(releaseDate) > new Date().getFullYear()
		) {
			setReleaseDateError('Incorrect release date');
			isError = true;
		}
		if (genresList.length < 1) {
			setGenresError('Select at least one genre to proceed');
			isError = true;
		}
		if (!ratingString || +ratingString < 0) {
			setRatingError('Incorrect rating');
			isError = true;
		}
		if (!durationString || +durationString < 1) {
			setDurationError('Incorrect movie duration');
			isError = true;
		}
		if (!description || description.trim().length < 2) {
			setDescriptionError('Incorrect movie description');
			isError = true;
		}
		if (isError) {
			return;
		}
		const duration = +durationString;
		const rating = +ratingString;
		const updatedMovie = {
			...newMovie,
			imageUrl,
			movieName,
			releaseDate,
			genresList,
			rating,
			duration,
			description,
		};
		if (movieId) {
			updateMovie(updatedMovie);
		} else {
			addMovie(updatedMovie);
		}
		navigate(link);
		navigate(0);
	};

	const handleDurationLoseFocus = (value: string) => {
		setDurationString(value);
		setDurationValue(getMovieDuration(+value));
	};

	const handleDurationFocus = () => {
		setDurationValue(durationString);
	};

	const handleReset = () => {
		setImageUrl(newMovie.imageUrl);
		setMovieName(newMovie.movieName);
		setReleaseDate(newMovie.releaseDate);
		setGenresList(newMovie.genresList ? newMovie.genresList : []);
		setRatingString(newMovie.rating ? newMovie.rating.toString() : '');
		setDurationString(newMovie.duration ? newMovie.duration.toString() : '');
		setDurationValue(
			newMovie.duration ? getMovieDuration(newMovie.duration) : ''
		);
		setDescription(newMovie.description);
		cleanErrors();
	};

	return (
		<div className='movie-edit-form'>
			<form onSubmit={handleSubmitMovie}>
				<div className='movie-edit-form-top'>
					<div className='movie-edit-form-top-left'>
						<div>
							<Input
								dataTestid='movie-form-title-input'
								labelText='TITLE'
								value={movieName}
								placeholderText='Enter Movie Title'
								error={movieNameError}
								onChange={setMovieName}
							/>
						</div>
						<div className='edit-movie-title'>
							<Input
								dataTestid='movie-form-url-input'
								labelText='MOVIE URL'
								value={imageUrl}
								placeholderText='https://'
								error={imageUrlError}
								onChange={setImageUrl}
							/>
						</div>
						<div className='edit-movie-genre'>
							<GenreDropdownSelect
								labelText='GENRE'
								placeholderText='Select Genre'
								value={genresList}
								error={genresError}
								onSelect={setGenresList}
							/>
						</div>
					</div>
					<div className='movie-edit-form-top-right'>
						<div className='release-date-input-wrapper'>
							<Input
								dataTestid='movie-form-date-input'
								labelText='RELEASE DATE'
								value={releaseDate}
								onChange={setReleaseDate}
								onInputFocus={(e) => setDateType('date')}
								onLoseFocus={(e) => setDateType('text')}
								type={dateType}
								placeholderText='Select Date'
								error={releaseDateError}
							/>
						</div>
						<div className='edit-movie-rating'>
							<Input
								dataTestid='movie-form-rating-input'
								labelText='RATING'
								value={ratingString}
								placeholderText='7.7'
								pattern='^\d$|^\d\.$|^\d\.\d$'
								error={ratingError}
								onChange={setRatingString}
							/>
						</div>
						<div className='edit-movie-duration'>
							<Input
								dataTestid='movie-form-duration-input'
								labelText='RUNTIME'
								value={durationValue}
								onLoseFocus={handleDurationLoseFocus}
								onInputFocus={handleDurationFocus}
								placeholderText='minutes'
								pattern='^\d+$|^\d+min$|^\d+h $|^\d+h \d+min$'
								error={durationError}
								onChange={(e) => {
									setDurationValue(e);
									setDurationString(e);
								}}
							/>
						</div>
					</div>
				</div>
				<div className='movie-edit-form-textarea'>
					<TextArea
						dataTestid='movie-form-description-input'
						onChange={setDescription}
						value={description}
						labelText='OVERVIEW'
						error={descriptionError}
						placeholderText='Movie description'
					/>
				</div>
				<div className='movie-edit-form-buttons'>
					<div className='movie-edit-form-reset'>
						<Button onClick={handleReset} type='reset'>
							<Typography type={TypographyTypes.DELETE_CONFIRM}>
								RESET
							</Typography>
						</Button>
					</div>
					<div>
						<Button type='submit' dataTestid='submit-movie-form'>
							<Typography type={TypographyTypes.DELETE_CONFIRM}>
								SUBMIT
							</Typography>
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default MovieForm;
