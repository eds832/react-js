import React, { useEffect, useState } from 'react';

import './MovieListPage.css';
import { Header, GenreSelect, MovieGrid, MovieCounter } from '..';
import { GENRES, RELEASE_DATE } from '../../constants';
import SortControl from '../SortControl/SortControl';
import { MovieType } from '../../types/movies/types';
import MovieDetails from '../MovieDetails/MovieDetails';
import Footer from '../Footer/Footer';
import UnderHeaderLine from '../UnderHeaderLine/UnderHeaderLine';
import Dialog from '../Dialog/Dialog';
import getReleaseYear from '../../helpers/getReleaseYear';
import MovieForm from '../MovieForm/MovieForm';
import Success from '../Success/Success';
import Delete from '../Delete/Delete';
import { abortController, getMovies } from '../../services';

const MovieListPage = () => {
	const [movies, setMovies] = useState([]);

	const [movie, setMovie] = useState(null);

	const [sortState, setSortState] = useState(RELEASE_DATE);

	const handleSortChange = (sort: string) => {
		setSortState(sort);
	};

	const compareMovies = (m1: MovieType, m2: MovieType) => {
		if (sortState == RELEASE_DATE) {
			const releaseYear1 = +getReleaseYear(m1.releaseDate);
			const releaseYear2 = +getReleaseYear(m2.releaseDate);
			if (releaseYear1 > releaseYear2) {
				return -1;
			} else if (releaseYear1 < releaseYear2) {
				return 1;
			}
		} else {
			if (m1.movieName < m2.movieName) {
				return -1;
			} else if (m1.movieName > m2.movieName) {
				return 1;
			}
		}
		return 0;
	};

	const [openDialog, setOpenDialog] = useState(false);
	const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(null);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(null);
	const [search, setSearch] = useState('');
	const [count, setCount] = useState(0);

	const handleOpenAddDialog = () => {
		setOpenDialog(true);
		setOpenAddDialog(true);
	};

	const hadleCloseAddDialog = () => {
		setOpenDialog(false);
		setOpenAddDialog(false);
	};

	const hadleCloseSuccessDialog = () => {
		setOpenSuccessDialog(false);
		setOpenDialog(false);
	};

	const handleMovieAddSuccess = (movie: MovieType) => {
		console.log(movie);
		setOpenAddDialog(false);
		setOpenDialog(true);
		setOpenSuccessDialog(true);
	};

	const handleOpenEditDialog = (id: number) => {
		const movie = movies.find((m) => m.id === id);
		setOpenEditDialog(movie);
		setOpenDialog(true);
	};

	const hadleCloseEditDialog = () => {
		setOpenDialog(false);
		setOpenEditDialog(null);
	};

	const handleMovieEditSuccess = (movie: MovieType) => {
		console.log(movie);
		setOpenEditDialog(null);
		setOpenDialog(true);
		setOpenSuccessDialog(true);
	};

	const handleOpenDeleteDialog = (id: number) => {
		const movie = movies.find((m) => m.id === id);
		setOpenDeleteDialog(movie);
		setOpenDialog(true);
	};

	const handleCloseDeleteDialog = () => {
		setOpenDialog(false);
		setOpenDeleteDialog(null);
	};

	const handleDeleteMovie = () => {
		console.log(openDeleteDialog, 'was deleted');
		setOpenDialog(false);
		setOpenDeleteDialog(null);
	};

	const handleMovieClicked = (id?: number) => {
		if (!id) {
			setMovie(null);
			setSearch('');
		} else {
			const chosenMovie = movies.find((m) => m.id === id);
			setMovie(chosenMovie);
		}
	};

	const [genreState, setGenreState] = useState('All');

	const handleGenreSelect = (genre: string) => {
		setGenreState(genre);
	};

	const handleSearch = (query: string) => {
		setSearch(query);
	};

	useEffect(() => {
		if (abortController) {
			abortController.abort();
		}
		getMovies(search, genreState)
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
					onMovieClick: handleMovieClicked,
				}))
			)
			.then((m) => {
				const mv = m.sort(compareMovies);
				setMovies(mv);
				setCount(mv?.length);
			})
			.catch((err) => console.log('Error fetching movies:', err));
	}, [sortState, genreState, search]);

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
						onMovieClick={handleMovieClicked}
						handleEditClicked={handleOpenEditDialog}
						handleDeleteClicked={handleOpenDeleteDialog}
					/>
				</div>
				<Footer />
			</>
		);
	};

	if (movie && !openDialog) {
		return (
			<div className='container details'>
				<MovieDetails {...movie} />
				<UnderHeader />
			</div>
		);
	} else {
		return (
			<>
				{openAddDialog && (
					<Dialog
						dialogClass='add'
						title='ADD MOVIE'
						onClose={hadleCloseAddDialog}
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
					<Dialog
						dialogClass='delete'
						title=''
						onClose={handleCloseDeleteDialog}
					>
						<Delete onDelete={handleDeleteMovie} />
					</Dialog>
				)}

				<div className={openDialog ? 'container blur' : 'container'}>
					<Header
						onAddMovieClicked={handleOpenAddDialog}
						onSearch={handleSearch}
					/>
					<UnderHeader />
				</div>
			</>
		);
	}
};

export default MovieListPage;
