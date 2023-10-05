import React from 'react';

interface OptionProps {
	value: string;
	dataTestid: string;
	textContent: string;
}

const Option: React.FC<OptionProps> = ({ value, dataTestid, textContent }) => {
	return (
		<option value={value} data-testid={dataTestid}>
			{textContent}
		</option>
	);
};

export default Option;
