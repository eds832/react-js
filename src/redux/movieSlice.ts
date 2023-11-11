import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RELEASE_DATE } from '../constants';
import { MovieType } from '../types/movies/types';
import { api } from '../services';

export interface MoviesState {
	movie: MovieType | null;
	movies: MovieType[];
	sortBy: string;
	filter: string;
	sortOrder: string;
	limit: string;
	search: string;
}

const initialState: MoviesState = {
	movie: null,
	movies: [],
	sortBy: RELEASE_DATE,
	filter: 'All',
	sortOrder: 'desc',
	limit: '50',
	search: '',
};

const slice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSorting: (state, action: PayloadAction<string>) => {
			state.sortBy = action.payload;
		},
		setFilter: (state, action: PayloadAction<string>) => {
			state.filter = action.payload;
		},
		setMovie: (state, action: PayloadAction<MovieType>) => {
			state.movie = action.payload;
		},
		setMovies: (state, action: PayloadAction<MovieType[]>) => {
			state.movies = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(HYDRATE, (state, action: any) => {
			return {
				...state,
				...(action.payload as any)[api.reducerPath],
			};
		});
	},
});

export const moviesActions = slice.actions;
export default slice.reducer;
