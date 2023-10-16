import React from 'react';

interface TextAreaProps {
	value: string;
	onChange: (value: string) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	inputId?: string;
	labelText?: string;
	error?: string;
	placeholderText?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
	value,
	onChange,
	onKeyDown,
	inputId,
	labelText,
	error,
	placeholderText,
}) => {
	const handleTextAreaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		onChange(event.target.value);
	};

	const handleTextAreaKeyDown = (
		event: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		onKeyDown?.(event);
	};

	return (
		<div className='textarea-wrapper'>
			<label htmlFor={inputId}>
				{labelText}
				<textarea
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
