import React from 'react';

import MovieTile from '../MovieTile/MovieTile';
import { MovieType } from './../../types/movies/types';

interface MovieGridProps {
	movies: MovieType[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
	return (
		<div className='movie-grid' data-testid='movie-grid'>
			{movies.map(
				({
					id,
					imageUrl,
					movieName,
					releaseDate,
					genresList,
					duration,
					rating,
					description,
				}) => (
					<MovieTile
						key={id ? id : movieName}
						movie={{
							id,
							imageUrl,
							movieName,
							releaseDate,
							genresList,
							duration,
							rating,
							description,
						}}
					/>
				)
			)}
		</div>
	);
};

export default MovieGrid;
