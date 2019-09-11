import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { APITitle } from "./APITitle";
import { APISummary } from "./APISummary";
import { APIDate } from "./APIDate";
import { APIImage } from "./APIImage";


function App({ apiKey }) {
	const [apod, setAPOD] = useState({});
	const [neo, setNeo] = useState({});

	let today = new Date().toISOString().substr(0, 10);
	const [currDate, setDate] = useState(today);
	
	useEffect(() => {
		const apodPromise = axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&hd=false&date=${currDate}`);
		const neoPromise = axios.get(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}&start_date=${currDate}&end_date=${currDate}`);
		Promise.all([apodPromise, neoPromise])
		.then(([apodRes, neoRes]) => {
			console.log("\n\nAPOD", apodRes.data);
			setAPOD(apodRes.data);
			console.log("\n\nNEO", neoRes.data);
			setNeo(neoRes.data);
		}).catch(error => console.error(error));
		return () => {
			setAPOD({})
			setNeo({})
		}
	}, [apiKey, currDate]);
	return (
		<div className="App">
			{
				!apod ?
					<div className="loading">Loading...</div> :
					<div className="content">
						<div className="header">
							<APITitle text={apod.title} />
							<APIDate date={currDate} setDate={setDate} today={today} />
						</div>
						<div className="flex">
							<APISummary text={apod.explanation} />
							{
								apod.media_type === 'image' ? 
								<APIImage 
									hd={false} 
									source={apod.url} 
									text={apod.title}
								/> : 
								<iframe src={apod.url} title={apod.title}></iframe>
							}
						</div>
						{
							apod.media_type === 'image' ? 
							<APIImage 
								hd={true} 
								source={apod.hdurl} 
								text={apod.title}
							/> : null
						}
					</div>
			}
			{
				!neo || !neo.near_earth_objects ? <div className="loading">Loading...</div> :
				<div className="content">
					<div className="header">
						<APITitle text="Near Earth Objects" />
						<p>{neo.element_count} NEOs in {currDate}</p>
					</div>
					{
						neo.near_earth_objects[currDate.toString()] ? neo.near_earth_objects[currDate.toString()].map(asteroid => {
							console.log(asteroid);
							return (
								<div className="asteroid" key={asteroid.neo_reference_id}>
									<p>Object ID: {asteroid.neo_reference_id}</p>
									<p>Object Name: {asteroid.name}</p>
									<p>Object Data: <a href={asteroid.links.self} target="_blank" rel="noopener noreferrer">Click here</a></p>
									<p>Is Hazardous: {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
									<p>Is Sentry: {asteroid.is_sentry_object ? 'Yes' : 'No'}</p>
								</div>
							)
						}) : null
					}
				</div>
			}
		</div>
	);
}

export default App;
