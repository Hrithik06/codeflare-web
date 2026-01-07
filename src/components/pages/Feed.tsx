// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../utils/hooks";
// import api from "../../utils/axiosInstance";

// import UserCard from "../ui/UserCard";
// import { addFeed } from "../../utils/feedSlice";
// import { RootState } from "../../utils/appStore";
// // import { setLoading, clearLoading } from "../../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// const EMPTY_IMAGE = "/EmptyImage.svg";
// const Feed = (): React.JSX.Element => {
// 	const dispatch = useAppDispatch();
// 	const navigate = useNavigate();
// 	const feed = useAppSelector((store: RootState) => store.feed);
// 	const [loading, setLoading] = useState(false);
// 	// const loading = useAppSelector((store: RootState) => store.user.loading);
// 	const isAuthenticated = useAppSelector(
// 		(store: RootState) => store.user.isAuthenticated,
// 	);
// 	const [error, setError] = useState(""); //TODO: Implement error handling and proper UI feedback
// 	const getFeed = async () => {
// 		if (feed.length !== 0) {
// 			// dispatch(clearLoading());
// 			setLoading(false);
// 			return;
// 		}

// 		// dispatch(setLoading());
// 		setLoading(true);

// 		await api
// 			.get("/user/feed", {
// 				params: {
// 					page: 1,
// 					limit: 10,
// 				},
// 				withCredentials: true,
// 			})
// 			.then((res) => {
// 				dispatch(addFeed(res.data.data));
// 				// dispatch(clearLoading());
// 				setLoading(false);
// 			})
// 			.catch((err) => {
// 				// dispatch(clearLoading());
// 				setLoading(false);
// 				if (err.response) {
// 					if (err.response.status === 401) {
// 						navigate("/login");
// 					} else if (err.response.status === 404) {
// 						// setError("No New Users found");
// 						console.error("No New Users found");
// 						navigate("/login");
// 					} else {
// 						const errorMessage =
// 							err.response.data?.message || "An error occurred";
// 						console.error(errorMessage);
// 						setError(errorMessage);

// 						// alert(errorMessage);
// 					}
// 				} else {
// 					console.error("Network error or server is down");
// 					// alert("Network error or server is down");
// 					setError("Network error or server is down");
// 					navigate("/login");
// 				}

// 				console.error(err);
// 			});
// 	};
// 	useEffect(() => {
// 		if (!isAuthenticated) {
// 			navigate("/login");
// 		}
// 		getFeed();
// 	}, []);
// 	if (loading) {
// 		return (
// 			<div className="flex justify-center mx-auto my-10">
// 				<span className="loading loading-bars loading-xl"></span>
// 			</div>
// 		);
// 	}

// 	if (error.length > 0) {
// 		return (
// 			<div className="text-center p-10">
// 				<div className="toast toast-center toast-top">
// 					<div className="alert alert-success">
// 						<span>{error}</span>
// 					</div>
// 				</div>
// 				<h1 className="text-3xl">{error}</h1>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="flex justify-center mx-auto min-h-screen">
// 			<div className="">
// 				{feed.length > 0 ? (
// 					feed.map((profile) => {
// 						return <UserCard user={profile} key={profile._id} />;
// 					})
// 				) : (
// 					<div className="w-full h-10/12 sm:h-full flex flex-col items-center justify-center">
// 						<p className="text-2xl sm:text-3xl text-center m-2 xl:mt-10">
// 							No New Recommendation available right now...
// 						</p>
// 						<img src={EMPTY_IMAGE} alt="EMPTY FEED" className="w-3/4" />
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };
// export default Feed;

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import api from "../../utils/axiosInstance";

import UserCard from "../ui/UserCard";
import { addFeed } from "../../utils/feedSlice";
import { RootState } from "../../utils/appStore";
// import { setLoading, clearLoading } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
const EMPTY_IMAGE = "/EmptyImage.svg";
const Feed = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const feed = useAppSelector((store: RootState) => store.feed);
	const [loading, setLoading] = useState(false);
	// const loading = useAppSelector((store: RootState) => store.user.loading);
	const isAuthenticated = useAppSelector(
		(store: RootState) => store.user.isAuthenticated,
	);
	const [currentIndex, setCurrentIndex] = useState(0);

	const [error, setError] = useState(""); //TODO: Implement error handling and proper UI feedback
	const getFeed = async () => {
		if (feed.length !== 0) {
			// dispatch(clearLoading());
			setLoading(false);
			return;
		}

		// dispatch(setLoading());
		setLoading(true);

		await api
			.get("/user/feed", {
				params: {
					page: 1,
					limit: 10,
				},
				withCredentials: true,
			})
			.then((res) => {
				dispatch(addFeed(res.data.data));
				// dispatch(clearLoading());
				setLoading(false);
			})
			.catch((err) => {
				// dispatch(clearLoading());
				setLoading(false);
				if (err.response) {
					if (err.response.status === 401) {
						navigate("/login");
					} else if (err.response.status === 404) {
						// setError("No New Users found");
						console.error("No New Users found");
						navigate("/login");
					} else {
						const errorMessage =
							err.response.data?.message || "An error occurred";
						console.error(errorMessage);
						setError(errorMessage);

						// alert(errorMessage);
					}
				} else {
					console.error("Network error or server is down");
					// alert("Network error or server is down");
					setError("Network error or server is down");
					navigate("/login");
				}

				console.error(err);
			});
	};
	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
		getFeed();
	}, []);
	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	if (error.length > 0) {
		return (
			<div className="flex flex-col items-center justify-center h-64 text-center px-4">
				<p className="text-lg text-red-600 mb-2">Something went wrong</p>
				<p className="text-sm text-gray-500 max-w-md">{error}</p>
			</div>
		);
	}
	if (currentIndex >= feed.length) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
				<p className="text-2xl mb-2">You’re all caught up 🎉</p>
				<p className="text-gray-500">Check back later for new people.</p>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			<div className="flex justify-center items-center min-h-[70vh]">
				<div>
					{feed.length > 0 ? (
						<div className="flex justify-center items-center min-h-[70vh]">
							<UserCard
								user={feed[currentIndex]}
								onDecision={() => setCurrentIndex((i) => i + 1)}
							/>
						</div>
					) : (
						<div className="w-full flex flex-col items-center justify-center">
							<p className="text-2xl text-center mb-4">
								No new recommendations right now
							</p>
							<img
								src={EMPTY_IMAGE}
								alt="EMPTY FEED"
								className="w-3/4 max-w-md"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default Feed;
