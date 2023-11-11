import { MovieType } from './../types/movies/types';

const convertFromMovieType = (movie: MovieType) => {
	return {
		id: movie.id,
		title: movie.movieName,
		tagline: movie.tagline ? movie.tagline : 'unknown',
		vote_average: +movie.rating,
		vote_count: movie.ratingCount ? movie.ratingCount : 0,
		release_date: movie.releaseDate,
		poster_path: movie.imageUrl,
		overview: movie.description,
		budget: movie.budget ? movie.budget : 0,
		revenue: movie.revenue ? movie.revenue : 0,
		runtime: +movie.duration,
		genres: movie.genresList,
	};
};

export default convertFromMovieType;
