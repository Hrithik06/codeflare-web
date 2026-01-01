import React from "react";
import { Outlet } from "react-router-dom";

import { NavBar, Footer } from "./index";

const Body = (): React.JSX.Element => {
	return (
		<div className="min-h-screen">
			<NavBar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Body;
