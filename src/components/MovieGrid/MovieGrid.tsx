import React from 'react';

import './MovieGrid.css';
import MovieTile from '../MovieTile/MovieTile';
import { MovieType } from './../../types/movies/types';

interface MovieGridProps {
	movies: MovieType[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
	return (
		<div className='movie-grid' data-testid='movie-grid'>
			{movies.map(({ id, imageUrl, movieName, releaseDate, genresList }) => (
				<MovieTile
					key={id ? id : movieName}
					movie={{
						id,
						imageUrl,
						movieName,
						releaseDate,
						genresList,
					}}
				/>
			))}
		</div>
	);
};

export default MovieGrid;
