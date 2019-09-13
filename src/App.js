import React, { useState, useEffect } from "react";
import axios from 'axios';
import { APITitle } from "./APITitle";
import { APISummary } from "./APISummary";
import { APIDate } from "./APIDate";
import { APIImage } from "./APIImage";

import styled from '@emotion/styled';

const Container = styled.div`
	background: radial-gradient(rgb(235,235,235) 3px, transparent 4px), radial-gradient(rgb(235,235,235) 3px, transparent 4px), linear-gradient(#fff 4px, transparent 0), linear-gradient(45deg, transparent 74px, transparent 75px, rgb(235,235,235) 75px, rgb(235,235,235) 76px, transparent 77px, transparent 109px), linear-gradient(-45deg, transparent 75px, transparent 76px, rgb(235,235,235) 76px, rgb(235,235,235) 77px, transparent 78px, transparent 109px),
	#fff;
	background-size: 109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px;
	background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
	padding: 5rem;

	h1 {
		font-size: 3.5rem;
		line-height: 3.5rem;
	}
	.date {
		font-size: 1.5rem;
		line-height: 1.5rem;
	}
	.summary {
		font-size: 1rem;
		line-height: 1.2rem;
	}
	.summary p {
		margin-top: 1rem;
		&:first-of-type {
			margin-top: 0;
		}
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	padding-bottom: 3.2rem;
	border-bottom: 1px solid black;
	margin-bottom: 2rem;

	& > :first-of-type {
		width: 100%;
		max-width: 75%;
		flex-basis: 75%;
	}
	& > :last-child {
		width: 100%;
		max-width: 25%;
		flex-basis: 25%;
		text-align: right;
	}
`;

const Flex = styled.div`
	display: flex;
	padding-top: 2rem;
	justify-content: space-between;
	& > :first-of-type, & > :last-child  {
		width: 100%;
		max-width: calc(50% - 1rem);
		flex-basis: calc(50% - 1rem);
	}
`;

const StyledAPIImage = styled(APIImage)`
	width: 100%;
	min-height: 100%;
	object-fit: cover;
	object-position: center;
	&.hdimg {
		margin-top: 3rem;
		object-fit: contain;
	}
`;

const Asteroid = styled.div`
	padding: 1rem 0;
	font-size: 1rem;
	line-height: 1.2rem;
	border-bottom: 1px solid #000;
`;

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
					<Container className="content">
						<Header className="header">
							<APITitle text={apod.title} />
							<APIDate date={currDate} setDate={setDate} today={today} />
						</Header>
						<Flex>
							<APISummary text={apod.explanation} />
							{
								apod.media_type === 'image' ? 
								<StyledAPIImage 
									className="apod_image"
									hd={false} 
									source={apod.url} 
									text={apod.title}
								/> : 
								<iframe src={apod.url} title={apod.title}></iframe>
							}
						</Flex>
						{
							apod.media_type === 'image' ? 
							<StyledAPIImage 
								className="apod_image"
								hd={true} 
								source={apod.hdurl} 
								text={apod.title}
							/> : null
						}
					</Container>
			}
			{
				!neo || !neo.near_earth_objects ? <div className="loading">Loading...</div> :
				<Container className="content">
					<Header className="header">
						<APITitle text="Near Earth Objects" />
						<p>{neo.element_count} NEOs in {currDate}</p>
					</Header>
					{
						neo.near_earth_objects[currDate.toString()] ? neo.near_earth_objects[currDate.toString()].map(asteroid => {
							console.log(asteroid);
							return (
								<Asteroid key={asteroid.neo_reference_id}>
									<p>Object ID: {asteroid.neo_reference_id}</p>
									<p>Object Name: {asteroid.name}</p>
									<p>Object Data: <a href={asteroid.links.self} target="_blank" rel="noopener noreferrer">Click here</a></p>
									<p>Is Hazardous: {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
									<p>Is Sentry: {asteroid.is_sentry_object ? 'Yes' : 'No'}</p>
								</Asteroid>
							)
						}) : null
					}
				</Container>
			}
		</div>
	);
}

export default App;
