import React from 'react';

export interface ButtonProps {
	buttonClass?: string;
	buttonText: string;
	onClick?: () => void;
	dataTestid?: string;
	type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
	buttonClass,
	onClick,
	type,
	buttonText,
	dataTestid,
}) => (
	<button
		className={buttonClass}
		onClick={onClick}
		type={type ? type : 'button'}
		data-testid={dataTestid}
	>
		{buttonText}
	</button>
);

export default Button;
