import { HYDRATE } from 'next-redux-wrapper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import convertToMovieType from './helpers/convertToMovieType';
import convertFromMovieType from './helpers/convertFromMovieType';
import { TITLE } from './constants';
import { MovieType } from './types/movies/types';

interface ApiProps {
	movieId?: string;
	searchEntry?: string;
	sortBy?: string;
	filter?: string;
	limit?: string;
	search?: string;
}

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
	tagTypes: ['Movies'],
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath];
		}
	},
	endpoints: (builder) => ({
		getMovies: builder.query<any, ApiProps>({
			query: (arg) => {
				const { sortBy, filter, limit, search } = arg;
				const path = 'movies?';
				const searchParams = new URLSearchParams('');
				filter !== 'All' ? searchParams.append('filter', filter) : undefined;
				sortBy === TITLE
					? searchParams.append('sortBy', TITLE.toLowerCase())
					: searchParams.append('sortBy', 'release_date');
				sortBy === TITLE
					? searchParams.append('sortOrder', 'asc')
					: searchParams.append('sortOrder', 'desc');
				search ? searchParams.append('search', search) : undefined;
				limit
					? searchParams.append('limit', limit)
					: searchParams.append('limit', '50');
				searchParams.append('searchBy', 'title');
				return path.concat(searchParams.toString());
			},
			providesTags: ['Movies'],
			transformResponse: (response: { data: MovieType[] }) =>
				response.data.map((mv) => convertToMovieType(mv)),
		}),
		getMovieById: builder.query<any, any>({
			query: (id: string | number) => `movies/${+id}`,
			transformResponse: (response: MovieType) => convertToMovieType(response),
		}),
		createMovie: builder.mutation<MovieType, Omit<MovieType, 'id'>>({
			query(data) {
				const { ...body } = convertFromMovieType(data);
				return {
					url: 'movies',
					method: 'POST',
					body,
				};
			},
			invalidatesTags: [{ type: 'Movies' }],
		}),
		updateMovie: builder.mutation<MovieType, MovieType>({
			query(data) {
				const { ...body } = convertFromMovieType(data);
				return {
					url: 'movies',
					method: 'PUT',
					body,
				};
			},
			invalidatesTags: [{ type: 'Movies' }],
		}),
		deleteMovie: builder.mutation<{ success: boolean; id: number }, number>({
			query(id) {
				return {
					url: `movies/${id}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: (movie) => [{ type: 'Movies', id: movie.id }],
		}),
	}),
});
