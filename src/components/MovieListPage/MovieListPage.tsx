import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { GenreSelect, MovieGrid, MovieCounter } from '..';
import { GENRES, RELEASE_DATE, TITLE } from '../../constants';
import SortControl from '../SortControl/SortControl';
import Footer from '../Footer/Footer';
import UnderHeaderLine from '../UnderHeaderLine/UnderHeaderLine';
import { MovieType } from '../../types/movies/types';

interface MovieListPageProps {
	movies: MovieType[];
}

const MovieListPage: React.FC<MovieListPageProps> = ({ movies }) => {
	const router = useRouter();
	const { query } = router;
	const { sortBy, filter } = query;

	const [sortState, setSortState] = useState(
		sortBy === TITLE ? sortBy : RELEASE_DATE
	);

	const handleSortChange = (sort: string) => {
		router.replace({
			query: { ...query, sortBy: sort },
		});
		setSortState(sort);
	};

	const [genreState, setGenreState] = useState(filter ? filter : 'All');

	const handleGenreSelect = (genre: string) => {
		router.replace({
			query: { ...query, filter: genre },
		});
		setGenreState(genre);
	};

	const UnderHeader = () => {
		return (
			<>
				<div className='gray'></div>
				<div className='under-header'>
					<div className='under-header-controls'>
						<GenreSelect
							genres={GENRES}
							selectedGenre={genreState.toString()}
							onSelect={handleGenreSelect}
						/>
						<SortControl initialValue={sortState} onChange={handleSortChange} />
					</div>
					<UnderHeaderLine />
					<MovieCounter count={movies?.length} />
					<MovieGrid movies={movies} />
				</div>
				<Footer />
			</>
		);
	};

	return (
		<>
			<UnderHeader />
		</>
	);
};

export default MovieListPage;
