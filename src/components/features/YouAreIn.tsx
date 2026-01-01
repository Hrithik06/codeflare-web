import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//TODO: Should not load if there is no error and user directly enters /notfound in address bar
const YouAreIn = (): React.JSX.Element => {
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
			navigate("/profile");
		}, 5000);

		return () => {
			clearInterval(intervalId);
			clearTimeout(timeOutId);
		};
	}, []);

	return (
		<>
			<section className="bg-white dark:bg-gray-900">
				<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					<div className="mx-auto max-w-screen-sm text-center">
						{/* <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
        500
      </h1>
      <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
        Internal Server Error.
      </p> */}
						<img src="/You_Are_Already_Inside.svg" className="w-1/2 m-auto" />
						<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
							Redirecting to profile in {redirectIn}
						</p>
						<button
							className="btn btn-primary"
							onClick={() => navigate("/profile")}
						>
							Go to Profile
						</button>
					</div>
				</div>
			</section>
		</>
	);
};
export default YouAreIn;
