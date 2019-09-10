import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';

function App({ apiKey }) {
	const [data, setData] = useState({})
	const fetchApiData = () => {
		axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
			.then(response => {
				console.log(response.data);
				setData(response.data);
			})
			.catch(error => console.error(error));
		return false;
	}
	useEffect(() => {
		fetchApiData();
		return () => console.log('cleanup')
	}, [])
	return (
		<div className="App">
			<p>
				Read through the instructions in the README.md file to build your NASA
				app! Have fun 🚀!
			</p>
			{
				!data ? 
				<div className="loading">Loading...</div> : 
				<div className="content">
					<h2>{data.title}</h2>
					<p>{data.date}</p>
					<p>{data.explanation}</p>
					<img src={data.url} />
					{/* <img src={data.hdurl} /> */}
				</div>
			}
		</div>
	);
}

export default App;
