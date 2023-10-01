import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import MovieDetails from './MovieDetails';

const meta = {
	title: 'MovieDetails component',
	component: MovieDetails,
	tags: ['autodocs'],
} satisfies Meta<typeof MovieDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnGoToAllMoviesClick: Story = {
	args: {
		imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
		movieName: 'Movie 1',
		releaseYear: 2022,
		rating: 8.9,
		duration: 177,
		description: 'A description of the movie',
		genresList: ['Action'],
		onMovieClick: () => console.log('go to all movies clicked'),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const goToAllMoviesButton = await canvas.getByTestId(
			'go-to-all-movies-button'
		);
		await userEvent.click(goToAllMoviesButton);
	},
};
