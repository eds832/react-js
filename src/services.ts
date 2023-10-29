import { TITLE } from './constants';
import { MovieType } from './types/movies/types';

export let abortController = null;

export const getMovies = async (
	search: string,
	filter: string,
	limit: string,
	sort: string
) => {
	abortController = new AbortController();
	const url = `http://localhost:4000/movies?${
		search ? 'searchBy=title&search=' + search : ''
	}${search && filter ? '&' : ''}${filter ? 'filter=' + filter : ''}${
		(search || filter) && limit ? '&' : ''
	}${limit ? 'limit=' + limit : ''}${
		(search || filter || limit) && sort ? '&' : ''
	}
	${
		sort
			? sort == TITLE
				? 'sortBy=title&sortOrder=asc'
				: 'sortBy=release_date&sortOrder=desc'
			: ''
	}`;
	console.log('fetch', url);
	const response = await fetch(url, {
		method: 'GET',
		signal: abortController.signal,
		headers: {
			'Content-Type': 'application/json',
			accept: '*/*',
		},
	});
	if (response.ok) {
		const data = await response.json();
		abortController = null;
		return data.data;
	} else {
		console.log('fetch movies failed', response);
		return [];
	}
};

export const getMovie = async (movieId: string) => {
	const url = `http://localhost:4000/movies/${movieId}`;
	console.log('fetch', url);
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			accept: '*/*',
		},
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		console.log('fetch movie failed', response);
		return {};
	}
};

export const deleteMovie = async (movieId: string) => {
	const url = `http://localhost:4000/movies/${movieId}`;
	console.log('delete', url);
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			accept: '*/*',
		},
	});
	if (response.ok) {
		return true;
	} else {
		console.log('delete movie failed', response);
		return false;
	}
};

export const addMovie = async (movie: MovieType) => {
	const url = 'http://localhost:4000/movies';
	console.log('Post', url);
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		body: JSON.stringify({
			title: movie.movieName,
			tagline: movie.tagline,
			vote_average: +movie.rating,
			vote_count: movie.ratingCount,
			release_date: movie.releaseDate,
			poster_path: movie.imageUrl,
			overview: movie.description,
			budget: movie.budget,
			revenue: movie.revenue,
			runtime: +movie.duration,
			genres: movie.genresList,
		}),
	});
	if (response.ok) {
		const data = await response.json();
		return data?.id;
	} else {
		console.log('post movie failed', response);
		return null;
	}
};

export const updateMovie = async (movie: MovieType) => {
	const url = 'http://localhost:4000/movies';
	console.log('Put', url);
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		body: JSON.stringify({
			id: movie.id,
			title: movie.movieName,
			tagline: movie.tagline,
			vote_average: +movie.rating,
			vote_count: movie.ratingCount,
			release_date: movie.releaseDate,
			poster_path: movie.imageUrl,
			overview: movie.description,
			budget: movie.budget,
			revenue: movie.revenue,
			runtime: +movie.duration,
			genres: movie.genresList,
		}),
	});
	if (response.ok) {
		const data = await response.json();
		return data?.id;
	} else {
		console.log('put movie failed', response);
		return null;
	}
};
