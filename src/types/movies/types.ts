export interface MovieType {
	id?: number;
	tagline?: string;
	imageUrl: string;
	movieName: string;
	releaseDate: string;
	genresList?: string[];
	rating: number | string;
	ratingCount?: number;
	budget?: number;
	revenue?: number;
	duration: number | string;
	description: string;
}
