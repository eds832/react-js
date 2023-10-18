import React from 'react';
import { PortalWithState } from 'react-portal';
import FocusTrap from 'focus-trap-react';

import './Dialog.css';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Button from '../Button/Button';

export interface DialogProps {
	title: string;
	children: JSX.Element;
	onClose: () => void;
	dialogClass?: string;
}

const Dialog: React.FC<DialogProps> = ({
	title,
	children,
	onClose,
	dialogClass,
}) => {
	return (
		<PortalWithState closeOnOutsideClick closeOnEsc defaultOpen>
			{({ closePortal, portal }) => (
				<>
					{portal(
						<FocusTrap>
							<div className={dialogClass ? dialogClass + ' dialog' : 'dialog'}>
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
									<div className='close-dialog-button-wrapper'>
										<Button
											buttonClass='close-dialog'
											dataTestid='close-dialog'
											onClick={() => {
												closePortal();
												onClose();
											}}
										>
											<span className='dialog-button-close'>╳</span>
										</Button>
									</div>
									<div className='dialog-title-wrapper'>
										<Typography
											dataTestid='dialog-title'
											type={TypographyTypes.TITLE}
										>
											{title}
										</Typography>
									</div>
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
