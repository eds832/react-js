import React from 'react';

export interface TextAreaProps {
	value: string;
	onChange?: (value: string) => void;
	directOnChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	inputId?: string;
	labelText?: string;
	error?: string;
	placeholderText?: string;
	dataTestid?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
	value,
	onChange,
	directOnChange,
	onKeyDown,
	inputId,
	labelText,
	error,
	placeholderText,
	dataTestid,
}) => {
	const handleTextAreaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		onChange?.(event.target.value);
		directOnChange?.(event);
	};

	const handleTextAreaKeyDown = (
		event: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		onKeyDown?.(event);
	};

	return (
		<div className='textarea-wrapper'>
			<label data-testid={inputId} htmlFor={inputId}>
				{labelText}
				<textarea
					data-testid={dataTestid}
					id={inputId}
					value={value}
					onChange={handleTextAreaChange}
					onKeyDown={handleTextAreaKeyDown}
					className={error ? 'input-error' : ''}
					placeholder={placeholderText ? placeholderText : 'Input text'}
				/>
				<p className='error-message'>{error}</p>
			</label>
		</div>
	);
};

export default TextArea;
