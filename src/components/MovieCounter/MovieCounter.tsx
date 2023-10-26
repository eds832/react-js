import React from 'react';

import './MovieCounter.css';
import Typography, { TypographyTypes } from '../Typography/Typography';

interface MovieCounterProps {
	count: number;
}

const MovieCounter: React.FC<MovieCounterProps> = ({ count }) => {
	return (
		<div className='movie-counter'>
			<Typography type={TypographyTypes.MOVIE_COUNTER}>
				{count}
				<span className='lighter'> movies found</span>
			</Typography>
		</div>
	);
};

export default MovieCounter;
