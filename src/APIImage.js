import React from "react";
export function APIImage({ text, source, hd }) {
	return (<>
		<img src={source} alt={text} />
	</>);
}
