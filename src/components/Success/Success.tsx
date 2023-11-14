import React from 'react';

import Typography, { TypographyTypes } from '../Typography/Typography';

const Success = () => {
	return (
		<>
			<div className='congratulations'>
				<Typography dataTestid='congratulations' type={TypographyTypes.TITLE}>
					CONGRATULATIONS !
				</Typography>
			</div>
			<div className='success-main'>
				<Typography
					dataTestid='success-main-1-st-p'
					type={TypographyTypes.SUCCESS_STYLE}
				>
					The movie has been added to
				</Typography>
				<Typography
					dataTestid='success-main-2-st-p'
					type={TypographyTypes.SUCCESS_STYLE}
				>
					database successfully
				</Typography>
			</div>
		</>
	);
};

export default Success;
