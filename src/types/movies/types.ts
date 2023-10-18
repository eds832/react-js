export interface MovieType {
	id?: number;
	imageUrl: string;
	movieName: string;
	releaseDate: string;
	genresList?: string[];
	rating?: number;
	duration?: number;
	description?: string;
	onMovieClick?: (movieName: string) => void;
}
