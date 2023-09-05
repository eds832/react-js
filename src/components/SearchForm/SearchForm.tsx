import React, { useState } from 'react';

import './SearchForm.css';

export type SearchFormType = {
	initialQuery: string;
	onSearch: (query: string) => void;
};

const SearchForm = (props: SearchFormType) => {
	const [query, setQuery] = useState(props.initialQuery);

	const handleInputChange = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setQuery(event.target.value);
	};

	const handleSearch = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		props.onSearch(query);
	};

	return (
		<form onSubmit={handleSearch}>
			<input
				type='text'
				placeholder='What do you want to watch...'
				value={query}
				onChange={handleInputChange}
			/>
			<button type='submit' className='search-button'>
				Search
			</button>
		</form>
	);
};

export default SearchForm;
