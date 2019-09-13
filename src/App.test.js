import React from 'react';
import App from './App';
import { create, act } from 'react-test-renderer';

const NASA_API_KEY = process.env.REACT_APP_API_KEY;
it('renders without crashing', () => {
	let res;
	act(() => {
		res = create(<App apiKey={NASA_API_KEY} />);
	})
	expect(res.toJSON()).toMatchSnapshot();
});

it('renders correctly', () => {
	let res;
	act(() => {
		res = create(<App apiKey={NASA_API_KEY} />);
	})
	expect(res.toJSON()).toMatchSnapshot();
});