import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { addRequests, removeRequest } from "../../utils/requestSlice";
import { RootState } from "../../utils/appStore";
// import { ConnectionCard } from "../ui";
import ConnectionCard from "../ui/ConnectionCard";
// import { clearLoading, setLoading } from "../../utils/userSlice";
//
const EMPTY_IMAGE = "/EmptyImage.svg";
//
const Requests = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const requests = useAppSelector((store: RootState) => store.requests);
	// const loading = useAppSelector((store: RootState) => store.user.loading);
	const [loading, setLoading] = useState(false);

	const fetchRequests = async () => {
		// dispatch(setLoading());
		setLoading(true);
		await api
			.get("/user/requests/received", { withCredentials: true })
			.then((res) => {
				dispatch(addRequests(res.data.data));
				// dispatch(clearLoading());
				setLoading(false);
			})
			.catch((err) => {
				// dispatch(clearLoading());
				setLoading(false);
				console.error(err);
			});
	};

	const handleReviewRequest = async (status: string, connReqId: string) => {
		await api
			.post(
				`/request/review/${status}/${connReqId}`,
				{},
				{ withCredentials: true },
			)
			.then((res) => {
				if (res.data.success) {
					dispatch(removeRequest(connReqId));
				}
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		fetchRequests();
	}, []);
	return (
		<div className="max-w-3xl mx-auto px-4 py-8">
			<h1 className="text-3xl text-center font-semibold">Requests</h1>
			<div>
				{loading ? (
					<span className="loading loading-bars loading-xl"></span>
				) : requests.length === 0 ? (
					<div className="mt-16">
						<p className="text-center text-lg text-gray-700 mb-2">
							No pending requests right now
						</p>
						<p className="text-sm text-gray-500 max-w-md mx-auto">
							That’s okay — new people may reach out as you stay active. Check
							back later.
						</p>
						<img
							src={EMPTY_IMAGE}
							alt=""
							className="w-48 mx-auto mt-8 opacity-90"
						/>
					</div>
				) : (
					<div>
						<p className="text-sm text-gray-500 mb-8">
							People who want to connect with you
						</p>
						<div className="mt-8 space-y-4">
							{requests.map((connReq) => (
								<ConnectionCard
									user={connReq.fromUserId}
									key={connReq._id}
									actions={[
										{
											label: "Accept",
											onClick: () =>
												handleReviewRequest("accepted", connReq._id),
											type: "primary",
										},
										{
											label: "Reject",
											onClick: () =>
												handleReviewRequest("rejected", connReq._id),
											type: "danger",
										},
									]}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default Requests;
