import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import SearchForm from './SearchForm';

const meta = {
	title: 'SearchForm component',
	component: SearchForm,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<BrowserRouter>
				<Story />
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InitialQuery: Story = {
	args: {
		initialQuery: 'Alice',
	},
};

export const SearchButtonClick: Story = {
	args: {
		initialQuery: 'Alice',
		onSearch: (query) => console.log('Search for:', query),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const searchButton = await canvas.getByTestId('search-button');
		await userEvent.click(searchButton);
	},
};
