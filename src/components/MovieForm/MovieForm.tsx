import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../Button/Button';
import getMovieDuration from './../../helpers/getMovieDuration';
import Input from '../Input/Input';
import TextArea from '../Textarea/Textarea';
import GenreDropdownSelect from '../GenreDropdownSelect/GenreDropdownSelect';
import Typography, { TypographyTypes } from '../Typography/Typography';
import { MovieType } from '../../types/movies/types';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { api } from '../../services';
import { moviesActions } from '../../redux/movieSlice';

interface MovieFormProps {
	onSuccess: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ onSuccess }) => {
	const newMovie = useAppSelector((state) => state.movies.movie);
	const [updateMovie] = api.useUpdateMovieMutation();
	const [createMovie] = api.useCreateMovieMutation();
	const dispatch = useAppDispatch();

	useEffect(() => resetForm(), [newMovie]);

	const [genresList, setGenresList] = useState(
		newMovie?.genresList ? newMovie.genresList : []
	);
	const [durationString, setDurationString] = useState(
		newMovie?.duration ? newMovie.duration.toString() : ''
	);
	const [durationValue, setDurationValue] = useState(
		newMovie?.duration ? getMovieDuration(+newMovie.duration) : ''
	);

	const [dateType, setDateType] = useState('text');

	const handleSubmitMovieWithFormik = (movie: MovieType) => {
		dispatch(moviesActions.setMovie({ id: newMovie?.id, ...movie }));
		if (movie?.id) {
			updateMovie(movie).then(() => onSuccess());
		} else {
			createMovie(movie).then(() => onSuccess());
		}
	};

	const validationSchema = Yup.object({
		imageUrl: Yup.string()
			.min(5, 'Incorrect movie image URL')
			.required('Incorrect movie image URL'),
		movieName: Yup.string()
			.min(2, 'Incorrect movie title')
			.required('Incorrect movie title'),
		releaseDate: Yup.string().required('Incorrect release date'),
		genresList: Yup.array()
			.min(1, 'Select at least one genre to proceed')
			.required(),
		rating: Yup.string().required('Incorrect rating'),
		duration: Yup.string().required('Incorrect movie duration'),
		description: Yup.string()
			.min(2, 'Incorrect movie description')
			.required('Incorrect movie description'),
	});

	const formik = useFormik({
		initialValues: { ...newMovie },
		onSubmit: handleSubmitMovieWithFormik,
		validationSchema,
	});

	useEffect(() => {
		formik.values.genresList = genresList;
		formik.values.duration = durationString;
	}, [genresList, durationString]);

	const handleDurationLoseFocus = (value: string) => {
		setDurationString(value);
		setDurationValue(getMovieDuration(+value));
	};

	const handleDurationFocus = () => {
		setDurationValue(durationString);
		formik.values.duration = durationString;
	};

	const resetForm = () => {
		formik.resetForm({ values: { ...newMovie } });
		setDurationString(newMovie?.duration ? newMovie.duration.toString() : '');
		setDurationValue(
			newMovie?.duration ? getMovieDuration(+newMovie.duration) : ''
		);
		setGenresList(newMovie?.genresList ? newMovie.genresList : []);
	};

	return (
		<div className='movie-edit-form'>
			<form onSubmit={formik.handleSubmit}>
				<div className='movie-edit-form-top'>
					<div className='movie-edit-form-top-left'>
						<div>
							<Input
								inputId='movieName'
								dataTestid='movie-form-title-input'
								labelText='TITLE'
								value={formik.values.movieName}
								placeholderText='Enter Movie Title'
								error={(
									formik.touched.movieName && formik.errors.movieName
								)?.toString()}
								directOnChange={formik.handleChange}
							/>
						</div>
						<div className='edit-movie-title'>
							<Input
								inputId='imageUrl'
								dataTestid='movie-form-url-input'
								labelText='MOVIE URL'
								value={formik.values.imageUrl}
								placeholderText='https://'
								error={(
									formik.touched.imageUrl && formik.errors.imageUrl
								)?.toString()}
								directOnChange={formik.handleChange}
							/>
						</div>
						<div className='edit-movie-genre'>
							<GenreDropdownSelect
								labelText='GENRE'
								placeholderText='Select Genre'
								value={genresList}
								error={
									formik.touched.genresList &&
									formik.errors.genresList?.toString()
								}
								onSelect={setGenresList}
							/>
						</div>
					</div>
					<div className='movie-edit-form-top-right'>
						<div className='release-date-input-wrapper'>
							<Input
								inputId='releaseDate'
								dataTestid='movie-form-date-input'
								labelText='RELEASE DATE'
								value={formik.values.releaseDate}
								directOnChange={formik.handleChange}
								onInputFocus={(e) => setDateType('date')}
								onLoseFocus={(e) => setDateType('text')}
								type={dateType}
								placeholderText='Select Date'
								error={
									formik.touched.releaseDate &&
									formik.errors.releaseDate?.toString()
								}
							/>
						</div>
						<div className='edit-movie-rating'>
							<Input
								inputId='rating'
								dataTestid='movie-form-rating-input'
								labelText='RATING'
								value={formik.values.rating?.toString()}
								placeholderText='7.7'
								pattern='^\d$|^\d\.$|^\d\.\d$'
								error={(
									formik.touched.rating && formik.errors.rating
								)?.toString()}
								directOnChange={formik.handleChange}
							/>
						</div>
						<div className='edit-movie-duration'>
							<Input
								inputId='duration'
								dataTestid='movie-form-duration-input'
								labelText='RUNTIME'
								value={durationValue}
								onLoseFocus={handleDurationLoseFocus}
								onInputFocus={handleDurationFocus}
								placeholderText='minutes'
								pattern='^\d+$|^\d+min$|^\d+h $|^\d+h \d+min$'
								error={(
									formik.touched.duration && formik.errors.duration
								)?.toString()}
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
						inputId='description'
						dataTestid='movie-form-description-input'
						directOnChange={formik.handleChange}
						value={formik.values.description}
						labelText='OVERVIEW'
						error={(
							formik.touched.description && formik.errors.description
						)?.toString()}
						placeholderText='Movie description'
					/>
				</div>
				<div className='movie-edit-form-buttons'>
					<div className='movie-edit-form-reset'>
						<Button type='reset' onClick={resetForm}>
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
