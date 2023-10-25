import { TITLE } from './constants';

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
