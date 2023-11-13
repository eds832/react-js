import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import './MovieListPage.css';
import { GenreSelect, MovieGrid, MovieCounter } from '..';
import { GENRES, RELEASE_DATE } from '../../constants';
import SortControl from '../SortControl/SortControl';
import Footer from '../Footer/Footer';
import UnderHeaderLine from '../UnderHeaderLine/UnderHeaderLine';
import { abortController, getMovies } from '../../services';

interface MovieListPageProps {
	query: string;
	refreshSearch: (query: string) => void;
}

const MovieListPage: React.FC<MovieListPageProps> = ({
	query,
	refreshSearch,
}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (searchParams.get('query')) {
			refreshSearch(searchParams.get('query'));
		}
	}, []);

	const [movies, setMovies] = useState([]);

	const [sortState, setSortState] = useState(
		searchParams.get('sortBy') ? searchParams.get('sortBy') : RELEASE_DATE
	);

	const handleSortChange = (sort: string) => {
		setSortState(sort);
		searchParams.set('sortBy', sort);
	};

	const [count, setCount] = useState(0);

	const [genreState, setGenreState] = useState(
		searchParams.get('genre') ? searchParams.get('genre') : 'All'
	);

	const handleGenreSelect = (genre: string) => {
		setGenreState(genre);
	};

	useEffect(() => {
		if (query) {
			searchParams.set('query', query);
			searchParams.set('searchBy', 'title');
		} else {
			searchParams.delete('query');
			searchParams.delete('searchBy');
		}
		if (genreState !== 'All') {
			searchParams.set('genre', genreState);
		} else {
			searchParams.delete('genre');
		}
		searchParams.set('sortBy', sortState);
		searchParams.set('limit', '50');
		setSearchParams(searchParams);

		if (abortController) {
			abortController.abort();
		}
		getMovies(
			searchParams.get('query'),
			searchParams.get('genre'),
			searchParams.get('limit'),
			searchParams.get('sortBy')
		)
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
			.then((mv) => {
				setMovies(mv);
				setCount(mv?.length);
			})
			.catch((err) => console.log('Error fetching movies:', err));
	}, [sortState, genreState, query]);

	const UnderHeader = () => {
		return (
			<>
				<div className='gray'></div>
				<div className='under-header'>
					<div className='under-header-controls'>
						<GenreSelect
							genres={GENRES}
							selectedGenre={genreState}
							onSelect={handleGenreSelect}
						/>
						<SortControl initialValue={sortState} onChange={handleSortChange} />
					</div>
					<UnderHeaderLine />
					<MovieCounter count={count} />
					<MovieGrid movies={movies} />
				</div>
				<Footer />
			</>
		);
	};

	return (
		<>
			<Outlet />
			<UnderHeader />
		</>
	);
};

export default MovieListPage;
