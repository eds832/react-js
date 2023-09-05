import React from 'react';

import './GenreSelect.css';

export type GenreSelectType = {
	genres: string[];
	selectedGenre: string;
	onSelect: (genre: string) => void;
};

const GenreSelect = (props: GenreSelectType) => {
	const handleSelect = (genre: string) => {
		props.onSelect(genre);
	};

	const genres = props.genres.map((genre) => {
		const className = genre === props.selectedGenre ? 'selected' : undefined;
		return (
			<button
				key={genre}
				className={className}
				onClick={() => handleSelect(genre)}
			>
				{genre}
			</button>
		);
	});

	return <div className='genre-buttons'>{genres}</div>;
};

export default GenreSelect;
