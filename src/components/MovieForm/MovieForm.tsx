import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './MovieForm.css';
import Button from '../Button/Button';
import getMovieDuration from './../../helpers/getMovieDuration';
import Input from '../Input/Input';
import TextArea from '../Textarea/Textarea';
import GenreDropdownSelect from '../GenreDropdownSelect/GenreDropdownSelect';
import Typography, { TypographyTypes } from '../Typography/Typography';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { addMovie, getMovie, updateMovie } from './../../services';
import { MovieType } from 'src/types/movies/types';

const MovieForm = () => {
	const { movieId } = useParams();

	const [newMovie, setNewMovie] = useState({
		imageUrl: '',
		movieName: '',
		releaseDate: '',
		genresList: [],
		rating: '',
		duration: '',
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
						rating: m.vote_average?.toString(),
						ratingCount: m.vote_count,
						budget: m.budget,
						revenue: m.revenue,
						duration: m.runtime?.toString(),
						description: m.overview,
					}))
				)
				.then((m) => setNewMovie(m[0]))
				.catch((err) => console.log('Error fetching movie', err));
		}
	}, [movieId]);

	useEffect(() => resetForm(), [newMovie]);

	const [searchParams, setSearchParams] = useSearchParams();

	const link = `${
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

	const [genresList, setGenresList] = useState(
		newMovie.genresList ? newMovie.genresList : []
	);
	const [durationString, setDurationString] = useState(
		newMovie.duration ? newMovie.duration.toString() : ''
	);
	const [durationValue, setDurationValue] = useState(
		newMovie.duration ? getMovieDuration(+newMovie.duration) : ''
	);

	const [dateType, setDateType] = useState('text');

	const navigate = useNavigate();

	const handleSubmitMovieWithFormik = (movie: MovieType) => {
		if (movieId) {
			updateMovie(movie).then((id) => {
				if (id) {
					navigate(`/success${link}`);
					navigate(0);
				} else {
					navigate(`/${link}`);
					navigate(0);
				}
			});
		} else {
			addMovie(movie).then((id) => {
				if (id) {
					navigate(`/success${link}`);
					navigate(0);
				} else {
					navigate(`/${link}`);
					navigate(0);
				}
			});
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
		setDurationString(newMovie.duration ? newMovie.duration.toString() : '');
		setDurationValue(
			newMovie.duration ? getMovieDuration(+newMovie.duration) : ''
		);
		setGenresList(newMovie.genresList ? newMovie.genresList : []);
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
								error={formik.touched.movieName && formik.errors.movieName}
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
								error={formik.touched.imageUrl && formik.errors.imageUrl}
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
								value={formik.values.rating.toString()}
								placeholderText='7.7'
								pattern='^\d$|^\d\.$|^\d\.\d$'
								error={formik.touched.rating && formik.errors.rating}
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
								error={formik.touched.duration && formik.errors.duration}
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
						error={formik.touched.description && formik.errors.description}
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
