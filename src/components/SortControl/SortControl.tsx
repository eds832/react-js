import React, { useState } from 'react';

import './SortControl.css';
import Option from '../Option/Option';
import { RELEASE_DATE, TITLE } from './../../constants';

interface SortControlProps {
	initialValue: string;
	onChange: (value: string) => void;
}

const options = [RELEASE_DATE, TITLE];

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
				{options.map((val) => (
					<Option
						key={val}
						value={val}
						dataTestid={
							val.toLocaleLowerCase().replaceAll(/\s+/g, '-') + '-option'
						}
						textContent={val}
					/>
				))}
			</select>
		</div>
	);
};

export default SortControl;
