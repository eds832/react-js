import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Dialog from './Dialog';
import MovieForm from '../MovieForm/MovieForm';
import Delete from '../Delete/Delete';
import Success from '../Success/Success';

const meta = {
	title: 'Dialog component',
	component: Dialog,
	tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const onSuccess = () => console.log('success');
const handleDelete = () => console.log('delete');
const add = <MovieForm onSuccess={onSuccess} />;
const edit = <MovieForm onSuccess={onSuccess} />;
const del = <Delete handleDelete={handleDelete} />;
const success = <Success />;

export const AddMovie: Story = {
	args: {
		title: 'ADD MOVIE',
		children: add,
		dialogClass: 'add',
	},
};

export const EditMovie: Story = {
	args: {
		title: 'EDIT MOVIE',
		children: edit,
		dialogClass: 'add',
	},
};

export const DeleteMovie: Story = {
	args: {
		title: '',
		children: del,
		dialogClass: 'delete',
	},
};

export const SuccessPrompt: Story = {
	args: {
		title: '',
		children: success,
		dialogClass: 'success',
	},
};
