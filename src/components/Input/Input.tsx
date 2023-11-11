import React from 'react';

export interface InputProps {
	value: string;
	onChange?: (value: string) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	onLoseFocus?: (value: string) => void;
	onInputFocus?: (value: string) => void;
	directOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	inputId?: string;
	labelText?: string;
	type?: string;
	size?: number;
	pattern?: string;
	placeholderText?: string;
	dataTestid?: string;
	inputClassName?: string;
	error?: string;
	checked?: boolean;
	name?: string;
}

const Input: React.FC<InputProps> = ({
	value,
	onChange,
	onKeyDown,
	onLoseFocus,
	onInputFocus,
	directOnChange,
	inputId,
	labelText,
	type,
	size,
	pattern,
	placeholderText,
	dataTestid,
	inputClassName,
	error,
	checked,
	name,
}) => {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		directOnChange?.(event);
		onChange?.(event.target.value);
	};

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		onKeyDown?.(event);
	};

	const handleLoseFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
		onLoseFocus?.(event.target.value);
	};

	const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
		onInputFocus?.(event.target.value);
	};

	return (
		<>
			<label htmlFor={inputId}>{labelText}</label>
			<input
				id={inputId}
				value={
					pattern
						? typeof value === 'string' && value.match(pattern)
							? value
							: ''
						: value
				}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}
				onBlur={handleLoseFocus}
				onFocus={handleFocus}
				type={type ? type : 'text'}
				className={inputClassName}
				size={size ? size : 50}
				pattern={pattern}
				placeholder={placeholderText}
				data-testid={dataTestid}
				checked={checked}
				name={name}
			/>
			<p className='error-message'>{error}</p>
		</>
	);
};

export default Input;
