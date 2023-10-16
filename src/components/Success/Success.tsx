import React from 'react';

import './Success.css';
import Typography, { TypographyTypes } from '../Typography/Typography';

const Success = () => {
	return (
		<>
			<div className='congratulations'>
				<Typography type={TypographyTypes.TITLE}>CONGRATULATIONS !</Typography>
			</div>
			<div className='success-main'>
				<Typography type={TypographyTypes.SUCCESS_STYLE}>
					The movie has been added to
				</Typography>
				<Typography type={TypographyTypes.SUCCESS_STYLE}>
					database successfully
				</Typography>
			</div>
		</>
	);
};

export default Success;
