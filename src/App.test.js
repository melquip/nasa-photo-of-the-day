import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const NASA_API_KEY = process.env.REACT_APP_API_KEY;
  ReactDOM.render(<App apiKey={NASA_API_KEY} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
