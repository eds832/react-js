import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import MovieTile from './MovieTile';
import { MovieType } from './../../types/movies/types';

const meta = {
	title: 'MovieTile component',
	component: MovieTile,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<BrowserRouter>
				<Story />
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof MovieTile>;

export default meta;

type Story = StoryObj<typeof meta>;

const movie: MovieType = {
	id: 99,
	imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
	movieName: 'Movie 1',
	releaseDate: '2022-07-07',
	genresList: ['Comedy', 'Action'],
};

export const OnMovieClick: Story = {
	args: {
		movie,
		handleDeleteClicked: () => console.log('Movie 1 clicked to Delete'),
		handleEditClicked: () => console.log('Movie 1 clicked to Edit'),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const movieDiv = await canvas.getByTestId('movie-tile-99-div');
		await userEvent.click(movieDiv);
	},
};
