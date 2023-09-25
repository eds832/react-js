import React, { ReactNode } from 'react';

import './Typography.css';

export const enum TypographyTypes {
	TITLE = 'title',
	NETFLIX_ROULETTE = 'netflix-roulette',
	MOVIE_TILE_TITLE = 'movie-tile-title',
	MOVIE_GENRES = 'movie-genres',
	MOVIE_DETILES_TITLE = 'movie-details-title',
	MOVIE_DETAILS_RATING = 'movie-details-rating',
	MOVIE_DETAILS_RATING_ONE_DIGIT = 'movie-details-reating-one-digit',
	MOVIE_DETAILS_GENRES = 'movie-details-genres',
	MOVIE_DETAILS_RELEASE_YEAR_AND_DURATION = 'movie-details-release-year-and-duration',
	MOVIE_DETILES_DESCRITION = 'movie-details-description',
	MOVIE_TILE_RELEASE_YEAR = 'movie-tile-release-year',
	MOVIE_COUNTER = 'movie-counter',
}

interface TypographyProps {
	type: TypographyTypes;
	children: ReactNode;
	dataTestid?: string;
}

const Typography: React.FC<TypographyProps> = ({
	type,
	children,
	dataTestid,
}) => {
	return (
		<p data-testid={dataTestid} className={type}>
			{children}
		</p>
	);
};

export default Typography;
