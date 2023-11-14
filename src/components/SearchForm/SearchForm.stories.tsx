import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import SearchForm from './SearchForm';

const meta = {
	title: 'SearchForm component',
	component: SearchForm,
	tags: ['autodocs'],
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SearchButtonClick: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const searchButton = await canvas.getByTestId('search-button');
		await userEvent.click(searchButton);
	},
};
