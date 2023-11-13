import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import MovieDetails from './MovieDetails';

const meta = {
	title: 'MovieDetails component',
	component: MovieDetails,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<BrowserRouter>
				<Story />
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof MovieDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnGoToAllMoviesClick: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const goToAllMoviesButton = await canvas.getByTestId(
			'go-to-all-movies-button'
		);
		await userEvent.click(goToAllMoviesButton);
	},
};
