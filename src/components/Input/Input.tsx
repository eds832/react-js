import React from 'react';

export interface InputProps {
	value: string;
	onChange: (event: {
		target: { value: React.SetStateAction<string> };
	}) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	inputId?: string;
	labelText?: string;
	type?: string;
	size?: number;
	pattern?: string;
	placeholderText?: string;
	dataTestid?: string;
	inputClassName?: string;
	error?: string;
}

const Input: React.FC<InputProps> = ({
	value,
	onChange,
	onKeyDown,
	inputId,
	labelText,
	type,
	size,
	pattern,
	placeholderText,
	dataTestid,
	inputClassName,
	error,
}) => {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event);
	};

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		onKeyDown?.(event);
	};

	return (
		<>
			<label htmlFor={inputId}>{labelText}</label>
			<input
				id={inputId}
				value={pattern ? (value.match(pattern) ? value : '') : value}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}
				type={type ? type : 'text'}
				className={inputClassName}
				size={size ? size : 50}
				pattern={pattern}
				placeholder={placeholderText}
				data-testid={dataTestid}
			/>
			<p className='error-message'>{error}</p>
		</>
	);
};

export default Input;
