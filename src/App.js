import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { APITitle } from "./APITitle";
import { APISummary } from "./APISummary";
import { APIDate } from "./APIDate";
import { APIImage } from "./APIImage";


function App({ apiKey }) {
	const [info, setInfo] = useState({});

	let today = new Date().toISOString().substr(0, 10);
	const [currDate, setDate] = useState(today);
	
	useEffect(() => {
		axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&hd=false&date=${currDate}`)
			.then(response => {
				console.log(response.data);
				setInfo(response.data);
			})
			.catch(error => console.error(error));
		return () => setInfo({})
	}, [apiKey, currDate]);
	return (
		<div className="App">
			{
				!info ?
					<div className="loading">Loading...</div> :
					<div className="content">
						<div className="header">
							<APITitle text={info.title} />
							<APIDate date={currDate} setDate={setDate} today={today} />
						</div>
						<div className="flex">
							<APISummary text={info.explanation} />
							{
								info.media_type === 'image' ? 
								<APIImage 
									hd={false} 
									source={info.url} 
									text={info.title}
								/> : 
								<iframe src={info.url} title={info.title}></iframe>
							}
						</div>
						{
							info.media_type === 'image' ? 
							<APIImage 
								hd={true} 
								source={info.hdurl} 
								text={info.title}
							/> : null
						}
					</div>
			}
		</div>
	);
}

export default App;
