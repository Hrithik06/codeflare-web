// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAppSelector } from "../../utils/hooks";

// import { setUser } from "../../utils/userSlice";
// // import { clearLoading, setLoading } from "../../utils/userSlice";	setIsLogin((prev) => !prev);
// // import { YouAreIn } from "../features";
// import YouAreIn from "../features/YouAreIn";
// import { useAppDispatch } from "../../utils/hooks";
// import api from "../../utils/axiosInstance";
// import { loginZodSchema, signupZodSchema } from "../../utils/zodSchema";
// import { ZodError } from "zod";
// const Login = (): React.JSX.Element => {
// 	const dispatch = useAppDispatch();
// 	const navigate = useNavigate();
// 	const location = useLocation();

// 	const [firstName, setFirstName] = useState("");
// 	const [lastName, setLastName] = useState("");
// 	const [emailId, setEmailId] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [error, setError] = useState("");
// 	const [showPassword, setShowPassword] = useState(false);
// 	// const [isLogin, setIsLogin] = useState(true);
// 	const [loading, setLoading] = useState(false);
// 	// const loading = useAppSelector((store: RootState) => store.user.loading);
// 	const isAuthenticated = useAppSelector((store) => store.user.isAuthenticated);

// 	const isLogin = location.pathname === "/login";
// 	const handleLogin = async () => {
// 		try {
// 			loginZodSchema.parse({ emailId, password });

// 			setShowPassword(false);
// 			// dispatch(setLoading());
// 			setLoading(true);
// 			await api
// 				.post(
// 					"/login",
// 					{
// 						emailId,
// 						password,
// 					},
// 					{
// 						withCredentials: true,
// 					},
// 				)
// 				.then((response) => {
// 					const userData = response?.data?.data;
// 					/**
// 					 * NOTE: DONOT check for these as it can be inconsistent
// 					 * statusText is optional sometimes its statusText="" thats why it was failing in prod(EC2)
// 					 * proxies rewrite it
// 					 * browsers treat it inconsistently
// 					 * Axios already rejects non-2xx by default
// 					 * response.status === 200 && response.statusText === "OK"
// 					 */
// 					if (userData) {
// 						dispatch(setUser(userData));
// 						// dispatch(clearLoading());
// 						setLoading(false);
// 						// navigate("/profile");
// 					}
// 				})
// 				.catch((err) => {
// 					// dispatch(clearLoading());
// 					setLoading(false);

// 					if (err.response) {
// 						let errMessage;
// 						if (err?.response?.data?.errors) {
// 							errMessage = err?.response?.data?.errors[0]?.message;
// 						} else {
// 							errMessage =
// 								err?.response?.data?.message || "Something went wrong.";
// 						}
// 						setError(errMessage);
// 						console.error(errMessage);
// 					} else if (err.request) {
// 						console.log(err.request);
// 						setError("Error: No response from Server ");
// 					} else {
// 						console.log("Error: ", err?.message);
// 						setError("Error connecting with server");
// 					}
// 				});
// 		} catch (err) {
// 			if (err instanceof ZodError) {
// 				setError(err?.errors[0]?.message);
// 				return;
// 			}
// 			console.error("Error: ", err);
// 		}
// 	};
// 	const handleSignUp = async () => {
// 		signupZodSchema.parse({ emailId, password, firstName, lastName });

// 		await api
// 			.post(
// 				"/signup",
// 				{ firstName, lastName, emailId, password },
// 				{ withCredentials: true },
// 			)
// 			.then((res) => {
// 				dispatch(setUser(res.data.data));
// 				navigate("/profile", { replace: true });
// 			})
// 			.catch((err) => {
// 				console.error(err);
// 				if (err.response) {
// 					if (err.response.status === 409) {
// 						console.log(err.response.data);
// 						setError(err.response.data.message);
// 					}
// 				}
// 			});
// 	};
// 	if (!isLogin && isAuthenticated) {
// 		return (
// 			// <div className="min-h-screen flex flex-col items-center justify-center">
// 			// 	<p>You already have an account.</p>
// 			// 	<button
// 			// 		className="btn btn-primary on"
// 			// 		onClick={() => navigate("/profile")}
// 			// 	>
// 			// 		Go to profile
// 			// 	</button>
// 			// </div>
// 			<YouAreIn />
// 		);
// 	}

// 	//TODO: when user is loggedIn and visits the /login page it should not come to Login Page redirect to home(feed)
// 	return (
// 		<>
// 			<div className=" bg-[url(/background.jpg)] min-h-screen flex justify-center items-center">
// 				<form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto ">
// 					<legend className="fieldset-legend text-xl">
// 						{isLogin ? "Login" : "Sign Up"}
// 					</legend>
// 					{!isLogin && (
// 						<>
// 							<label className="fieldset-label" htmlFor="firstName">
// 								First Name
// 							</label>
// 							<input
// 								type="text"
// 								className="input"
// 								value={firstName}
// 								onChange={(e) => setFirstName(e.target.value)}
// 								id="firstName"
// 								name="firstName"
// 								autoComplete="given-name"
// 								minLength={1}
// 								maxLength={20}
// 							/>

// 							<label className="fieldset-label" htmlFor="lastName">
// 								Last Name
// 							</label>
// 							<input
// 								type="text"
// 								className="input"
// 								value={lastName}
// 								onChange={(e) => setLastName(e.target.value)}
// 								id="lastName"
// 								name="lastName"
// 								autoComplete="family-name"
// 								minLength={1}
// 								maxLength={20}
// 							/>
// 						</>
// 					)}

// 					<>
// 						<label className="fieldset-label" htmlFor="email">
// 							Email
// 						</label>
// 						<input
// 							type="email"
// 							className="input"
// 							value={emailId}
// 							onChange={(e) => setEmailId(e.target.value)}
// 							id="email"
// 							name="email"
// 							autoComplete="email"
// 							required
// 						/>
// 					</>
// 					<>
// 						<label className="fieldset-label" htmlFor="password">
// 							Password
// 						</label>
// 						<div className="flex items-center relative">
// 							<input
// 								type={showPassword ? "text" : "password"}
// 								className="input"
// 								value={password}
// 								onChange={(e) => setPassword(e.target.value)}
// 								id="password"
// 								name="password"
// 								autoComplete="current-password"
// 								required
// 							/>

// 							<button
// 								className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
// 								type="button"
// 								onClick={() => setShowPassword((prevState) => !prevState)}
// 							>
// 								{showPassword ? (
// 									<svg
// 										xmlns="http://www.w3.org/2000/svg"
// 										fill="none"
// 										viewBox="0 0 24 24"
// 										strokeWidth={1.5}
// 										stroke="currentColor"
// 										className="size-6 "
// 									>
// 										<path
// 											strokeLinecap="round"
// 											strokeLinejoin="round"
// 											d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
// 										/>
// 										<path
// 											strokeLinecap="round"
// 											strokeLinejoin="round"
// 											d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
// 										/>
// 									</svg>
// 								) : (
// 									<svg
// 										xmlns="http://www.w3.org/2000/svg"
// 										fill="none"
// 										viewBox="0 0 24 24"
// 										strokeWidth={1.5}
// 										stroke="currentColor"
// 										className="size-6"
// 									>
// 										<path
// 											strokeLinecap="round"
// 											strokeLinejoin="round"
// 											d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
// 										/>
// 									</svg>
// 								)}
// 							</button>
// 						</div>
// 					</>

// 					<button
// 						className="btn btn-primary my-4 w-1/3 mx-auto"
// 						type="button"
// 						onClick={isLogin ? handleLogin : handleSignUp}
// 					>
// 						{loading ? (
// 							<span className="loading loading-bars loading-xs"></span>
// 						) : isLogin ? (
// 							"Login"
// 						) : (
// 							"Sign Up"
// 						)}
// 					</button>

// 					<p className="m-auto">
// 						{isLogin
// 							? "New User? Click here to"
// 							: "Existing User? Click here to"}
// 						<button
// 							type="button"
// 							className="btn btn-link p-0 my-0 mx-1 no-underline hover:underline"
// 							// className="text-primary cursor-pointer hover:underline ml-1"
// 							onClick={() => {
// 								setError("");
// 								navigate(isLogin ? "/signup" : "/login");
// 							}}
// 						>
// 							{isLogin ? "Sign Up" : "Login"}
// 						</button>
// 					</p>
// 					{error.length > 0 && (
// 						<div role="alert" className="alert alert-error alert-soft">
// 							<svg
// 								xmlns="http://www.w3.org/2000/svg"
// 								fill="none"
// 								viewBox="0 0 24 24"
// 								className="h-6 w-6 shrink-0 stroke-current"
// 							>
// 								<path
// 									strokeLinecap="round"
// 									strokeLinejoin="round"
// 									strokeWidth="2"
// 									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// 								></path>
// 							</svg>
// 							<span>{error}</span>
// 						</div>
// 					)}
// 				</form>
// 			</div>
// 		</>
// 		// 	<div className="min-h-screen grid md:grid-cols-2">
// 		// 		{/* Left playful panel */}
// 		// 		<div
// 		// 			className="hidden md:flex flex-col justify-center items-center
// 		//                 bg-gradient-to-br from-pink-500 via-rose-400 to-orange-300
// 		//                 text-white p-12"
// 		// 		>
// 		// 			<h1 className="text-4xl font-bold mb-4">
// 		// 				Less scrolling. More talking.
// 		// 			</h1>
// 		// 			<p className="text-lg opacity-90 max-w-md text-center">
// 		// 				Real people. Real conversations. No pressure.
// 		// 			</p>
// 		// 		</div>

// 		// 		{/* Login panel */}
// 		// 		<div className="flex items-center justify-center bg-rose-50">
// 		// 			<div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
// 		// 				<h2 className="text-2xl font-semibold mb-2">Welcome back 😊</h2>
// 		// 				<p className="text-sm text-gray-500 mb-6">We saved your seat.</p>

// 		// 				{/* form goes here */}
// 		// 				<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
// 		// 					<legend className="fieldset-legend">Login</legend>

// 		// 					<label className="label">Email</label>
// 		// 					<input type="email" className="input" placeholder="Email" />

// 		// 					<label className="label">Password</label>
// 		// 					<input type="password" className="input" placeholder="Password" />

// 		// 					<button className="btn btn-neutral mt-4">Login</button>
// 		// 				</fieldset>
// 		// 			</div>
// 		// 		</div>
// 		// 	</div>

// 		// 	<div className=" bg-[url(/background.jpg)] min-h-screen flex justify-center items-center">
// 		// 		<form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto ">
// 		// 			<legend className="fieldset-legend text-xl">
// 		// 				{isLogin ? "Login" : "Sign Up"}
// 		// 			</legend>
// 		// 			{!isLogin && (
// 		// 				<>
// 		// 					<label className="fieldset-label" htmlFor="firstName">
// 		// 						First Name
// 		// 					</label>
// 		// 					<input
// 		// 						type="text"
// 		// 						className="input"
// 		// 						value={firstName}
// 		// 						onChange={(e) => setFirstName(e.target.value)}
// 		// 						id="firstName"
// 		// 						name="firstName"
// 		// 						autoComplete="given-name"
// 		// 						minLength={1}
// 		// 						maxLength={20}
// 		// 					/>

// 		// 					<label className="fieldset-label" htmlFor="lastName">
// 		// 						Last Name
// 		// 					</label>
// 		// 					<input
// 		// 						type="text"
// 		// 						className="input"
// 		// 						value={lastName}
// 		// 						onChange={(e) => setLastName(e.target.value)}
// 		// 						id="lastName"
// 		// 						name="lastName"
// 		// 						autoComplete="family-name"
// 		// 						minLength={1}
// 		// 						maxLength={20}
// 		// 					/>
// 		// 				</>
// 		// 			)}

// 		// 			<>
// 		// 				<label className="fieldset-label" htmlFor="email">
// 		// 					Email
// 		// 				</label>
// 		// 				<input
// 		// 					type="email"
// 		// 					className="input"
// 		// 					value={emailId}
// 		// 					onChange={(e) => setEmailId(e.target.value)}
// 		// 					id="email"
// 		// 					name="email"
// 		// 					autoComplete="email"
// 		// 					required
// 		// 				/>
// 		// 			</>
// 		// 			<>
// 		// 				<label className="fieldset-label" htmlFor="password">
// 		// 					Password
// 		// 				</label>
// 		// 				<div className="flex items-center relative">
// 		// 					<input
// 		// 						type={showPassword ? "text" : "password"}
// 		// 						className="input"
// 		// 						value={password}
// 		// 						onChange={(e) => setPassword(e.target.value)}
// 		// 						id="password"
// 		// 						name="password"
// 		// 						autoComplete="current-password"
// 		// 						required
// 		// 					/>

// 		// 					<button
// 		// 						className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
// 		// 						type="button"
// 		// 						onClick={() => setShowPassword((prevState) => !prevState)}
// 		// 					>
// 		// 						{showPassword ? (
// 		// 							<svg
// 		// 								xmlns="http://www.w3.org/2000/svg"
// 		// 								fill="none"
// 		// 								viewBox="0 0 24 24"
// 		// 								strokeWidth={1.5}
// 		// 								stroke="currentColor"
// 		// 								className="size-6 "
// 		// 							>
// 		// 								<path
// 		// 									strokeLinecap="round"
// 		// 									strokeLinejoin="round"
// 		// 									d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
// 		// 								/>
// 		// 								<path
// 		// 									strokeLinecap="round"
// 		// 									strokeLinejoin="round"
// 		// 									d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
// 		// 								/>
// 		// 							</svg>
// 		// 						) : (
// 		// 							<svg
// 		// 								xmlns="http://www.w3.org/2000/svg"
// 		// 								fill="none"
// 		// 								viewBox="0 0 24 24"
// 		// 								strokeWidth={1.5}
// 		// 								stroke="currentColor"
// 		// 								className="size-6"
// 		// 							>
// 		// 								<path
// 		// 									strokeLinecap="round"
// 		// 									strokeLinejoin="round"
// 		// 									d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
// 		// 								/>
// 		// 							</svg>
// 		// 						)}
// 		// 					</button>
// 		// 				</div>
// 		// 			</>

// 		// 			<button
// 		// 				className="btn btn-primary my-4 w-1/3 mx-auto"
// 		// 				type="button"
// 		// 				onClick={isLogin ? handleLogin : handleSignUp}
// 		// 			>
// 		// 				{loading ? (
// 		// 					<span className="loading loading-bars loading-xs"></span>
// 		// 				) : isLogin ? (
// 		// 					"Login"
// 		// 				) : (
// 		// 					"Sign Up"
// 		// 				)}
// 		// 			</button>

// 		// 			<p className="m-auto">
// 		// 				{isLogin	? "New User? Click here to"
// 		// 					: "Existing User? Click here to"}
// 		// 				<button
// 		// 					type="button"
// 		// 					className="btn btn-link p-0 my-0 mx-1 no-underline hover:underline"
// 		// 					// className="text-primary cursor-pointer hover:underline ml-1"
// 		// 					onClick={() => {
// 		// 						setError("");
// 		// 						navigate(isLogin ? "/signup" : "/login");
// 		// 					}}
// 		// 				>
// 		// 					{isLogin ? "Sign Up" : "Login"}
// 		// 				</button>
// 		// 			</p>
// 		// 			{error.length > 0 && (
// 		// 				<div role="alert" className="alert alert-error alert-soft">
// 		// 					<svg
// 		// 						xmlns="http://www.w3.org/2000/svg"
// 		// 						fill="none"
// 		// 						viewBox="0 0 24 24"
// 		// 						className="h-6 w-6 shrink-0 stroke-current"
// 		// 					>
// 		// 						<path
// 		// 							strokeLinecap="round"
// 		// 							strokeLinejoin="round"
// 		// 							strokeWidth="2"
// 		// 							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// 		// 						></path>
// 		// 					</svg>
// 		// 					<span>{error}</span>
// 		// 				</div>
// 		// 			)}
// 		// 		</form>
// 		// 	</div>
// 		// </>
// 	);
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";

import { setUser } from "../../utils/userSlice";
// import { clearLoading, setLoading } from "../../utils/userSlice";	setIsLogin((prev) => !prev);
// import { YouAreIn } from "../features";
import YouAreIn from "../features/YouAreIn";
import { useAppDispatch } from "../../utils/hooks";
import api from "../../utils/axiosInstance";
import { loginZodSchema, signupZodSchema } from "../../utils/zodSchema";
import { ZodError } from "zod";
import { capitalizeFirstLetter } from "../../utils/helper";
const Login = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailId, setEmailId] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	// const [isLogin, setIsLogin] = useState(true);
	const [loading, setLoading] = useState(false);
	// const loading = useAppSelector((store: RootState) => store.user.loading);
	const isAuthenticated = useAppSelector((store) => store.user.isAuthenticated);

	const isLogin = location.pathname === "/login";
	const handleLogin = async () => {
		try {
			loginZodSchema.parse({ emailId, password });

			setShowPassword(false);
			// dispatch(setLoading());
			setLoading(true);
			await api
				.post(
					"/login",
					{
						emailId,
						password,
					},
					{
						withCredentials: true,
					},
				)
				.then((response) => {
					const userData = response?.data?.data;
					/**
					 * NOTE: DONOT check for these as it can be inconsistent
					 * statusText is optional sometimes its statusText="" thats why it was failing in prod(EC2)
					 * proxies rewrite it
					 * browsers treat it inconsistently
					 * Axios already rejects non-2xx by default
					 * response.status === 200 && response.statusText === "OK"
					 */
					if (userData) {
						dispatch(setUser(userData));
						// dispatch(clearLoading());
						setLoading(false);
						// navigate("/profile");
					}
				})
				.catch((err) => {
					// dispatch(clearLoading());
					setLoading(false);

					if (err.response) {
						let errMessage;
						if (err?.response?.data?.errors) {
							errMessage = err?.response?.data?.errors[0]?.message;
						} else {
							errMessage =
								err?.response?.data?.message || "Something went wrong.";
						}
						setError(errMessage);
						console.error(errMessage);
					} else if (err.request) {
						console.log(err.request);
						setError("Error: No response from Server ");
					} else {
						console.log("Error: ", err?.message);
						setError("Error connecting with server");
					}
				});
		} catch (err) {
			if (err instanceof ZodError) {
				setError(err?.errors[0]?.message);
				return;
			}
			console.error("Error: ", err);
		}
	};
	const handleSignUp = async () => {
		try {
			signupZodSchema.parse({
				emailId,
				password,
				firstName,
				lastName,
			});

			await api
				.post(
					"/signup",
					{
						firstName: capitalizeFirstLetter(firstName),
						lastName: capitalizeFirstLetter(lastName),
						emailId,
						password,
					},
					{ withCredentials: true },
				)
				.then((res) => {
					dispatch(setUser(res.data.data));
					navigate("/profile", { replace: true });
				})
				.catch((err) => {
					console.error(err);
					if (err.response) {
						if (err.response.status === 409) {
							console.log(err.response.data);
							setError(err.response.data.message);
						}
					}
				});
		} catch (err) {
			if (err instanceof ZodError) {
				setError(err?.errors[0]?.message);
				return;
			}
			console.error("Error: ", err);
		}
	};
	if (!isLogin && isAuthenticated) {
		return <YouAreIn />;
	}

	//TODO: when user is loggedIn and visits the /login page it should not come to Login Page redirect to home(feed)
	// return (
	// 	<>
	// 		<div className="min-h-screen grid md:grid-cols-2">
	// 			<div
	// 				className="hidden md:flex flex-col justify-center items-center text-white p-12
	// 				           bg-[linear-gradient(rgba(76,29,149,0.6),rgba(124,58,237,0.6)),url(/background.jpg)]
	// 				           bg-cover bg-center"
	// 			>
	// 				<h1 className="text-4xl font-bold mb-4 text-center animate-float-in">
	// 					Less scrolling. More talking.
	// 				</h1>
	// 				<p className="text-lg opacity-90 max-w-md text-center animate-float-in">
	// 					Real people. Real conversations. No pressure.
	// 				</p>
	// 			</div>
	// 			{/*<div className="flex items-center justify-center bg-violet-50 px-4">*/}
	// 			<div
	// 				className="relative flex flex-col justify-start md:justify-center px-4 pt-16 md:pt-0
	//             bg-violet-50 md:bg-none"
	// 			>
	// 				<div className="md:hidden w-full max-w-md mb-8 text-center ">
	// 					<h1 className="text-3xl font-semibold text-violet-700">
	// 						Less scrolling.
	// 					</h1>
	// 					<p className="mt-2 text-gray-600">
	// 						More talking. Real people, real conversations.
	// 					</p>
	// 				</div>
	// 				<form
	// 					className="relative z-10 w-full max-w-md bg-white/95
	//             backdrop-blur-sm rounded-2xl p-8
	//             shadow-[0_20px_40px_rgba(124,58,237,0.18)]
	//             animate-float-in"
	// 				>
	// 					<h2 className="text-2xl font-semibold mb-1">
	// 						{isLogin ? "Welcome back 💜" : "Let’s get you started ✨"}
	// 					</h2>
	// 					<p className="text-sm text-gray-500 mb-6">
	// 						{isLogin
	// 							? "Good conversations await."
	// 							: "Your people are closer than you think."}
	// 					</p>

	// 					{!isLogin && (
	// 						<>
	// 							<div className="mb-4">
	// 								<label
	// 									className="block text-sm font-medium text-gray-700 mb-1"
	// 									htmlFor="firstName"
	// 								>
	// 									First Name
	// 								</label>
	// 								<input
	// 									aria-invalid={!!error}
	// 									type="text"
	// 									className="w-full px-4 py-3 rounded-xl border border-gray-300
	//           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
	//           transition-all duration-200"
	// 									value={firstName}
	// 									onChange={(e) => setFirstName(e.target.value)}
	// 									id="firstName"
	// 									name="firstName"
	// 									autoComplete="given-name"
	// 									minLength={1}
	// 									maxLength={20}
	// 								/>
	// 							</div>
	// 							<div className="mb-4">
	// 								<label
	// 									className="block text-sm font-medium text-gray-700 mb-1"
	// 									htmlFor="lastName"
	// 								>
	// 									Last Name
	// 								</label>
	// 								<input
	// 									aria-invalid={!!error}
	// 									type="text"
	// 									className="w-full px-4 py-3 rounded-xl border border-gray-300
	//           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
	//           transition-all duration-200"
	// 									value={lastName}
	// 									onChange={(e) => setLastName(e.target.value)}
	// 									id="lastName"
	// 									name="lastName"
	// 									autoComplete="family-name"
	// 									minLength={1}
	// 									maxLength={20}
	// 								/>
	// 							</div>
	// 						</>
	// 					)}

	// 					<div className="mb-4">
	// 						<label
	// 							className="block text-sm font-medium text-gray-700 mb-1"
	// 							htmlFor="email"
	// 						>
	// 							Email
	// 						</label>
	// 						<input
	// 							aria-invalid={!!error}
	// 							type="email"
	// 							className="w-full px-4 py-3 rounded-xl border border-gray-300
	//           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
	//           transition-all duration-200"
	// 							value={emailId}
	// 							onChange={(e) => setEmailId(e.target.value)}
	// 							id="email"
	// 							name="email"
	// 							autoComplete="email"
	// 							required
	// 						/>
	// 					</div>
	// 					<div className="mb-4">
	// 						<label
	// 							htmlFor="password"
	// 							className="block text-sm font-medium text-gray-700 mb-1"
	// 						>
	// 							Password
	// 						</label>

	// 						<div className="relative group">
	// 							<input
	// 								type={showPassword ? "text" : "password"}
	// 								value={password}
	// 								onChange={(e) => setPassword(e.target.value)}
	// 								className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300
	//                 focus:border-violet-500 focus:ring-2 focus:ring-violet-400
	//                 transition-all duration-200"
	// 							/>

	// 							<button
	// 								type="button"
	// 								aria-label={showPassword ? "Hide password" : "Show password"}
	// 								onClick={() => setShowPassword((prev) => !prev)}
	// 								className="absolute inset-y-0 right-3 flex items-center
	//                 text-gray-400 hover:text-violet-500
	//                 opacity-0 scale-90
	//                 group-hover:opacity-100
	//                 group-focus-within:opacity-100
	//                 group-hover:scale-100
	//                 group-focus-within:scale-100
	//                 transition-all duration-200"
	// 							>
	// {showPassword ? (
	// 	<svg
	// 		xmlns="http://www.w3.org/2000/svg"
	// 		fill="none"
	// 		viewBox="0 0 24 24"
	// 		strokeWidth={1.5}
	// 		stroke="currentColor"
	// 		className="size-6 "
	// 	>
	// 		<path
	// 			strokeLinecap="round"
	// 			strokeLinejoin="round"
	// 			d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
	// 		/>
	// 		<path
	// 			strokeLinecap="round"
	// 			strokeLinejoin="round"
	// 			d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
	// 		/>
	// 	</svg>
	// ) : (
	// 	<svg
	// 		xmlns="http://www.w3.org/2000/svg"
	// 		fill="none"
	// 		viewBox="0 0 24 24"
	// 		strokeWidth={1.5}
	// 		stroke="currentColor"
	// 		className="size-6"
	// 	>
	// 		<path
	// 			strokeLinecap="round"
	// 			strokeLinejoin="round"
	// 			d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
	// 		/>
	// 	</svg>
	// )}
	// 							</button>
	// 						</div>
	// 					</div>

	// 					<button
	// 						className="w-full mt-6 py-3 rounded-xl text-white font-medium
	// 						           bg-violet-600 hover:bg-violet-700
	// 						           hover:scale-[1.03] active:scale-95
	// 						           transition-transform duration-150"
	// 						type="button"
	// 						onClick={isLogin ? handleLogin : handleSignUp}
	// 					>
	// 						{loading ? (
	// 							<span className="inline-flex items-center gap-2">
	// 								<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
	// 								Just a sec
	// 							</span>
	// 						) : isLogin ? (
	// 							"Let’s go →"
	// 						) : (
	// 							"Start chatting →"
	// 						)}
	// 					</button>

	// 					<p className="mt-4">
	// 						{isLogin
	// 							? "New User? Click here to"
	// 							: "Existing User? Click here to"}
	// 						<button
	// 							type="button"
	// 							disabled={loading}
	// 							className="ml-1 text-violet-600 font-medium
	// 							           hover:underline hover:translate-x-0.5
	// 							           transition-all"
	// 							onClick={() => {
	// 								setError("");
	// 								navigate(isLogin ? "/signup" : "/login");
	// 							}}
	// 						>
	// 							{isLogin ? "Sign Up" : "Login"}
	// 						</button>
	// 					</p>
	// 					{error.length > 0 && (
	// 						<div className="mt-4 rounded-xl bg-red-50 text-red-600 px-4 py-3 text-sm animate-shake">
	// 							<span>{error}</span>
	// 						</div>
	// 					)}
	// 				</form>
	// 			</div>
	// 		</div>
	// 	</>
	// );

	return (
		<div className="min-h-screen grid md:grid-cols-2">
			{/* LEFT: Desktop visual panel */}
			<div
				className="hidden md:flex flex-col justify-center items-center text-white p-12
                 bg-[linear-gradient(rgba(76,29,149,0.6),rgba(124,58,237,0.6)),url(/background.jpg)]
                 bg-cover bg-center"
			>
				<h1 className="text-4xl font-bold mb-4 text-center animate-float-in">
					Less scrolling. More talking.
				</h1>
				<p className="text-lg opacity-90 max-w-md text-center animate-float-in">
					Real people. Real conversations. No pressure.
				</p>
			</div>

			{/* RIGHT: Form column */}
			<div
				className="relative flex flex-col justify-start md:justify-center
                 px-4 pt-16 md:pt-0 bg-violet-50 md:bg-none"
			>
				{/* Mobile background image */}
				<div
					className="absolute inset-0 md:hidden
                   bg-[linear-gradient(rgba(255,255,255,0.88),rgba(255,255,255,0.7)),url(/background.jpg)]
                   bg-cover bg-center"
					aria-hidden="true"
				/>

				{/* Mobile header */}
				<div className="relative z-10 w-full max-w-md mx-auto mb-8 text-center md:hidden">
					<h1 className="text-3xl font-semibold text-violet-700">
						Less scrolling.
					</h1>
					<p className="mt-2 text-gray-600">
						More talking. Real people, real conversations.
					</p>
				</div>

				{/* Auth form */}
				<form
					className="relative z-10 w-full max-w-md mx-auto
                   bg-white/95 backdrop-blur-sm
                   rounded-2xl p-8
                   shadow-[0_20px_40px_rgba(124,58,237,0.18)]
                   animate-float-in"
				>
					<h2 className="text-2xl font-semibold mb-1">
						{isLogin ? "Welcome back 💜" : "Let’s get you started ✨"}
					</h2>

					<p className="text-sm text-gray-500 mb-6">
						{isLogin
							? "Good conversations await."
							: "Your people are closer than you think."}
					</p>

					{/* Signup-only fields */}
					{!isLogin && (
						<>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									First Name
								</label>
								<input
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="w-full px-4 py-3 rounded-xl border border-gray-300
                           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
                           transition-all"
								/>
							</div>

							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Last Name
								</label>
								<input
									type="text"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className="w-full px-4 py-3 rounded-xl border border-gray-300
                           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
                           transition-all"
								/>
							</div>
						</>
					)}

					{/* Email */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email
						</label>
						<input
							type="email"
							value={emailId}
							onChange={(e) => setEmailId(e.target.value)}
							className="w-full px-4 py-3 rounded-xl border border-gray-300
                       focus:border-violet-500 focus:ring-2 focus:ring-violet-400
                       transition-all"
						/>
					</div>

					{/* Password */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>

						<div className="relative group">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300
                         focus:border-violet-500 focus:ring-2 focus:ring-violet-400
                         transition-all"
							/>

							<button
								type="button"
								onClick={() => setShowPassword((p) => !p)}
								className="absolute inset-y-0 right-3 flex items-center
                         text-gray-400 hover:text-violet-500
                         opacity-0 scale-90
                         group-hover:opacity-100
                         group-focus-within:opacity-100
                         group-hover:scale-100
                         group-focus-within:scale-100
                         transition-all"
							>
								{showPassword ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6 "
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>

					{/* Submit */}
					<button
						type="button"
						onClick={isLogin ? handleLogin : handleSignUp}
						className="w-full mt-6 py-3 rounded-xl text-white font-medium
                     bg-violet-600 hover:bg-violet-700
                     hover:scale-[1.03] active:scale-95
                     transition-transform"
					>
						{loading
							? "Just a sec…"
							: isLogin
								? "Let’s go →"
								: "Start chatting →"}
					</button>

					{/* Switch */}
					<p className="mt-4 text-sm text-center">
						{isLogin ? "New user?" : "Already have an account?"}
						<button
							type="button"
							className="ml-1 text-violet-600 font-medium hover:underline"
							onClick={() => navigate(isLogin ? "/signup" : "/login")}
						>
							{isLogin ? "Sign up" : "Login"}
						</button>
					</p>

					{/* Error */}
					{error && (
						<div className="mt-4 rounded-xl bg-red-50 text-red-600 px-4 py-3 text-sm">
							{error}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default Login;
