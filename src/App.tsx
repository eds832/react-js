import React, { useState } from 'react';

import './App.css';
import { Header, GenreSelect, MovieGrid, MovieCounter } from './components';
import { GENRES } from './constants';
import SortControl from './components/SortControl/SortControl';
import { MovieType } from './store/movies/types';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Footer from './components/Footer/Footer';
import UnderHeaderLine from './components/UnderHeaderLine/UnderHeaderLine';

function App() {
	const [movie, setMovie] = useState(null);

	const handleMovieClicked = (clickedMovieName?: string) => {
		if (!clickedMovieName) {
			setMovie(null);
		} else {
			const chosenMovie = movies.find((m) => m.movieName === clickedMovieName);
			setMovie(chosenMovie);
		}
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
			releaseYear: 2023,
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
			releaseYear: 2023,
			genresList: ['Horor'],
			rating: 7,
			duration: 100,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 4,
			movieName: 'Movie 4',
			releaseYear: 2023,
			genresList: ['Crime'],
			rating: 9.9,
			duration: 40,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 5,
			movieName: 'Movie 5',
			releaseYear: 2023,
			genresList: ['Comedy', 'Crime'],
			rating: 8.3,
			duration: 310,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
		{
			imageUrl: imageUrlBase + 6,
			movieName: 'Movie 6',
			releaseYear: 2023,
			genresList: ['Documentary', 'Crime'],
			rating: 7.4,
			duration: 210,
			description: movieDescription,
			onMovieClick: handleMovieClicked,
		},
	];

	const UnderHeader = () => {
		return (
			<>
				<div className='gray'></div>
				<div className='under-header'>
					<div className='under-header-controls'>
						<GenreSelect
							genres={GENRES}
							selectedGenre='All'
							onSelect={(genre) => console.log('Selected genre:', genre)}
						/>
						<SortControl
							initialValue='releaseDate'
							onChange={(value) => console.log('Selected: ' + value)}
						/>
					</div>
					<UnderHeaderLine />
					<MovieCounter />
					<MovieGrid
						movies={movies}
						onMovieClick={handleMovieClicked}
						handleEditClicked={(movieName) => console.log('Edit', movieName)}
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
				<UnderHeader />
			</div>
		);
	} else {
		return (
			<div className='container'>
				<Header />
				<UnderHeader />
			</div>
		);
	}
}

export default App;
