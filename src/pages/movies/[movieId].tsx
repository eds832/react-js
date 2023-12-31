import React from 'react';

import { wrapper } from '../../redux/store';
import { api } from '../../services';
import useQuery from '../../hooks/useQuery';
import MovieContextProvider from '../../context/MovieContextProvider';
import MovieListPage from '../../components/MovieListPage/MovieListPage';
import MovieDialogContextProvider from '../../context/MovieDialogContextProvider';
import Layout from '../../components/Layout/Layout';
import { MovieType } from '../../types/movies/types';
import { TITLE } from '../../constants';
import capitalize from '../../helpers/capitalize';
import MovieDetails from '../../components/MovieDetails/MovieDetails';

const App = (props: { data: MovieType[] }) => {
	const query = useQuery();
	const movieId = query.get('movieId');
	let search = query.get('search');
	search = search !== 'undefined' ? search : '';
	let filter = query.get('filter');
	filter = filter !== 'undefined' ? filter : 'All';
	let sortBy = query.get('sortBy');
	sortBy = sortBy !== 'undefined' ? sortBy : 'release_date';
	let { data = [] } = api.useGetMoviesQuery({
		search,
		sortBy,
		filter,
	});
	let movie = api.useGetMovieByIdQuery({
		id: movieId,
	}).data;
	const compareMovies = (m1: MovieType, m2: MovieType) => {
		if (sortBy !== TITLE) {
			return m2.releaseDate.localeCompare(m1.releaseDate);
		} else {
			return m1.movieName.localeCompare(m2.movieName);
		}
	};
	movie = movie ? movie : props.data.filter((m) => m.id === +movieId)[0];
	data = data?.length
		? data
		: props.data
				.filter(
					(m) =>
						!filter ||
						filter === 'All' ||
						m.genresList.find((g) => g === capitalize(filter))
				)
				.filter(
					(m) =>
						!search ||
						search.length == 0 ||
						m.movieName.toLowerCase().includes(search.toLowerCase())
				)
				.slice(0, 50)
				.sort(compareMovies);
	return (
		<>
			<MovieContextProvider>
				<MovieDialogContextProvider>
					<Layout>
						<MovieDetails movie={movie} />
						<MovieListPage movies={data} />
					</Layout>
				</MovieDialogContextProvider>
			</MovieContextProvider>
		</>
	);
};

export default App;

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		const data = await store
			.dispatch(
				api.endpoints.getMovies.initiate({
					searchEntry: '',
					filter: 'All',
					sortBy: 'release_date',
					limit: '3000',
				})
			)
			.unwrap();
		return {
			props: { data },
		};
	}
);
