import React from "react";
import { Link } from "react-router-dom";

const UnAuthorized = () => {
	return (
		<div>
			<h1>Problem, we have an Error</h1>
			<p>
				<Link to="/">Back to Home</Link>
			</p>
		</div>
	);
};

export default UnAuthorized;
