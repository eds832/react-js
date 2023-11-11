import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';

import { api } from '../services';
import movieReducer from './movieSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const makeStore = () => {
	return configureStore({
		reducer: {
			[api.reducerPath]: api.reducer,
			movies: movieReducer,
		},
		devTools: true,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(api.middleware),
	});
};

export const store = makeStore();
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
setupListeners(store.dispatch);
export const wrapper = createWrapper<AppStore>(makeStore, {
	debug: true,
});
