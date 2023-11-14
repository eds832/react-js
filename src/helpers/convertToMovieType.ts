const convertToMovieType = (m) => {
	return {
		id: m.id,
		tagline: m.tagline ? m.tagline : 'unknown',
		imageUrl: m.poster_path,
		movieName: m.title,
		releaseDate: m.release_date,
		genresList: m.genres,
		rating: m.vote_average,
		ratingCount: m.vote_count ? m.vote_count : null,
		budget: m.budget ? m.budget : null,
		revenue: m.revenue ? m.revenue : null,
		duration: m.runtime,
		description: m.overview,
	};
};

export default convertToMovieType;
