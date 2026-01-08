import React, { useState } from "react";
import { RootState } from "../../utils/appStore";
import {
	useAppDispatch,
	useAppSelector,
	useProfileImage,
} from "../../utils/hooks";
import { clearUser } from "../../utils/userSlice";
import { clearFeed } from "../../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import { clearConnections } from "../../utils/connectionSlice";
import Logo from "./Logo";

const NavBar = (): React.ReactElement => {
	const userData = useAppSelector((store: RootState) => store.user.user);
	const isAuthenticated = useAppSelector(
		(store: RootState) => store.user.isAuthenticated,
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const handleLogout = async () => {
		try {
			await api.get("/logout", { withCredentials: true });
			dispatch(clearUser());
			dispatch(clearFeed());
			dispatch(clearConnections());
			navigate("/login");
		} catch {
			navigate("/error");
		}
	};
	const handleLogin = () => {
		navigate("/login");
	};
	// if (isAuthenticated) {
	const imageUrl = useProfileImage(userData?.profileImageMeta);
	// }
	// return (
	// 	<div className="navbar bg-base-100 shadow-sm px-4 sm:px-10 ">
	// 		<div className="flex-1">
	// 			<Link className="text-md sm:text-xl" to="/">
	// 				GitTogether
	// 			</Link>
	// 		</div>

	// 		<>
	// 			{isAuthenticated && userData ? (
	// 				<div className="flex gap-2 items-center text-sm sm:text-base">
	// 					<div>
	// 						Hi {String.fromCodePoint(0x1f44b)},{userData?.firstName}{" "}
	// 					</div>
	// 					<div className="dropdown dropdown-end">
	// 						<div
	// 							tabIndex={0}
	// 							role="button"
	// 							className="btn btn-ghost btn-circle avatar"
	// 						>
	// 							<div className="w-10 rounded-full">
	// 								<img alt="profile-image" src={imageUrl} />
	// 							</div>
	// 						</div>

	// 						<ul
	// 							tabIndex={0}
	// 							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
	// 						>
	// 							<li>
	// 								<Link className="justify-between" to="/profile">
	// 									Profile
	// 									<span className="badge badge-soft badge-primary">New</span>
	// 								</Link>
	// 							</li>
	// 							<li>
	// 								<Link to="/connections">Connections</Link>
	// 							</li>
	// 							<li>
	// 								<Link to="/requests">Requests</Link>
	// 							</li>
	// 							<li></li>
	// 							<li>
	// 								<p onClick={handleLogout}>Logout</p>
	// 							</li>
	// 						</ul>
	// 					</div>
	// 				</div>
	// 			) : (
	// 				<button
	// 					// to={"/login"}
	// 					onClick={handleLogin}
	// 					className="rounded-md bg-violet-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 hover:rounded-4xl"
	// 				>
	// 					Login
	// 				</button>
	// 			)}
	// 		</>
	// 	</div>
	// );
	return (
		<header className="sticky top-0 z-40 bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
				{/* Logo */}
				<Link to="/" className="text-lg sm:text-xl font-semibold text-gray-900">
					{/*GitTogether*/}
					<Logo />
				</Link>

				{/* Right side */}
				{isAuthenticated && userData ? (
					<div className="relative flex items-center gap-3">
						<span className="hidden sm:block text-sm text-gray-600">
							Hi 👋 {userData.firstName}
						</span>

						{/* Avatar button */}
						<button
							onClick={() => setOpen((v) => !v)}
							className="w-10 h-10 rounded-full overflow-hidden
                         ring-2 ring-transparent hover:ring-violet-300
                         transition"
						>
							<img
								src={imageUrl}
								alt="profile"
								className="w-full h-full object-cover"
							/>
						</button>

						{/* Dropdown */}
						{open && (
							<>
								{/* click outside overlay */}
								<div
									className="fixed inset-0 z-30"
									onClick={() => setOpen(false)}
								/>

								<div
									className="absolute right-0 top-12 z-40 w-52
                             bg-white rounded-xl shadow-lg
                             border border-gray-100 py-2"
								>
									<Link
										to="/profile"
										className="block px-4 py-2 text-sm text-gray-700
                               hover:bg-violet-50"
										onClick={() => setOpen(false)}
									>
										Profile
									</Link>

									<Link
										to="/connections"
										className="block px-4 py-2 text-sm text-gray-700
                               hover:bg-violet-50"
										onClick={() => setOpen(false)}
									>
										Connections
									</Link>

									<Link
										to="/requests"
										className="block px-4 py-2 text-sm text-gray-700
                               hover:bg-violet-50"
										onClick={() => setOpen(false)}
									>
										Requests
									</Link>

									<div className="my-1 h-px bg-gray-100" />

									<button
										onClick={handleLogout}
										className="w-full text-left px-4 py-2 text-sm
                               text-red-600 hover:bg-red-50"
									>
										Logout
									</button>
								</div>
							</>
						)}
					</div>
				) : (
					<button
						onClick={handleLogin}
						className="rounded-md bg-violet-600 px-4 py-2
                       text-sm font-medium text-white
                       hover:bg-violet-700 transition hover:rounded-xl"
					>
						Login
					</button>
				)}
			</div>
		</header>
	);
};

export default NavBar;

// import { Link } from "react-router-dom";
// import { useState } from "react";

// const NavBar = ({
// 	isAuthenticated,
// 	userData,
// 	imageUrl,
// 	handleLogout,
// 	handleLogin,
// }: any) => {
// 	const [open, setOpen] = useState(false);

// 	return (
// 		<header className="sticky top-0 z-40 bg-white border-b border-gray-200">
// 			<div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
// 				{/* Logo */}
// 				<Link to="/" className="text-lg sm:text-xl font-semibold text-gray-900">
// 					GitTogether
// 				</Link>

// 				{/* Right side */}
// 				{isAuthenticated && userData ? (
// 					<div className="relative flex items-center gap-3">
// 						<span className="hidden sm:block text-sm text-gray-600">
// 							Hi 👋 {userData.firstName}
// 						</span>

// 						{/* Avatar button */}
// 						<button
// 							onClick={() => setOpen((v) => !v)}
// 							className="w-10 h-10 rounded-full overflow-hidden
//                          ring-2 ring-transparent hover:ring-violet-300
//                          transition"
// 						>
// 							<img
// 								src={imageUrl}
// 								alt="profile"
// 								className="w-full h-full object-cover"
// 							/>
// 						</button>

// 						{/* Dropdown */}
// 						{open && (
// 							<>
// 								{/* click outside overlay */}
// 								<div
// 									className="fixed inset-0 z-30"
// 									onClick={() => setOpen(false)}
// 								/>

// 								<div
// 									className="absolute right-0 top-12 z-40 w-52
//                              bg-white rounded-xl shadow-lg
//                              border border-gray-100 py-2"
// 								>
// 									<Link
// 										to="/profile"
// 										className="block px-4 py-2 text-sm text-gray-700
//                                hover:bg-violet-50"
// 										onClick={() => setOpen(false)}
// 									>
// 										Profile
// 									</Link>

// 									<Link
// 										to="/connections"
// 										className="block px-4 py-2 text-sm text-gray-700
//                                hover:bg-violet-50"
// 										onClick={() => setOpen(false)}
// 									>
// 										Connections
// 									</Link>

// 									<Link
// 										to="/requests"
// 										className="block px-4 py-2 text-sm text-gray-700
//                                hover:bg-violet-50"
// 										onClick={() => setOpen(false)}
// 									>
// 										Requests
// 									</Link>

// 									<div className="my-1 h-px bg-gray-100" />

// 									<button
// 										onClick={handleLogout}
// 										className="w-full text-left px-4 py-2 text-sm
//                                text-red-600 hover:bg-red-50"
// 									>
// 										Logout
// 									</button>
// 								</div>
// 							</>
// 						)}
// 					</div>
// 				) : (
// 					<button
// 						onClick={handleLogin}
// 						className="rounded-xl bg-violet-600 px-4 py-2
//                        text-sm font-medium text-white
//                        hover:bg-violet-700 transition"
// 					>
// 						Login
// 					</button>
// 				)}
// 			</div>
// 		</header>
// 	);
// };
