import React from 'react';

import './Netflixroulette.css';

import Typography, { TypographyTypes } from '../Paragraph/Typography';

interface NetflixrouletteProps {
	light?: string;
}

const Netflixroulette: React.FC<NetflixrouletteProps> = ({ light }) => {
	if (light === 'light') {
		return (
			<Typography type={TypographyTypes.NETFLIX_ROULETTE}>
				<span className='light'>netflixroulete</span>
			</Typography>
		);
	} else {
		return (
			<Typography type={TypographyTypes.NETFLIX_ROULETTE}>
				netflix<span className='light'>roulete</span>
			</Typography>
		);
	}
};

export default Netflixroulette;
