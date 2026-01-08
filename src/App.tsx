import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { isAxiosError } from "axios";

import { Body, Loader, AuthLayout } from "./components/layout"; // These load instantly
import Login from "./components/pages/Login";
import { useAppDispatch } from "./utils/hooks";
import { clearUser, setUser } from "./utils/userSlice";
import api from "./utils/axiosInstance";
import Test from "./components/features/Test";

// Lazy-loaded components
const Feed = lazy(() => import("./components/pages/Feed"));
const Profile = lazy(() => import("./components/pages/Profile"));
const Connections = lazy(() => import("./components/pages/Connections"));
const Requests = lazy(() => import("./components/pages/Requests"));
const ContactUs = lazy(() => import("./components/pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("./components/pages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./components/pages/RefundPolicy"));
const TermsOfService = lazy(() => import("./components/pages/TermsOfService"));
const NotFound = lazy(() => import("./components/pages/NotFound"));
const ErrorPage = lazy(() => import("./components/pages/ErrorPage"));
const Chat = lazy(() => import("./components/pages/Chat"));

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
					<Route path="/test" element={<Test />} />

					{/* APP ROUTES */}
					<Route path="/" element={<Body />}>
						//FIXME: Feed, Profile, Connections, Requests, Chat should be
						protected, should not be accessible to unauthorised users
						<Route index element={<Feed />} />
						<Route path="profile" element={<Profile />} />
						<Route path="connections" element={<Connections />} />
						<Route path="requests" element={<Requests />} />
						<Route path="chat/:targetUserId" element={<Chat />} />
						<Route path="contact-us" element={<ContactUs />} />
						<Route path="privacy-policy" element={<PrivacyPolicy />} />
						<Route path="refunds" element={<RefundPolicy />} />
						<Route path="terms-of-service" element={<TermsOfService />} />
						<Route path="error" element={<ErrorPage />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
