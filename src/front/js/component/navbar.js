import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/">
					<span className="navbar navbar-logo mb-0">Plugged-in</span>
				</Link>
				<div className="ml-auto">
					<Link to="/registrarse">
						<button className="btn btn-primary">Register</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
