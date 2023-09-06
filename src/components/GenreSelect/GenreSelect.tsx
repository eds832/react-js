import React, { FC } from 'react';

import './GenreSelect.css';

export type GenreSelectType = {
	genres: string[];
	selectedGenre: string;
	onSelect: (genre: string) => void;
};

const GenreSelect: FC<GenreSelectType> = ({
	genres,
	selectedGenre,
	onSelect,
}) => {
	const handleSelect = (genre: string) => {
		onSelect(genre);
	};

	const genreButtons = genres.map((genre) => {
		const className = genre === selectedGenre ? 'selected' : undefined;
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

	return <div className='genre-buttons'>{genreButtons}</div>;
};

export default GenreSelect;
