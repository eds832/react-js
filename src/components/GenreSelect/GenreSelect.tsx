import React, { FC } from 'react';

import './GenreSelect.css';
import Button from '../Button/Button';

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
	const genreButtons = genres.map((genre) => {
		const className = genre === selectedGenre ? 'selected' : undefined;
		const testId = `${genre}-genre-button`;
		return (
			<Button
				key={genre}
				buttonClass={className}
				onClick={() => onSelect(genre)}
				dataTestid={testId}
				children={genre}
			/>
		);
	});

	return <div className='genre-buttons'>{genreButtons}</div>;
};

export default GenreSelect;
