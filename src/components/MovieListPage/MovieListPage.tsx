import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';

import './MovieListPage.css';
import { GenreSelect, MovieGrid, MovieCounter } from '..';
import { GENRES, RELEASE_DATE } from '../../constants';
import SortControl from '../SortControl/SortControl';
import { MovieType } from '../../types/movies/types';
import Footer from '../Footer/Footer';
import UnderHeaderLine from '../UnderHeaderLine/UnderHeaderLine';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';
import Success from '../Success/Success';
import Delete from '../Delete/Delete';
import { abortController, getMovies } from '../../services';

interface MovieListPageProps {
	query: string;
	openAddDialog: boolean;
	handleCloseAddDialog: () => void;
	refreshSearch: (query: string) => void;
}

const MovieListPage: React.FC<MovieListPageProps> = ({
	query,
	openAddDialog,
	handleCloseAddDialog,
	refreshSearch,
}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (searchParams.get('query')) {
			refreshSearch(searchParams.get('query'));
		}
	}, []);

	const { movieId } = useParams();

	const [movies, setMovies] = useState([]);

	const [sortState, setSortState] = useState(
		searchParams.get('sortBy') ? searchParams.get('sortBy') : RELEASE_DATE
	);

	const handleSortChange = (sort: string) => {
		setSortState(sort);
		searchParams.set('sortBy', sort);
	};

	const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(null);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(null);
	const [count, setCount] = useState(0);

	const hadleCloseSuccessDialog = () => {
		setOpenSuccessDialog(false);
	};

	const handleMovieAddSuccess = (movie: MovieType) => {
		console.log(movie);
		handleCloseAddDialog();
		setOpenSuccessDialog(true);
	};

	const handleOpenEditDialog = (id: number) => {
		const movie = movies.find((m) => m.id === id);
		setOpenEditDialog(movie);
	};

	const hadleCloseEditDialog = () => {
		setOpenEditDialog(null);
	};

	const handleMovieEditSuccess = (movie: MovieType) => {
		console.log(movie);
		setOpenEditDialog(null);
		setOpenSuccessDialog(true);
	};

	const handleOpenDeleteDialog = (id: number) => {
		const movie = movies.find((m) => m.id === id);
		setOpenDeleteDialog(movie);
	};

	const handleCloseDeleteDialog = () => {
		setOpenDeleteDialog(null);
	};

	const handleDeleteMovie = () => {
		console.log(openDeleteDialog, 'was deleted');
		setOpenDeleteDialog(null);
	};

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
					<MovieGrid
						movies={movies}
						handleEditClicked={handleOpenEditDialog}
						handleDeleteClicked={handleOpenDeleteDialog}
					/>
				</div>
				<Footer />
			</>
		);
	};

	const openDialog =
		openAddDialog || openDeleteDialog || openEditDialog || openSuccessDialog;

	const containerClass = openDialog
		? 'container blur'
		: movieId
		? 'container details'
		: 'container';

	return (
		<>
			{openAddDialog && (
				<Dialog
					dialogClass='add'
					title='ADD MOVIE'
					onClose={handleCloseAddDialog}
				>
					<MovieForm onMovieSubmit={handleMovieAddSuccess} />
				</Dialog>
			)}

			{openEditDialog && (
				<Dialog
					dialogClass='add'
					title='EDIT MOVIE'
					onClose={hadleCloseEditDialog}
				>
					<MovieForm
						movie={openEditDialog}
						onMovieSubmit={handleMovieEditSuccess}
					/>
				</Dialog>
			)}

			{openSuccessDialog && (
				<Dialog
					dialogClass='success'
					title=''
					onClose={hadleCloseSuccessDialog}
				>
					<Success />
				</Dialog>
			)}

			{openDeleteDialog && (
				<Dialog dialogClass='delete' title='' onClose={handleCloseDeleteDialog}>
					<Delete onDelete={handleDeleteMovie} />
				</Dialog>
			)}

			<div className={containerClass}>
				<Outlet />
				<UnderHeader />
			</div>
		</>
	);
};

export default MovieListPage;
