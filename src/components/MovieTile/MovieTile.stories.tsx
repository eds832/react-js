import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import MovieTile from './MovieTile';
import { MovieType } from './../../types/movies/types';

const meta = {
	title: 'MovieTile component',
	component: MovieTile,
	tags: ['autodocs'],
} satisfies Meta<typeof MovieTile>;

export default meta;

type Story = StoryObj<typeof meta>;

const movie: MovieType = {
	id: 99,
	imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
	movieName: 'Movie 1',
	releaseDate: '2022-07-07',
	genresList: ['Comedy', 'Action'],
	rating: 7.7,
	duration: 111,
	description: 'A movie description',
};

export const OnMovieClick: Story = {
	args: {
		movie,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const movieDiv = await canvas.getByTestId('movie-tile-99-div');
		await userEvent.click(movieDiv);
	},
};
