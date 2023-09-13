import { createElement, useState, FC } from 'react';

interface CounterProps {
	initialValue: number;
}

const Counter: FC<CounterProps> = ({ initialValue }) => {
	const [value, setValue] = useState(initialValue);

	const increment = () => {
		setValue(value + 1);
	};

	const decrement = () => {
		setValue(value - 1);
	};

	return createElement(
		'div',
		null,
		createElement('span', { 'data-testid': 'counter-value' }, value),
		createElement(
			'button',
			{ onClick: increment, 'data-testid': 'counter-plus' },
			'+ ADD MOVIE'
		),
		createElement(
			'button',
			{ onClick: decrement, 'data-testid': 'counter-minus' },
			'-'
		)
	);
};

export default Counter;
