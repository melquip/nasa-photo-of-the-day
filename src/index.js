import React from "react";
import ReactDOM from "react-dom";
import "./globalStyles.js";
import App from "./App";

const NASA_API_KEY = process.env.REACT_APP_API_KEY;
ReactDOM.render(<App apiKey={NASA_API_KEY} />, document.getElementById("root"));
