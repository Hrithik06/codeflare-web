import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NOT_FOUND = "/404_Not_Found_Error.svg";
//TODO: Should not load if there is no error and user directly enters /notfound in address bar
const NotFound = (): React.JSX.Element => {
	const navigate = useNavigate();

	const [redirectIn, setRedirectIn] = useState(5);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setRedirectIn((prev) => {
				if (prev <= 0) {
					clearInterval(intervalId);
					// setTimeout(() => {
					//   navigate("/");
					// }, 0);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		const timeOutId = setTimeout(() => {
			navigate("/");
		}, 5000);

		return () => {
			clearInterval(intervalId);
			clearTimeout(timeOutId);
		};
	}, [navigate]);

	return (
		<>
			<section className=" bg-white dark:bg-gray-900">
				<div className="py-8 px-4 mx-auto max-w-7xl lg:py-16 lg:px-6">
					<div className="mx-auto max-w-screen-sm text-center m-10">
						<img src={NOT_FOUND} className="w-1/2 m-auto" />
						<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
							Redirecting to home in {redirectIn}
						</p>
						<button className="btn btn-primary" onClick={() => navigate("/")}>
							Go back to Home
						</button>
					</div>
				</div>
			</section>
		</>
	);
};
export default NotFound;
