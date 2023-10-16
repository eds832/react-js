import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Dialog from './Dialog';
import MovieForm from '../MovieForm/MovieForm';
import Delete from '../Delete/Delete';
import Success from '../Success/Success';
import { MovieType } from '../../types/movies/types';

const meta = {
	title: 'Dialog component',
	component: Dialog,
	tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const movie: MovieType = {
	imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
	movieName: 'Movie 1',
	releaseDate: '2022-01-01',
	genresList: ['Action', 'Horror'],
	rating: 7.7,
	duration: 100,
	description: 'Movie description',
};

const add = <MovieForm onMovieSubmit={(movie) => console.log(movie)} />;
const edit = (
	<MovieForm movie={movie} onMovieSubmit={(movie) => console.log(movie)} />
);
const del = <Delete onDelete={() => console.log('delete clicked')} />;
const success = <Success />;

export const AddMovie: Story = {
	args: {
		title: 'ADD MOVIE',
		children: add,
		onClose: () => console.log('dialog closed'),
		dialogClass: 'add',
	},
};

export const EditMovie: Story = {
	args: {
		title: 'EDIT MOVIE',
		children: edit,
		onClose: () => console.log('dialog closed'),
		dialogClass: 'add',
	},
};

export const DeleteMovie: Story = {
	args: {
		title: '',
		children: del,
		onClose: () => console.log('dialog closed'),
		dialogClass: 'delete',
	},
};

export const SuccessPrompt: Story = {
	args: {
		title: '',
		children: success,
		onClose: () => console.log('dialog closed'),
		dialogClass: 'success',
	},
};
