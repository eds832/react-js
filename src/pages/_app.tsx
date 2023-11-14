import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { wrapper } from '../redux/store';
import '../public/globals.css';
import '../styles/index.css';

const App = ({ Component, ...rest }: AppProps) => {
	const { store, props } = wrapper.useWrappedStore(rest);
	const { pageProps } = props;
	return (
		<Provider store={store}>
			<React.StrictMode>
				<Head>
					<meta charSet='utf-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<meta name='theme-color' content='#000000' />
					<meta name='description' content='Movies information application' />
				</Head>
				<Component {...pageProps} />
			</React.StrictMode>
		</Provider>
	);
};

export default App;
