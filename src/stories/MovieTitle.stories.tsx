import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import MovieTitle from '../components/MovieTile/MovieTile';

const meta = {
	title: 'MovieTitle component',
	component: MovieTitle,
	tags: ['autodocs'],
} satisfies Meta<typeof MovieTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnMovieClick: Story = {
	args: {
		imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
		movieName: 'Movie 1',
		releaseYear: 2022,
		genresList: ['Comedy', 'Action'],
		onMovieClick: () => console.log('Movie 1 clicked'),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const movieDiv = await canvas.getByTestId('Movie1-div');
		await userEvent.click(movieDiv);
	},
};
