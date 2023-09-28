import React from 'react';
import { PortalWithState } from 'react-portal';
import FocusTrap from 'focus-trap-react';

import './Dialog.css';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Button from '../Button/Button';

interface DialogProps {
	title: string;
	children: JSX.Element;
	onClose: () => void;
	onOpen: () => void;
}

const Dialog: React.FC<DialogProps> = ({
	title,
	children,
	onClose,
	onOpen,
}) => {
	return (
		<PortalWithState closeOnOutsideClick closeOnEsc>
			{({ openPortal, closePortal, portal }) => (
				<>
					<Button
						buttonClass='select-popup-button'
						onClick={(event?: React.MouseEvent<HTMLElement>) => {
							openPortal(event);
							onOpen();
						}}
					>
						<span className='popup-button-text'>{title?.split(/\s+/)[0]}</span>
					</Button>
					{portal(
						<FocusTrap>
							<div className='dialog'>
								<div
									className='dialog__overlay'
									onClick={() => {
										closePortal();
										onClose();
									}}
								></div>
								<div
									className='dialog__content'
									role='dialog'
									aria-modal='true'
								>
									<Button
										buttonClass='close-popup'
										dataTestid='close-popup'
										onClick={() => {
											closePortal();
											onClose();
										}}
									>
										<span className='popup-button-close'>╳</span>
									</Button>
									<Typography type={TypographyTypes.TITLE}>{title}</Typography>
									<div className='dialog__body'>{children}</div>
								</div>
							</div>
						</FocusTrap>
					)}
				</>
			)}
		</PortalWithState>
	);
};

export default Dialog;
