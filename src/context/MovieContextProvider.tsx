import React, { Dispatch, SetStateAction, useState } from 'react';

import { MovieType } from './../types/movies/types';

export const MovieContext = React.createContext<
	[MovieType, Dispatch<SetStateAction<MovieType>>] | null
>(null);

const MovieContextProvider = ({ children }) => {
	const [movie, setMovie] = useState(null);
	return (
		<MovieContext.Provider value={[movie, setMovie]}>
			{children}
		</MovieContext.Provider>
	);
};

export default MovieContextProvider;
