import React, { useState } from 'react';

import './App.css';
import { Header, GenreSelect, MovieGrid, MovieCounter } from './components';
import { GENRES, RELEASE_DATE } from './constants';
import SortControl from './components/SortControl/SortControl';
import { MovieType } from './types/movies/types';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Footer from './components/Footer/Footer';
import UnderHeaderLine from './components/UnderHeaderLine/UnderHeaderLine';
import Dialog from './components/Dialog/Dialog';
import getReleaseYear from './helpers/getReleaseYear';
import MovieForm from './components/MovieForm/MovieForm';
import Success from './components/Success/Success';
import Delete from './components/Delete/Delete';

function App() {
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

	const handleOpenEditDialog = (movieName: string) => {
		console.log('Edit', movieName);
		const movie = movies.find((m) => m.movieName === movieName);
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

	const handleOpenDeleteDialog = (movieName: string) => {
		console.log('Delete', movieName);
		const movie = movies.find((m) => m.movieName === movieName);
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

	const handleMovieClicked = (clickedMovieName?: string) => {
		if (!clickedMovieName) {
			setMovie(null);
		} else {
			const chosenMovie = movies.find((m) => m.movieName === clickedMovieName);
			setMovie(chosenMovie);
		}
	};

	const [genreState, setGenreState] = useState('All');

	const handleGenreSelect = (genre: string) => {
		setGenreState(genre);
	};

	const imageUrlBase = 'https://via.placeholder.com/300x450.png?text=Movie+';

	const movieDescription = `There are many variations of passages of Lorem Ipsum available, 
	but the majority have suffered alteration in some form, by injected humour, 
	or randomised words which don't look even slightly believable. 
	If you are going to use a passage of Lorem Ipsum, 
	you need to be sure there isn't anything embarrassing hidden in the middle of text.`;

	const movies: MovieType[] = [
		{
			imageUrl: imageUrlBase + 1,
			movieName: 'Movie 1',
			releaseDate: '2018-01-02',
			genresList: ['Comedy', 'Horor', 'Crime'],
			rating: 5.4,
			duration: 110,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 2,
			movieName: 'Movie 2',
			releaseDate: '2023-02-03',
			genresList: ['Comedy'],
			rating: 5.5,
			duration: 117,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 3,
			movieName: 'Movie 3',
			releaseDate: '2019-04-03',
			genresList: ['Horor'],
			rating: 7,
			duration: 100,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 4,
			movieName: 'Movie 4',
			releaseDate: '2021-09-02',
			genresList: ['Crime'],
			rating: 9.9,
			duration: 40,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 5,
			movieName: 'Movie 5',
			releaseDate: '2022-05-11',
			genresList: ['Comedy', 'Crime'],
			rating: 8.3,
			duration: 310,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 6,
			movieName: 'Movie 6',
			releaseDate: '2020-09-12',
			genresList: ['Documentary', 'Crime'],
			rating: 7.4,
			duration: 210,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
	]
		.sort(compareMovies)
		.filter(
			(m) =>
				genreState === 'All' ||
				m.genresList.find((genre) => genre === genreState)
		);

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
					<MovieCounter />
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

	if (movie) {
		return (
			<div className='container details'>
				<MovieDetails {...movie} />
				<div className={openDialog ? 'container blur' : 'container'}>
					<UnderHeader />
				</div>
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
					<Header onAddMovieClicked={handleOpenAddDialog} />
					<UnderHeader />
				</div>
			</>
		);
	}
}

export default App;
