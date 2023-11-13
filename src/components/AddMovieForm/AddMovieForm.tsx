import React from 'react';

import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

interface AddMovieFormProps {
	onOpen: () => void;
	onClose: () => void;
}

const AddMovieForm: React.FC<AddMovieFormProps> = ({ onOpen, onClose }) => {
	return (
		<Dialog
			onOpen={onOpen}
			onClose={onClose}
			dialogClass='add'
			title='ADD MOVIE'
		>
			<MovieForm />
		</Dialog>
	);
};

export default AddMovieForm;
