import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { APITitle } from "./APITitle";
import { APISummary } from "./APISummary";
import { APIDate } from "./APIDate";
import { APIImage } from "./APIImage";


function App({ apiKey }) {
	const [data, setData] = useState({});
	useEffect(() => {
		axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&hd=false`)
			.then(response => {
				console.log(response.data);
				setData(response.data);
			})
			.catch(error => console.error(error));
		return () => console.log('cleanup')
	}, [apiKey]);
	return (
		<div className="App">
			{
				!data ?
					<div className="loading">Loading...</div> :
					<div className="content">
						<div className="header">
							<APITitle text={data.title} />
							<APIDate date={data.date} />
						</div>
						<div className="flex">
							<APISummary text={data.explanation} />
							<APIImage 
								hd={false} 
								source={data.url} 
								text={data.title}
							/>
						</div>
					</div>
			}
		</div>
	);
}

export default App;
