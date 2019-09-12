import React from "react";
import { APIDate } from "./APIDate";
import { create, act } from 'react-test-renderer';

it('renders without crashing', () => {
	let res;
	const today = new Date().toISOString().substr(0, 10);
	act(() => {
		res = create(<APIDate date={today} setDate={() => { }} today={today} />);
	})
	expect(res.toJSON()).toMatchSnapshot();
});

it('renders correctly', () => {
	let res;
	const today = new Date().toISOString().substr(0, 10);
	act(() => {
		res = create(<APIDate date={today} setDate={() => { }} today={today} />);
	})
	expect(res.toJSON()).toMatchSnapshot();
});
