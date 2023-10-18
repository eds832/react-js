import React from 'react';

import './MovieGrid.css';
import MovieTile from '../MovieTile/MovieTile';
import { MovieType } from './../../types/movies/types';

interface MovieGridProps {
	movies: MovieType[];
	onMovieClick: (id?: number) => void;
	handleEditClicked: (id: number) => void;
	handleDeleteClicked: (id: number) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({
	movies,
	onMovieClick,
	handleEditClicked,
	handleDeleteClicked,
}) => {
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
						onMovieClick,
					}}
					handleDeleteClicked={handleDeleteClicked}
					handleEditClicked={handleEditClicked}
				/>
			))}
		</div>
	);
};

export default MovieGrid;
