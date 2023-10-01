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

export const SelectedGenre: Story = {
	args: {
		genres: ['All', 'Documentary', 'Comedy', 'Horor', 'Crime'],
		selectedGenre: 'All',
	},
};

export const SelectComedyGenre: Story = {
	args: {
		genres: ['All', 'Documentary', 'Comedy', 'Horor', 'Crime'],
		selectedGenre: 'All',
		onSelect: (genre) => console.log('Selected genre:', genre),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const genreButton = await canvas.getByTestId('Comedy-genre-button');
		await userEvent.click(genreButton);
	},
};
