import React from "react";
export function APIImage({ text, source, hd }) {
	return <img className={hd ? 'hdimg' : null} src={source} alt={text} />;
}
