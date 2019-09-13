import React from "react";
export function APISummary({ text }) {
	return (
		<div className="summary">
			{
				text ? text.split('.').map((paragraph, i) => paragraph ? <p key={i}>{paragraph}.</p> : null) : 
					<p>Loading...</p>
			}
		</div>
	);
}
