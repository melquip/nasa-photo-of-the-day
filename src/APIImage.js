import React from "react";
export function APIImage({ text, source, hdsource, hd }) {
	return (<>
		{!hd && <img src={source} alt={text} />}
		{hd && <img src={hdsource} alt={text} />}
	</>);
}
