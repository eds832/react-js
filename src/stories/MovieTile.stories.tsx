import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import MovieTile from '../components/MovieTile/MovieTile';
import { MovieType } from './../store/movies/types';

const meta = {
	title: 'MovieTile component',
	component: MovieTile,
	tags: ['autodocs'],
} satisfies Meta<typeof MovieTile>;

export default meta;

type Story = StoryObj<typeof meta>;

const movie: MovieType = {
	imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
	movieName: 'Movie 1',
	releaseYear: 2022,
	genresList: ['Comedy', 'Action'],
	onMovieClick: () => console.log('Movie 1 clicked'),
};

export const OnMovieClick: Story = {
	args: {
		movie,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const movieDiv = await canvas.getByTestId('Movie1-div');
		await userEvent.click(movieDiv);
	},
};
