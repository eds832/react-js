import React from 'react';

import './App.css';
import GenreSelect from './components/GenreSelect/GenreSelect';
import MovieGrid from './components/MovieGrid/MovieGrid';
import MovieCounter from './components/MovieCounter/MovieCounter';
import Header from './components/Header/Header';

function App() {
	return (
		<div className='container'>
			<Header />
			<GenreSelect
				genres={['All', 'Documentary', 'Comedy', 'Horor', 'Crime', 'Drama']}
				selectedGenre='All'
				onSelect={(genre) => console.log('Selected genre:', genre)}
			/>
			<MovieCounter />
			<MovieGrid />
		</div>
	);
}

export default App;
