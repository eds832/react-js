import React, { Dispatch, SetStateAction, useState } from 'react';

export const MovieDialogContext = React.createContext<
	[string, Dispatch<SetStateAction<string>>] | null
>(null);

const MovieDialogContextProvider = ({ children }) => {
	const [openDialog, setOpenDialog] = useState(null);
	return (
		<MovieDialogContext.Provider value={[openDialog, setOpenDialog]}>
			{children}
		</MovieDialogContext.Provider>
	);
};

export default MovieDialogContextProvider;
