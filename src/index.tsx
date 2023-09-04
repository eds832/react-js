import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Counter = (props) => {
	const [value, setValue] = React.useState(props.initialValue);

	function increment() {
		setValue(value + 1);
	}

	function decrement() {
		setValue(value - 1);
	}

	return React.createElement(
		'div',
		null,
		React.createElement('span', null, value),
		React.createElement('button', { onClick: increment }, '+ ADD MOVIE'),
		React.createElement('button', { onClick: decrement }, '-')
	);
};

const SearchForm = (props) => {
	const [query, setQuery] = React.useState(props.initialQuery);

	function handleInputChange(event) {
		setQuery(event.target.value);
	}

	function handleSearch(event) {
		event.preventDefault();
		props.onSearch(query);
	}

	return React.createElement(
		'form',
		{ onSubmit: handleSearch },
		React.createElement('input', {
			type: 'text',
			placeholder: 'What do you want to watch...',
			value: query,
			onChange: handleInputChange,
		}),
		React.createElement(
			'button',
			{ type: 'submit', className: 'search-button' },
			'Search'
		)
	);
};

const GenreSelect = (props) => {
	function handleSelect(genre) {
		props.onSelect(genre);
	}

	const genres = props.genres.map((genre) => {
		const className = genre === props.selectedGenre ? 'selected' : undefined;
		return React.createElement(
			'button',
			{ key: genre, className: className, onClick: () => handleSelect(genre) },
			genre
		);
	});

	return React.createElement('div', { className: 'genre-buttons' }, genres);
};

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<div className='container'>
		<header>
			<div className='head-line'>
				<h3 className='h3'>
					netflix<span className='light'>roulete</span>
				</h3>
				{React.createElement(Counter, { initialValue: 0 })}
			</div>
			<div>
				<h1 className='h1'>FIND YOUR MOVIE</h1>
			</div>
			<SearchForm
				initialQuery=''
				onSearch={(query) => console.log('Search for:', query)}
			/>
		</header>
		<GenreSelect
			genres={['All', 'Documentary', 'Comedy', 'Horor', 'Crime', 'Drama']}
			selectedGenre='All'
			onSelect={(genre) => console.log('Selected genre:', genre)}
		/>
		<div className='movie-counter'>
			<span>39 movies found</span>
		</div>
		<div className='movie-grid'>
			<div>
				<img src='https://via.placeholder.com/300x450.png?text=Movie+2' />
				<h2>Movie 1</h2>
			</div>
			<div>
				<img src='https://via.placeholder.com/300x450.png?text=Movie+2' />
				<h2>Movie 2</h2>
			</div>
			<div>
				<img src='https://via.placeholder.com/300x450.png?text=Movie+3' />
				<h2>Movie 3</h2>
			</div>
			<div>
				<img src='https://via.placeholder.com/300x450.png?text=Movie+4' />
				<h2>Movie 4</h2>
			</div>
			<div>
				<img src='https://via.placeholder.com/300x450.png?text=Movie+5' />
				<h2>Movie 5</h2>
			</div>
			<div>
				<img src='https://via.placeholder.com/300x450.png?text=Movie+6' />
				<h2>Movie 6</h2>
			</div>
		</div>
	</div>
);
