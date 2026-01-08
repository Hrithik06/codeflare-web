import { useEffect, useState } from "react";

import api from "../../utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { addConnections } from "../../utils/connectionSlice";
// import { clearLoading, setLoading } from "../../utils/userSlice";
import { RootState } from "../../utils/appStore";
// import { ConnectionCard } from "../ui";
import ConnectionCard from "../ui/ConnectionCard";
const EMPTY_IMAGE = "/EmptyImage.svg";

const Connection = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const connections = useAppSelector((store: RootState) => store.connections);

	// const loading = useAppSelector((store: RootState) => store.user.loading);
	const [loading, setLoading] = useState(false);

	const fetchConnection = async () => {
		// dispatch(setLoading());
		setLoading(true);

		await api
			.get("/user/connections", { withCredentials: true })
			.then((res) => {
				if (res.data.success) {
					dispatch(addConnections(res.data.data));
					// dispatch(clearLoading());
					setLoading(false);
				}
			})
			.catch((err) => {
				// TODO: Error Handling code
				console.error("Error fetching connections: ", err);
				// dispatch(clearLoading());
				setLoading(false);
			});
	};

	// const handleRemoveConnection = async () => {
	// 	console.log("handleRemoveConnection");
	// };
	useEffect(() => {
		fetchConnection();
	}, []);

	return (
		<div className="max-w-3xl mx-auto px-4 py-8">
			<h1 className="text-3xl text-center font-semibold">Connections</h1>
			<div>
				{loading ? (
					<span className="loading loading-bars loading-xl"></span>
				) : connections.length === 0 ? (
					// <p>No Connections Found</p>

					<div className="mt-16">
						<p className="text-center text-lg text-gray-700 mb-2">
							No connections yet
						</p>
						<p className="text-center text-sm text-gray-500 max-w-md mx-auto">
							Once you start connecting with people, they’ll show up here.
						</p>
						<img
							src={EMPTY_IMAGE}
							alt=""
							className="w-48 mx-auto mt-8 opacity-90"
						/>
					</div>
				) : (
					<div>
						<p className="text-center text-sm text-gray-500 mb-8">
							People you’re connected with
						</p>
						<div className="mt-8 space-y-4">
							{connections.map((connection) => (
								<ConnectionCard
									user={connection}
									key={connection._id}
									actions={[
										{
											label: "Message",
											type: "primary",
											navigateTo: `/chat/${connection._id}`,
										},
										// {
										// 	label: "Remove",
										// 	onClick: handleRemoveConnection,
										// 	toolTipLabel: "Remove Connection",
										// 	type: "danger",
										// },
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
export default Connection;
