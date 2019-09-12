import React from "react";
import ReactDOM from 'react-dom';
import { APIDate } from "./APIDate";

it('renders without crashing', () => {
  const div = document.createElement('div');
  const today = new Date().toISOString().substr(0, 10);
  ReactDOM.render(<APIDate date={today} setDate={() => {}} today={today} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
