import React, { ReactNode } from 'react';

export interface ButtonProps {
	buttonClass?: string;
	children: ReactNode;
	onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
	dataTestid?: string;
	type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
	buttonClass,
	onClick,
	type,
	children,
	dataTestid,
}) => (
	<button
		className={buttonClass}
		onClick={onClick}
		type={type ? type : 'button'}
		data-testid={dataTestid}
	>
		{children}
	</button>
);

export default Button;
