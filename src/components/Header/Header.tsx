import React from 'react';

import './Header.css';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Netflixroulette from '../Netflixroulette/Netflixroulette';

interface HeaderProps {
	onAddMovieClicked?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddMovieClicked }) => {
	const handleAddMovie = (event?: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		onAddMovieClicked?.();
	};
	return (
		<header>
			<div className='head-line'>
				<Netflixroulette />
				<Button onClick={handleAddMovie} children='+ ADD MOVIE' />
			</div>
			<div className='title-div'>
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
