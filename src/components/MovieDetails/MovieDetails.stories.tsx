import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import MovieDetails from './MovieDetails';
import { MovieType } from '../../types/movies/types';

const meta = {
	title: 'MovieDetails component',
	component: MovieDetails,
	tags: ['autodocs'],
} satisfies Meta<typeof MovieDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

const movie: MovieType = {
	id: 99,
	imageUrl: 'https://via.placeholder.com/300x450.png?text=Movie+1',
	movieName: 'Movie 1',
	releaseDate: '2022-07-07',
	genresList: ['Comedy', 'Action'],
	duration: 111,
	rating: 9,
	description: 'Movie Description',
};

export const OnGoToAllMoviesClick: Story = {
	args: {
		movie,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const goToAllMoviesButton = await canvas.getByTestId(
			'go-to-all-movies-button'
		);
		await userEvent.click(goToAllMoviesButton);
	},
};
