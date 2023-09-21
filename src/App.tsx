import React from 'react';

import './App.css';
import { Header, GenreSelect, MovieGrid, MovieCounter } from './components';
import { GENRES } from './constants';
import SortControl from './components/SortControl/SortControl';

function App() {
	return (
		<div className='container'>
			<Header />
			<div className='under-heder-controls'>
				<GenreSelect
					genres={GENRES}
					selectedGenre='All'
					onSelect={(genre) => console.log('Selected genre:', genre)}
				/>
				<SortControl
					initialValue='releaseDate'
					onChange={(value) => console.log('Selected: ' + value)}
				/>
			</div>
			<MovieCounter />
			<MovieGrid />
		</div>
	);
}

export default App;
