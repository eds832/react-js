import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import SortControl from './SortControl';

const meta = {
	title: 'SortControl component',
	component: SortControl,
	tags: ['autodocs'],
} satisfies Meta<typeof SortControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HandleSelectClick: Story = {
	args: {
		initialValue: 'TITLE',
		onChange: () => console.log('release date clicked'),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const movieDiv = await canvas.getByTestId('release-date-option');
		await userEvent.click(movieDiv);
	},
};
