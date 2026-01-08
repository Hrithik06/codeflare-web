// import { useState, JSX, useRef } from "react";
// import { UserBase } from "../../interface/UserInterface";
// import api from "../../utils/axiosInstance";
// import { useAppDispatch, useProfileImage } from "../../utils/hooks";
// import { removeUserFromFeed } from "../../utils/feedSlice";
// type UserProps = {
// 	user: UserBase;
// };
// import { isAxiosError } from "axios";
// type ToastProps = { message: string; type: string };
// const Toast = ({ message, type }: ToastProps) => {
// 	return (
// 		<div className="toast toast-right toast-bottom">
// 			<div className={`alert alert-${type}`}>
// 				<span>{message}</span>
// 			</div>
// 		</div>
// 	);
// };
// const UserCard = ({ user }: UserProps): JSX.Element => {
// 	const [toast, setToast] = useState<ToastProps | null>(null);

// 	const dispatch = useAppDispatch();
// 	const {
// 		_id,
// 		firstName,
// 		lastName,
// 		about,
// 		age,
// 		gender,
// 		skills,
// 		profileImageMeta,
// 	} = user;

// 	const timeoutRef = useRef<number | null>(null);

// 	const showToast = (message: string, type: string) => {
// 		if (timeoutRef.current) {
// 			clearTimeout(timeoutRef.current);
// 		}

// 		setToast({ message, type });

// 		timeoutRef.current = window.setTimeout(() => {
// 			setToast(null);
// 			timeoutRef.current = null;
// 		}, 3000);
// 	};

// 	const handleSendRequest = async (status: string) => {
// 		await api
// 			.post(`/request/send/${status}/${_id}`, {}, { withCredentials: true })
// 			.then((res) => {
// 				if (res?.data?.success) {
// 					dispatch(removeUserFromFeed(_id));
// 				} else {
// 					console.log(res);
// 				}
// 			})
// 			.catch((err) => {
// 				if (isAxiosError(err)) {
// 					const status = err.response?.status;
// 					const message = err.response?.data?.message;
// 					console.log(err.response);
// 					if (status === 403) {
// 						showToast(message, "error");
// 						return;
// 					}
// 					if (status === 500) {
// 						const message = err.response?.data?.message;
// 						showToast(message, "error");
// 						return;
// 					}
// 				}

// 				console.error("ERROR: ", err);
// 				const message = err.response?.data?.message;
// 				showToast(message, "error");
// 			});
// 	};
// 	//custom hook
// 	const imageUrl = useProfileImage(profileImageMeta);

// 	return (
// 		<>
// 			<div className="card sm:w-80 shadow-sm m-4 bg-white dark:bg-zinc-900">
// 				<figure className="h-3/4">
// 					<img src={imageUrl} alt="photo" className="w-full bg-gray-400" />
// 				</figure>
// 				<div className="card-body h-1/4">
// 					<h2 className="card-title">{`${firstName} ${lastName}`}</h2>
// 					<h3 className="card-actions">{`${age || "Age"}, ${
// 						gender || "Gender"
// 					}`}</h3>
// 					<p>{about || "Bio"}</p>
// 					{/* <div className="flex justify-start gap-2 ">
//           <span className="italic">Top Skills:</span> */}
// 					<div className="flex justify-start gap-1">
// 						{skills.slice(0, 2).map((x) => (
// 							<span
// 								className="bg-blue-200 dark:bg-gray-800 border rounded-full border-gray-500 inline-block px-2"
// 								key={x}
// 							>
// 								{x}
// 							</span>
// 						))}
// 					</div>
// 					{/* </div> */}
// 					<div className="card-actions justify-evenly">
// 						<button
// 							className="btn btn-primary rounded-full"
// 							name="ignored-btn"
// 							onClick={() => handleSendRequest("ignored")}
// 						>
// 							<svg
// 								xmlns="http://www.w3.org/2000/svg"
// 								fill="none"
// 								viewBox="0 0 24 24"
// 								strokeWidth={1.5}
// 								stroke="currentColor"
// 								className="size-6"
// 							>
// 								<path
// 									strokeLinecap="round"
// 									strokeLinejoin="round"
// 									d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
// 								/>
// 							</svg>
// 						</button>
// 						<button
// 							className="btn btn-success rounded-full"
// 							name="interested-btn"
// 							onClick={() => handleSendRequest("interested")}
// 						>
// <svg
// 	xmlns="http://www.w3.org/2000/svg"
// 	fill="none"
// 	viewBox="0 0 24 24"
// 	strokeWidth={1.5}
// 	stroke="currentColor"
// 	className="size-6"
// >
// 	<path
// 		strokeLinecap="round"
// 		strokeLinejoin="round"
// 		d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
// 	/>
// </svg>
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 			{toast && <Toast message={toast.message} type={toast.type} />}
// 		</>
// 	);
// };

// export default UserCard;

// import { JSX } from "react";
// import { UserBase } from "../../interface/UserInterface";
// import { useToast } from "../../utils/ToastContext";

// import api from "../../utils/axiosInstance";
// import { useAppDispatch, useProfileImage } from "../../utils/hooks";
// import { removeUserFromFeed } from "../../utils/feedSlice";
// type UserCardProps = {
// 	user: UserBase;
// 	onDecision: () => void;
// };

// import { isAxiosError } from "axios";

// const UserCard = ({ user, onDecision }: UserCardProps): JSX.Element => {
// 	const { showToast } = useToast();

// 	const dispatch = useAppDispatch();
// 	const {
// 		_id,
// 		firstName,
// 		lastName,
// 		about,
// 		age,
// 		gender,
// 		skills,
// 		profileImageMeta,
// 	} = user;

// 	const handleSendRequest = async (status: string): Promise<boolean> => {
// 		try {
// 			const res = await api.post(
// 				`/request/send/${status}/${_id}`,
// 				{},
// 				{ withCredentials: true },
// 			);

// 			if (res?.data?.success) {
// 				dispatch(removeUserFromFeed(_id));
// 				return true;
// 			}

// 			showToast(res.data?.message || "Something went wrong", "error");
// 			return false;
// 		} catch (err) {
// 			if (isAxiosError(err)) {
// 				const message = err.response?.data?.message || "Request failed";
// 				showToast(message, "error");
// 				return false;
// 			}

// 			showToast("Unexpected error occurred", "error");
// 			return false;
// 		}
// 	};

// 	//custom hook
// 	const imageUrl = useProfileImage(profileImageMeta);
// 	const handleIgnore = async () => {
// 		const success = await handleSendRequest("ignored");
// 		if (success) onDecision();
// 	};

// 	const handleInterested = async () => {
// 		const success = await handleSendRequest("interested");
// 		if (success) onDecision();
// 	};

// 	return (
// 		<div
// 			className="w-80 bg-white rounded-2xl shadow-md
//                 hover:shadow-xl transition-all"
// 		>
// 			{/* Image */}
// 			<div className="h-80 overflow-hidden rounded-t-2xl bg-gray-200">
// 				<img
// 					src={imageUrl}
// 					alt="profile"
// 					className="w-full h-full object-fill
//              saturate-90 contrast-95"
// 				/>
// 			</div>

// 			{/* Content */}
// 			<div className="p-4">
// 				<h2 className="text-lg font-semibold">
// 					{firstName} {lastName}
// 				</h2>

// 				<p className="text-sm text-gray-500 mb-2">
// 					{age || "Age"} · {gender || "Gender"}
// 				</p>

// 				<p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
// 					{about || "No bio available"}
// 				</p>

// 				{/* Skills */}
// 				<div className="flex gap-2 flex-wrap mb-4">
// 					{skills.slice(0, 2).map((skill) => (
// 						<span
// 							key={skill}
// 							className="px-3 py-1 rounded-full text-xs
//                      bg-violet-50 text-violet-600"
// 						>
// 							{skill}
// 						</span>
// 					))}
// 				</div>

// 				{/* Actions */}
// 				<div className="flex justify-between">
// 					<button onClick={handleIgnore}>Pass</button>

// 					<button onClick={handleInterested}>Connect</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default UserCard;

import { JSX, forwardRef, useEffect, useImperativeHandle } from "react";
import { motion, useAnimation } from "framer-motion";
import { isAxiosError } from "axios";

import { UserBase } from "../../interface/UserInterface";
import { useToast } from "../../utils/ToastContext";
import api from "../../utils/axiosInstance";
import { useAppDispatch, useProfileImage } from "../../utils/hooks";
import { removeUserFromFeed } from "../../utils/feedSlice";

export type UserCardHandle = {
	swipeLeft: () => void;
	swipeRight: () => void;
};

const UserCard = forwardRef<UserCardHandle, { user: UserBase }>(
	({ user }, ref): JSX.Element => {
		const { showToast } = useToast();
		const dispatch = useAppDispatch();
		const controls = useAnimation();

		const {
			_id,
			firstName,
			lastName,
			about,
			age,
			gender,
			skills,
			profileImageMeta,
		} = user;

		const imageUrl = useProfileImage(profileImageMeta);

		// ✅ DEFINE side-effect logic FIRST
		const handleSendRequest = async (
			status: "ignored" | "interested",
		): Promise<boolean> => {
			try {
				const res = await api.post(
					`/request/send/${status}/${_id}`,
					{},
					{ withCredentials: true },
				);

				if (res?.data?.success) {
					dispatch(removeUserFromFeed(_id));
					return true;
				}

				showToast(res.data?.message || "Something went wrong", "error");
				return false;
			} catch (err) {
				if (isAxiosError(err)) {
					showToast(err.response?.data?.message || "Request failed", "error");
					return false;
				}

				showToast("Unexpected error occurred", "error");
				return false;
			}
		};

		// ✅ THEN define control logic
		const decide = async (direction: "left" | "right") => {
			const success =
				direction === "right"
					? await handleSendRequest("interested")
					: await handleSendRequest("ignored");

			if (!success) {
				await controls.start({ x: 0, rotate: 0 });
				return;
			}

			await controls.start({
				x: direction === "right" ? 600 : -600,
				rotate: direction === "right" ? 20 : -20,
				opacity: 0,
			});
		};

		// ✅ FINALLY expose ref actions
		useImperativeHandle(ref, () => ({
			swipeLeft: () => decide("left"),
			swipeRight: () => decide("right"),
		}));
		useEffect(() => {
			controls.set({ x: 0, rotate: 0, opacity: 1 });
		}, [user._id]);

		return (
			<motion.div
				drag="x"
				dragConstraints={{ left: 0, right: 0 }}
				dragElastic={0.2}
				animate={controls}
				initial={{ x: 0, rotate: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
				onDragEnd={(_, info) => {
					if (info.offset.x > 120) {
						decide("right");
					} else if (info.offset.x < -120) {
						decide("left");
					} else {
						controls.start({ x: 0, rotate: 0 });
					}
				}}
				className="w-80 bg-white rounded-2xl shadow-md"
			>
				{/* Image */}
				<div className="h-80 overflow-hidden rounded-t-2xl bg-gray-200">
					<img
						src={imageUrl}
						alt="profile"
						className="w-full h-full object-fill"
					/>
				</div>

				{/* Content */}
				<div className="p-4">
					<h2 className="text-lg font-semibold">
						{firstName} {lastName}
					</h2>

					<p className="text-sm text-gray-500 mb-2">
						{age || "Age"} · {gender || "Gender"}
					</p>

					<p className="text-sm text-gray-700 mb-3 line-clamp-2">
						{about || "No bio available"}
					</p>

					<div className="flex gap-2 flex-wrap">
						{skills.slice(0, 2).map((skill) => (
							<span
								key={skill}
								className="px-3 py-1 rounded-full text-xs bg-violet-50 text-violet-600"
							>
								{skill}
							</span>
						))}
					</div>
				</div>
			</motion.div>
		);
	},
);

export default UserCard;
