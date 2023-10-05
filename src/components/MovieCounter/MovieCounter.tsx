import React from 'react';

import './MovieCounter.css';
import Typography, { TypographyTypes } from '../Typography/Typography';

const MovieCounter = () => {
	return (
		<div className='movie-counter'>
			<Typography type={TypographyTypes.MOVIE_COUNTER}>
				39<span className='lighter'> movies found</span>
			</Typography>
		</div>
	);
};

export default MovieCounter;
