import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Dialog from './Dialog';
import MovieForm from '../MovieForm/MovieForm';
import Delete from '../Delete/Delete';
import Success from '../Success/Success';

const meta = {
	title: 'Dialog component',
	component: Dialog,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<BrowserRouter>
				<Story />
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const add = <MovieForm />;
const edit = <MovieForm />;
const del = <Delete />;
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
