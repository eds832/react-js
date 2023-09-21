import React, { useState } from 'react';

import './MovieGrid.css';
import MovieTitle from '../MovieTile/MovieTile';
import { GENRES } from './../../constants';
import { MovieType } from 'src/store/movies/types';
import MovieDetails from '../MovieDetails/MovieDetails';

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

const MovieGrid = () => {
	const [name, setMovie] = useState(null);

	const handleMovieClicked = (clickedMovieName?: string) => {
		if (!clickedMovieName) {
			setMovie(null);
		} else {
			setMovie(clickedMovieName);
		}
	};

	const movies: MovieType[] = Array.from(Array(6).keys()).map((number) => {
		const showNum = number + 1;
		return {
			imageUrl: `https://via.placeholder.com/300x450.png?text=Movie+${showNum}`,
			movieName: `Movie ${showNum}`,
			releaseYear: 2023 - number,
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

	if (!name) {
		return (
			<div className='movie-grid'>
				{movies.map(
					({ imageUrl, movieName, releaseYear, genresList, onMovieClick }) => (
						<MovieTitle
							imageUrl={imageUrl}
							movieName={movieName}
							releaseYear={releaseYear}
							genresList={genresList}
							onMovieClick={onMovieClick}
						/>
					)
				)}
			</div>
		);
	} else {
		const movie = movies.find((m) => m.movieName === name);
		return (
			<MovieDetails
				imageUrl={movie.imageUrl}
				movieName={movie.movieName}
				releaseYear={movie.releaseYear}
				rating={movie.rating}
				duration={movie.duration}
				description={movie.description}
				onMovieClick={movie.onMovieClick}
			/>
		);
	}
};

export default MovieGrid;
