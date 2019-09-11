import React from "react";
export function APISummary({ text }) {
	return (
		<div className="summary">
			{
				text ? text.split('.').map((paragraph, i) => <p key={i}>{paragraph}</p>) : 
					<p>Loading...</p>
			}
		</div>
	);
}
