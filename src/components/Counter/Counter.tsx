import { createElement, useState, FC } from 'react';

export type CounterType = {
	initialValue: number;
};

const Counter: FC<CounterType> = ({ initialValue }) => {
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
		createElement('span', null, value),
		createElement('button', { onClick: increment }, '+ ADD MOVIE'),
		createElement('button', { onClick: decrement }, '-')
	);
};

export default Counter;
