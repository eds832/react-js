import React from 'react';
import './SortControl.css';

interface SortControlProps {
	initialValue: string;
	onChange: (value: string) => void;
}

const SortControl: React.FC<SortControlProps> = ({
	initialValue,
	onChange,
}) => {
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	};

	return (
		<div className='sort-control'>
			<label htmlFor='sort-select' data-testid='sort-control-label'>
				SORT BY
			</label>
			<select
				data-testid='sort-select'
				value={initialValue}
				onChange={handleSelectChange}
			>
				<option data-testid='release-date-option' value='releaseDate'>
					RELEASE DATE
				</option>
				<option data-testid='title-option' value='title'>
					TITLE
				</option>
			</select>
		</div>
	);
};

export default SortControl;
