import { createElement, useState } from 'react';

export type CounterType = {
	initialValue: number;
};

const Counter = (props: CounterType) => {
	const [value, setValue] = useState(props.initialValue);

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
