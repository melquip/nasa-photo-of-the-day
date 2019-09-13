import React from "react";
export function APIDate({ date, setDate, today }) {
	return (
		<div className="date">
			<input type="date" min="2018-01-01" max={today} value={date} onChange={e => setDate(e.target.value)} />
		</div>
	);
}
