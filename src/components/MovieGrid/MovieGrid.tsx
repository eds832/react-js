import React from 'react';

import './MovieGrid.css';
import MovieTile from '../MovieTile/MovieTile';
import { MovieType } from './../../store/movies/types';

interface MovieGridProps {
	movies: MovieType[];
	onMovieClick: (clickedMovieName?: string) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieClick }) => {
	return (
		<div className='movie-grid'>
			{movies.map(({ imageUrl, movieName, releaseYear, genresList }) => (
				<MovieTile
					key={movieName}
					movie={{ imageUrl, movieName, releaseYear, genresList, onMovieClick }}
				/>
			))}
		</div>
	);
};

export default MovieGrid;
