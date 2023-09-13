import React, { FC } from 'react';

import './GenreSelect.css';

export interface GenreSelectProps {
	genres: string[];
	selectedGenre: string;
	onSelect: (genre: string) => void;
}

const GenreSelect: FC<GenreSelectProps> = ({
	genres,
	selectedGenre,
	onSelect,
}) => {
	const handleSelect = (genre: string) => {
		onSelect(genre);
	};

	const genreButtons = genres.map((genre) => {
		const className = genre === selectedGenre ? 'selected' : undefined;
		const testId = `${genre}-genre-button`;
		return (
			<button
				key={genre}
				className={className}
				onClick={() => handleSelect(genre)}
				data-testid={testId}
			>
				{genre}
			</button>
		);
	});

	return <div className='genre-buttons'>{genreButtons}</div>;
};

export default GenreSelect;
