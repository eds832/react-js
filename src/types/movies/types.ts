export interface MovieType {
	id?: number;
	tagline?: string;
	imageUrl: string;
	movieName: string;
	releaseDate: string;
	genresList?: string[];
	rating?: number;
	ratingCount?: number;
	budget?: number;
	revenue?: number;
	duration?: number;
	description?: string;
}
