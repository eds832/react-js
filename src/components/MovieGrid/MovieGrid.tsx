import React from 'react';

import './MovieGrid.css';
import MovieTile from '../MovieTile/MovieTile';
import { MovieType } from 'src/store/movies/types';

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
					imageUrl={imageUrl}
					movieName={movieName}
					releaseYear={releaseYear}
					genresList={genresList}
					onMovieClick={onMovieClick}
				/>
			))}
		</div>
	);
};

export default MovieGrid;
