import React from 'react';

import './Header.css';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Netflixroulette from '../Netflixroulette/Netflixroulette';

interface HeaderProps {
	onAddMovieClicked?: () => void;
	onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddMovieClicked, onSearch }) => {
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
			<SearchForm initialQuery='' onSearch={onSearch} />
		</header>
	);
};

export default Header;
