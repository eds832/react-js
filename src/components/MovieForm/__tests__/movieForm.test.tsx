import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import MovieForm from '../MovieForm';

describe('MovieForm', () => {
	it('renders MovieForm with image equals to default', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<MovieForm />
			</BrowserRouter>
		);
		expect(getByTestId('movie-form-url-input')).toHaveValue('');
	});

	it('renders MovieForm with title equals to default', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<MovieForm />
			</BrowserRouter>
		);
		expect(getByTestId('movie-form-title-input')).toHaveValue('');
	});

	it('renders MovieForm with release date equals to default', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<MovieForm />
			</BrowserRouter>
		);
		expect(getByTestId('movie-form-date-input')).toHaveValue('');
	});

	it('renders MovieForm with rating equals to default', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<MovieForm />
			</BrowserRouter>
		);
		expect(getByTestId('movie-form-rating-input')).toHaveValue('');
	});

	it('renders MovieForm with duration equals to default', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<MovieForm />
			</BrowserRouter>
		);
		expect(getByTestId('movie-form-duration-input')).toHaveValue('');
	});

	it('renders MovieForm with description equals to default', () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<MovieForm />
			</BrowserRouter>
		);
		expect(getByTestId('movie-form-description-input')).toHaveValue('');
	});
});
