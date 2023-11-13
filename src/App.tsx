import React, { useState } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieListPage from './components/MovieListPage/MovieListPage';
import { Header } from './components';
import Dialog from './components/Dialog/Dialog';
import MovieForm from './components/MovieForm/MovieForm';
import AddMovieForm from './components/AddMovieForm/AddMovieForm';
import Success from './components/Success/Success';
import Delete from './components/Delete/Delete';

const App = () => {
	const [search, setSearch] = useState('');

	const handleSearch = (query: string) => {
		setSearch(query);
	};

	const [containerClass, setContainerClass] = useState('container');

	const handleOpenDialog = () => setContainerClass('container blur');

	const setDefaultContainerClass = () => setContainerClass('container');

	const handleOpenDetails = () => setContainerClass('container details');

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<div className={containerClass}>
							<MovieListPage query={search} refreshSearch={handleSearch} />
						</div>
					}
				>
					<Route
						path=''
						element={<Header onSearch={handleSearch} initialQuery={search} />}
					>
						<Route
							path='new'
							element={
								<AddMovieForm
									onOpen={handleOpenDialog}
									onClose={setDefaultContainerClass}
								/>
							}
						/>
						<Route
							path=':movieId/edit'
							element={
								<Dialog
									onOpen={handleOpenDialog}
									onClose={setDefaultContainerClass}
									dialogClass='add'
									title='EDIT MOVIE'
								>
									<MovieForm />
								</Dialog>
							}
						/>
						<Route
							path='success'
							element={
								<Dialog
									onOpen={handleOpenDialog}
									onClose={setDefaultContainerClass}
									dialogClass='success'
									title=''
								>
									<Success />
								</Dialog>
							}
						/>
						<Route
							path=':movieId/delete'
							element={
								<Dialog
									onOpen={handleOpenDialog}
									onClose={setDefaultContainerClass}
									dialogClass='delete'
									title=''
								>
									<Delete />
								</Dialog>
							}
						/>
					</Route>
					<Route
						path=':movieId'
						element={
							<MovieDetails
								onOpen={handleOpenDetails}
								onClose={setDefaultContainerClass}
							/>
						}
					/>
				</Route>
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
