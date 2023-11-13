import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import GenreSelect from './GenreSelect';

const meta = {
	title: 'GenreSelect component',
	component: GenreSelect,
	tags: ['autodocs'],
} satisfies Meta<typeof GenreSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InitialState: Story = {
	args: {
		genres: ['All', 'documentary', 'comedy', 'horror', 'crime'],
		selectedGenre: 'All',
		onSelect: (genre) => console.log('Selected genre:', genre),
	},
};

export const SelectComedyGenre: Story = {
	args: {
		genres: ['All', 'documentary', 'comedy', 'horror', 'crime'],
		selectedGenre: 'All',
		onSelect: (genre) => console.log('Selected genre:', genre),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const genreButton = await canvas.getByTestId('comedy-genre-button');
		await userEvent.click(genreButton);
	},
};
