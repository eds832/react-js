import React from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import './Header.css';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Netflixroulette from '../Netflixroulette/Netflixroulette';

interface HeaderProps {
	onSearch?: (query: string) => void;
	initialQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, initialQuery }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const link = `new/${
		searchParams.get('query') ||
		searchParams.get('genre') ||
		searchParams.get('limit') ||
		searchParams.get('sortBy')
			? '?'
			: ''
	}${
		searchParams.get('query')
			? 'searchBy=title&query=' + searchParams.get('query')
			: ''
	}${searchParams.get('query') && searchParams.get('genre') ? '&' : ''}${
		searchParams.get('genre') ? 'genre=' + searchParams.get('genre') : ''
	}${
		(searchParams.get('query') || searchParams.get('genre')) &&
		searchParams.get('limit')
			? '&'
			: ''
	}${searchParams.get('limit') ? 'limit=' + searchParams.get('limit') : ''}${
		(searchParams.get('query') ||
			searchParams.get('genre') ||
			searchParams.get('limit')) &&
		searchParams.get('sortBy')
			? '&'
			: ''
	}${searchParams.get('sortBy') ? 'sortBy=' + searchParams.get('sortBy') : ''}`;

	const navigate = useNavigate();

	const handleAddMovie = (event?: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		navigate(link);
	};
	return (
		<>
			<Outlet />
			<header>
				<div className='head-line'>
					<Netflixroulette />
					<Button onClick={handleAddMovie} children='+ ADD MOVIE' />
				</div>
				<div className='title-div'>
					<Typography children='FIND YOUR MOVIE' type={TypographyTypes.TITLE} />
				</div>
				<SearchForm initialQuery={initialQuery} onSearch={onSearch} />
			</header>
		</>
	);
};

export default Header;
