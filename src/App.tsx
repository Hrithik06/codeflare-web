import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { isAxiosError } from "axios";

import { Body, Login, Loader, AuthLayout } from "./components"; // These load instantly
import { useAppDispatch } from "./utils/hooks";
import { clearUser, setUser } from "./utils/userSlice";
import api from "./utils/axiosInstance";

// Lazy-loaded components
const Feed = lazy(() => import("./components/Feed"));
const Profile = lazy(() => import("./components/Profile"));
const Connections = lazy(() => import("./components/Connections"));
const Requests = lazy(() => import("./components/Requests"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./components/RefundPolicy"));
const TermsOfService = lazy(() => import("./components/TermsOfService"));
const NotFound = lazy(() => import("./components/NotFound"));
const ErrorPage = lazy(() => import("./components/ErrorPage"));
const UploadAndDisplayImage = lazy(
	() => import("./components/UploadAndDisplayImage"),
);

function App() {
	const [bootstrapped, setBootstrapped] = useState(false);

	const dispatch = useAppDispatch();
	const fetchUser = async () => {
		try {
			const res = await api.get("profile/view", {
				withCredentials: true,
			});

			dispatch(setUser(res.data.data));
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === 401) {
				dispatch(clearUser());
			} else {
				console.error("Auth bootstrap error:", err);
			}
		}
	};
	useEffect(() => {
		fetchUser().finally(() => setBootstrapped(true));
	}, []);
	if (!bootstrapped) {
		return (
			<div className="flex p-10 w-full justify-around">
				<Loader />
			</div>
		);
	}
	return (
		<BrowserRouter>
			{/* Suspense for all lazy-loaded routes */}
			<Suspense
				fallback={
					<div className="flex p-10 w-full justify-around ">
						<Loader />
					</div>
				}
			>
				<Routes>
					{/* PUBLIC AUTH ROUTES */}
					{/* LOGIN ONLY (guarded) */}
					<Route element={<AuthLayout />}>
						<Route path="/login" element={<Login />} />
					</Route>

					{/* SIGNUP (unguarded transition) */}
					<Route path="/signup" element={<Login />} />

					{/* APP ROUTES */}
					<Route path="/" element={<Body />}>
						<Route
							path="upload-and-display-image"
							element={<UploadAndDisplayImage />}
						/>
						{/* No suspense, loads instantly */}
						<Route index element={<Feed />} />
						<Route path="profile" element={<Profile />} />
						<Route path="connections" element={<Connections />} />
						<Route path="requests" element={<Requests />} />
						<Route path="contact-us" element={<ContactUs />} />
						<Route path="privacy-policy" element={<PrivacyPolicy />} />
						<Route path="refunds" element={<RefundPolicy />} />
						<Route path="terms-of-service" element={<TermsOfService />} />

						<Route path="*" element={<NotFound />} />
					</Route>
					<Route path="/error" element={<ErrorPage />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
