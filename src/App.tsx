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

function App() {
	const [movie, setMovie] = useState(null);

	const [sortState, setSortState] = useState(RELEASE_DATE);

	const handleSortChange = (sort: string) => {
		setSortState(sort);
	};

	const compareMovies = (m1: MovieType, m2: MovieType) => {
		if (sortState == RELEASE_DATE) {
			if (m1.releaseYear > m2.releaseYear) {
				return -1;
			} else if (m1.releaseYear < m2.releaseYear) {
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

	const [isOpenDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const hadleCloseDialog = () => setOpenDialog(false);

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
			releaseYear: 2018,
			genresList: ['Comedy', 'Horor', 'Crime'],
			rating: 5.4,
			duration: 110,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 2,
			movieName: 'Movie 2',
			releaseYear: 2023,
			genresList: ['Comedy'],
			rating: 5.5,
			duration: 117,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 3,
			movieName: 'Movie 3',
			releaseYear: 2019,
			genresList: ['Horor'],
			rating: 7,
			duration: 100,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 4,
			movieName: 'Movie 4',
			releaseYear: 2021,
			genresList: ['Crime'],
			rating: 9.9,
			duration: 40,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 5,
			movieName: 'Movie 5',
			releaseYear: 2022,
			genresList: ['Comedy', 'Crime'],
			rating: 8.3,
			duration: 310,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 6,
			movieName: 'Movie 6',
			releaseYear: 2020,
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
						handleEditClicked={(movieName) => {
							console.log('Edit', movieName);
						}}
						handleDeleteClicked={(movieName) =>
							console.log('Delete', movieName)
						}
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
				{isOpenDialog ? (
					<div className='container blur'>
						<UnderHeader />
					</div>
				) : (
					<div className='container'>
						<UnderHeader />
					</div>
				)}
			</div>
		);
	} else {
		return (
			<>
				<Dialog
					title='EDIT MOVIE'
					onOpen={handleOpenDialog}
					onClose={hadleCloseDialog}
				>
					<p>This is the content of my dialog.</p>
				</Dialog>
				{isOpenDialog ? (
					<div className='container blur'>
						<Header />
						<UnderHeader />
					</div>
				) : (
					<div className='container'>
						<Header />
						<UnderHeader />
					</div>
				)}
			</>
		);
	}
}

export default App;
