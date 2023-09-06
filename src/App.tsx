import React from 'react';

import './App.css';
import { Header, GenreSelect, MovieGrid, MovieCounter } from './components';

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
