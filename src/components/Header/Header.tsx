import React, { useContext, useEffect, useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Netflixroulette from '../Netflixroulette/Netflixroulette';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { MovieDialogContext } from '../../context/MovieDialogContextProvider';
import { moviesActions } from '../../redux/movieSlice';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';
import Success from '../Success/Success';
import Delete from '../Delete/Delete';
import { api } from '../../services';

const Header = () => {
	const dispatch = useAppDispatch();
	const [openDialog, setOpenDialog] = useContext(MovieDialogContext);
	const [dialog, setDialog] = useState(openDialog);
	const mv = useAppSelector((state) => state.movies.movie);
	const [deleteMovie] = api.useDeleteMovieMutation();

	useEffect(() => {
		setDialog(openDialog);
	}, [openDialog]);

	const handleAddMovie = () => {
		const newMovie = {
			imageUrl: '',
			movieName: '',
			releaseDate: '',
			genresList: [],
			rating: '',
			duration: '',
			description: '',
		};
		dispatch(moviesActions.setMovie(newMovie));
		setOpenDialog('add');
	};

	const handleCloseAddDialog = () => {
		dispatch(moviesActions.setMovie(null));
		setOpenDialog(null);
	};

	const handleSuccess = () => {
		setOpenDialog('success');
	};

	const handleCloseSuccessDialog = () => {
		setOpenDialog(null);
	};

	const handleDelete = () => {
		deleteMovie(mv.id).then(() => setOpenDialog(null));
	};

	return (
		<>
			<header className='header'>
				<div className='head-line'>
					<Netflixroulette />
					<Button onClick={handleAddMovie} children='+ ADD MOVIE' />
				</div>
				<div className='title-div'>
					<Typography children='FIND YOUR MOVIE' type={TypographyTypes.TITLE} />
				</div>
				<SearchForm />
			</header>

			{(dialog === 'add' || dialog === 'edit') && (
				<Dialog
					title={dialog === 'add' ? 'ADD MOVIE' : 'EDIT MOVIE'}
					onClose={handleCloseAddDialog}
					dialogClass='add'
				>
					<MovieForm onSuccess={handleSuccess} />
				</Dialog>
			)}

			{dialog === 'success' && (
				<Dialog
					title=''
					onClose={handleCloseSuccessDialog}
					dialogClass='success'
				>
					<Success />
				</Dialog>
			)}

			{dialog === 'delete' && (
				<Dialog
					title=''
					onClose={handleCloseSuccessDialog}
					dialogClass='delete'
				>
					<Delete handleDelete={handleDelete} />
				</Dialog>
			)}
		</>
	);
};

export default Header;
