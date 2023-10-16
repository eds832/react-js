import React, { FC, useState } from 'react';

import './MovieForm.css';
import { MovieType } from './../../types/movies/types';
import Button from '../Button/Button';
import getMovieDuration from './../../helpers/getMovieDuration';
import getReleaseYear from './../../helpers/getReleaseYear';
import Input from '../Input/Input';
import TextArea from '../Textarea/Textarea';
import GenreDropdownSelect from '../GenreDropdownSelect/GenreDropdownSelect';
import Typography, { TypographyTypes } from '../Typography/Typography';

export interface MovieFormProps {
	movie?: MovieType;
	onMovieSubmit: (newMovie: MovieType) => void;
}

const MovieForm: FC<MovieFormProps> = ({ movie, onMovieSubmit }) => {
	const newMovie: MovieType = movie
		? movie
		: {
				imageUrl: '',
				movieName: '',
				releaseDate: '',
				genresList: [],
				rating: 0,
				duration: 0,
				description: '',
		  };
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
		if (!ratingString || +ratingString <= 0.1) {
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
			imageUrl,
			movieName,
			releaseDate,
			genresList,
			rating,
			duration,
			description,
		};
		onMovieSubmit(updatedMovie);
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
								onChange={(e) => setMovieName(e)}
							/>
						</div>
						<div className='edit-movie-title'>
							<Input
								dataTestid='movie-form-url-input'
								labelText='MOVIE URL'
								value={imageUrl}
								placeholderText='https://'
								error={imageUrlError}
								onChange={(e) => setImageUrl(e)}
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
								onChange={(e) => setReleaseDate(e)}
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
								onChange={(e) => setRatingString(e)}
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
								pattern='^\d+$|^\d+min$|^\d+h$|^\d+h \d+min'
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
						onChange={(e) => setDescription(e)}
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
