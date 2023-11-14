import React, { useContext } from 'react';
import { MovieDialogContext } from '../../context/MovieDialogContextProvider';

const Layout = ({ children }) => {
	const [openDialog] = useContext(MovieDialogContext);
	const divClass = openDialog ? 'container blur' : 'container';
	return <div className={divClass}>{children}</div>;
};

export default Layout;
