import React from 'react';

import './Netflixroulette.css';

import Typography, { TypographyTypes } from '../Paragraph/Typography';

const Netflixroulette = () => {
	return (
		<Typography type={TypographyTypes.NETFLIX_ROULETTE}>
			netflix<span className='light'>roulete</span>
		</Typography>
	);
};

export default Netflixroulette;
