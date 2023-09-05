import React, { createElement } from 'react';

import './Header.css';
import Counter from '../Counter/Counter';
import SearchForm from '../SearchForm/SearchForm';

const Header = () => {
	return (
		<header>
			<div className='head-line'>
				<h3 className='h3'>
					netflix<span className='light'>roulete</span>
				</h3>
				{createElement(Counter, { initialValue: 0 })}
			</div>
			<div>
				<h1 className='h1'>FIND YOUR MOVIE</h1>
			</div>
			<SearchForm
				initialQuery=''
				onSearch={(query) => console.log('Search for:', query)}
			/>
		</header>
	);
};

export default Header;
