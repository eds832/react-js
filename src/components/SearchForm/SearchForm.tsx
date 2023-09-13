import React, { FC, useState } from 'react';

import './SearchForm.css';

interface SearchFormProps {
	initialQuery: string;
	onSearch: (query: string) => void;
}

const SearchForm: FC<SearchFormProps> = ({ initialQuery, onSearch }) => {
	const [query, setQuery] = useState(initialQuery);

	const handleInputChange = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setQuery(event.target.value);
	};

	const handleSearch = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		onSearch(query);
	};

	return (
		<form onSubmit={handleSearch}>
			<input
				type='text'
				placeholder='What do you want to watch...'
				value={query}
				onChange={handleInputChange}
				data-testid='search-input'
			/>
			<button
				type='submit'
				className='search-button'
				data-testid='search-button'
			>
				Search
			</button>
		</form>
	);
};

export default SearchForm;
