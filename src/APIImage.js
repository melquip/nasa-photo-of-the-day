import React from "react";
export function APIImage({ className, text, source, hd }) {
	return <img className={className + (hd ? ' hdimg' : '')} src={source} alt={text} />;
}
