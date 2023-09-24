import React, { useState } from 'react';

import './App.css';
import { Header, GenreSelect, MovieGrid, MovieCounter } from './components';
import { GENRES } from './constants';
import SortControl from './components/SortControl/SortControl';
import { MovieType } from './store/movies/types';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Footer from './components/Footer/Footer';

const genres = GENRES.filter((m) => m !== 'All');

const randomGenerator = () => Math.floor(Math.random() * genres.length);

const generateMovieGenres = () => {
	let movieGenresLength = randomGenerator();
	movieGenresLength = movieGenresLength === 0 ? 1 : movieGenresLength;
	const genresList: string[] = [];
	for (let i = 0; i < movieGenresLength; i++) {
		const genre = genres[randomGenerator()];
		if (!genresList.find((m) => m === genre)) {
			genresList.push(genre);
		}
	}
	return genresList;
};

function App() {
	const [name, setMovie] = useState(null);

	const handleMovieClicked = (clickedMovieName?: string) => {
		if (!clickedMovieName) {
			setMovie(null);
		} else {
			setMovie(clickedMovieName);
		}
	};

	const movies: MovieType[] = Array.from(Array(6).keys()).map((num) => {
		const showNum = num + 1;
		return {
			imageUrl: `https://via.placeholder.com/300x450.png?text=Movie+${showNum}`,
			movieName: `Movie ${showNum}`,
			releaseYear: 2023 - num,
			genresList: generateMovieGenres(),
			rating: Math.floor(Math.random() * 90) / 10 + 1,
			duration: Math.floor(Math.random() * 200) + 30,
			description: `There are many variations of passages of Lorem Ipsum available, 
			but the majority have suffered alteration in some form, by injected humour, 
			or randomised words which don't look even slightly believable. 
			If you are going to use a passage of Lorem Ipsum, 
			you need to be sure there isn't anything embarrassing hidden in the middle of text.`,
			onMovieClick: handleMovieClicked,
		};
	});

	const movie = movies.find((m) => m.movieName === name);

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
					<MovieCounter />
					<MovieGrid movies={movies} onMovieClick={handleMovieClicked} />
				</div>
				<Footer />
			</>
		);
	};

	if (name) {
		return (
			<div className='container details'>
				<MovieDetails
					imageUrl={movie.imageUrl}
					movieName={movie.movieName}
					releaseYear={movie.releaseYear}
					genresList={movie.genresList}
					rating={movie.rating}
					duration={movie.duration}
					description={movie.description}
					onMovieClick={movie.onMovieClick}
				/>
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
