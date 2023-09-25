import React from 'react';

import './Header.css';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Netflixroulette from '../Netflixroulette/Netflixroulette';

const Header = () => {
	return (
		<header>
			<div className='head-line'>
				<Netflixroulette />
				<Button children='+ ADD MOVIE' />
			</div>
			<div>
				<Typography children='FIND YOUR MOVIE' type={TypographyTypes.TITLE} />
			</div>
			<SearchForm
				initialQuery=''
				onSearch={(query) => console.log('Search for:', query)}
			/>
		</header>
	);
};

export default Header;
