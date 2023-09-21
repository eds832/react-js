export type MovieType = {
	imageUrl: string;
	movieName: string;
	releaseYear: number;
	genresList?: string[];
	rating?: number;
	duration?: number;
	description?: string;
	onMovieClick: (movieName: string) => void;
};
