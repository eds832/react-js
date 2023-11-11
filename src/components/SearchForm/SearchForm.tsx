import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Input from '../Input/Input';
import Button from '../Button/Button';

const SearchForm = () => {
	const router = useRouter();
	const { query } = router;
	const { search } = query;
	const [searchEntry, setSearchEntry] = useState(search ? search : '');

	const handleInputChange = (value: string) => {
		setSearchEntry(value);
		if (!value) {
			router.replace({
				query: { ...query, search: '' },
			});
		}
	};

	const handleSearch = (event?: { preventDefault: () => void }) => {
		event?.preventDefault();
		router.replace({
			query: { ...query, search: searchEntry },
		});
	};

	return (
		<form className='search-form' onSubmit={handleSearch}>
			<Input
				type='text'
				placeholderText='What do you want to watch...'
				value={searchEntry?.toString()}
				onChange={handleInputChange}
				dataTestid='search-input'
			/>
			<Button
				type='submit'
				buttonClass='search-button'
				dataTestid='search-button'
				children='Search'
			/>
		</form>
	);
};

export default SearchForm;
