import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Counter from './Counter';

const meta = {
	title: 'Counter component',
	component: Counter,
	tags: ['autodocs'],
} satisfies Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Increment: Story = {
	args: {
		initialValue: 0,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const incrementButton = await canvas.getByTestId('counter-plus');
		await userEvent.click(incrementButton);
	},
};

export const Decrement: Story = {
	args: {
		initialValue: 0,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const decrementButton = await canvas.getByTestId('counter-minus');
		await userEvent.click(decrementButton);
	},
};
