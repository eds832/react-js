import React, { useState } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieListPage from './components/MovieListPage/MovieListPage';
import { Header } from './components';

const App = () => {
	const [search, setSearch] = useState('');

	const handleSearch = (query: string) => {
		setSearch(query);
	};
	const [openAddDialog, setOpenAddDialog] = useState(false);

	const handleOpenAddDialog = () => {
		setOpenAddDialog(true);
	};
	const handleCloseAddDialog = () => {
		setOpenAddDialog(false);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<MovieListPage
							openAddDialog={openAddDialog}
							handleCloseAddDialog={handleCloseAddDialog}
							query={search}
						/>
					}
				>
					<Route
						index
						element={
							<Header
								onAddMovieClicked={handleOpenAddDialog}
								onSearch={handleSearch}
								initialQuery={search}
							/>
						}
					/>
					<Route path=':movieId' element={<MovieDetails />} />
				</Route>
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
