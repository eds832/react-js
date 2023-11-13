import React, { useEffect } from 'react';
import { PortalWithState } from 'react-portal';
import FocusTrap from 'focus-trap-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './Dialog.css';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Button from '../Button/Button';

export interface DialogProps {
	title: string;
	children: JSX.Element;
	onOpen: () => void;
	onClose: () => void;
	dialogClass?: string;
}

const Dialog: React.FC<DialogProps> = ({
	title,
	children,
	dialogClass,
	onOpen,
	onClose,
}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const link = `/${
		searchParams.get('query') ||
		searchParams.get('genre') ||
		searchParams.get('limit') ||
		searchParams.get('sortBy')
			? '?'
			: ''
	}${
		searchParams.get('query')
			? 'searchBy=title&query=' + searchParams.get('query')
			: ''
	}${searchParams.get('query') && searchParams.get('genre') ? '&' : ''}${
		searchParams.get('genre') ? 'genre=' + searchParams.get('genre') : ''
	}${
		(searchParams.get('query') || searchParams.get('genre')) &&
		searchParams.get('limit')
			? '&'
			: ''
	}${searchParams.get('limit') ? 'limit=' + searchParams.get('limit') : ''}${
		(searchParams.get('query') ||
			searchParams.get('genre') ||
			searchParams.get('limit')) &&
		searchParams.get('sortBy')
			? '&'
			: ''
	}${searchParams.get('sortBy') ? 'sortBy=' + searchParams.get('sortBy') : ''}`;

	const navigate = useNavigate();

	useEffect(() => onOpen(), []);

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
										onClose();
										closePortal();
										navigate(link);
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
												onClose();
												closePortal();
												navigate(link);
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
