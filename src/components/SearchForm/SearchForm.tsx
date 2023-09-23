import React, { FC, useState } from 'react';

import './SearchForm.css';
import Input from '../Input/Input';
import Button from '../Button/Button';

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
			<Input
				type='text'
				placeholderText='What do you want to watch...'
				value={query}
				onChange={handleInputChange}
				dataTestid='search-input'
			/>
			<Button
				type='submit'
				buttonClass='search-button'
				dataTestid='search-button'
				buttonText='Search'
			/>
		</form>
	);
};

export default SearchForm;
