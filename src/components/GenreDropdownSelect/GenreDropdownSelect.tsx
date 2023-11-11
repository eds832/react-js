import React, { useEffect, useState, useRef } from 'react';

import { GENRES } from '../../constants';
import Input from '../Input/Input';

export interface GenreDropdownSelectProps {
	labelText: string;
	placeholderText: string;
	value: string[];
	error: string;
	onSelect: (genres: string[]) => void;
}

const GenreDropdownSelect: React.FC<GenreDropdownSelectProps> = ({
	labelText,
	placeholderText,
	value,
	error,
	onSelect,
}) => {
	const [opened, setOpened] = useState(false);
	const options = GENRES.map(
		(g) => g.charAt(0).toUpperCase() + g.slice(1)
	).filter((g) => g !== 'All');
	const ref = useRef<HTMLDivElement>(null);

	const handleDropdownClick = () => {
		if (opened) {
			setOpened(false);
		} else {
			setOpened(true);
		}
	};

	const handleClickOutsideDropdown = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setOpened(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutsideDropdown, true);
		return () => {
			document.removeEventListener('click', handleClickOutsideDropdown, true);
		};
	}, []);

	const handleCheck = (genre: string) => {
		const selectedGenres = value.includes(genre)
			? value.filter((g) => g !== genre)
			: [...value, genre];
		onSelect(selectedGenres);
	};

	return (
		<div ref={ref}>
			<label data-testid='genre-dropdown-label'>{labelText}</label>
			<div
				data-testid='genre-dropdown-main'
				className={
					opened
						? 'dropdown-select-genre-main dropdown-select-opened'
						: 'dropdown-select-genre-main dropdown-select-closed'
				}
			>
				<p
					onClick={handleDropdownClick}
					data-testid='genre-dropdown-select-main'
				>
					<span className='select-dropdown-placeholder-text'>
						{placeholderText}
					</span>
				</p>
			</div>
			{opened && (
				<ul className='opened-dropdown'>
					{options.map((genre) => (
						<li key={genre}>
							<Input
								value={genre}
								type='checkbox'
								checked={value?.includes(genre) || false}
								onChange={handleCheck}
								name={genre}
								dataTestid={genre + '-genre-dropdown-option'}
							/>
							{genre}
						</li>
					))}
				</ul>
			)}
			<p className='dropdown-error-message'>{error}</p>
		</div>
	);
};

export default GenreDropdownSelect;
