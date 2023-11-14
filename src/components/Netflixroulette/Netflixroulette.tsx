import React from 'react';

import Typography, { TypographyTypes } from '../Typography/Typography';

interface NetflixrouletteProps {
	light?: string;
}

const Netflixroulette: React.FC<NetflixrouletteProps> = ({ light }) => {
	const Netflix = () => {
		if (light === 'light') {
			return <span className='light'>netflixroulette</span>;
		} else {
			return (
				<>
					netflix<span className='light'>roulette</span>
				</>
			);
		}
	};

	return (
		<div className='netflix-roulette-div'>
			<Typography type={TypographyTypes.NETFLIX_ROULETTE}>
				<Netflix />
			</Typography>
		</div>
	);
};

export default Netflixroulette;
