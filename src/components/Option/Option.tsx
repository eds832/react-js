import React from 'react';

interface OptionProps {
	value: string;
}

const convertCamelCaseToHyphen = (val: string) => {
	return val
		.replace(/\.?([A-Z])/g, function (x, y) {
			return '-' + y.toLowerCase();
		})
		.replace(/^-/, '');
};

const convertCamelCaseToCapitalLetters = (val: string) => {
	const words = val.match(/[A-Za-z][a-z]*/g) || [];

	return words.join(' ').toUpperCase();
};

const Option: React.FC<OptionProps> = ({ value }) => {
	return (
		<option
			value={value}
			data-testid={convertCamelCaseToHyphen(value) + '-option'}
		>
			{convertCamelCaseToCapitalLetters(value)}
		</option>
	);
};

export default Option;
