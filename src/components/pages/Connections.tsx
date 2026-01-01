import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { addConnections } from "../../utils/connectionSlice";
// import { clearLoading, setLoading } from "../../utils/userSlice";
import { RootState } from "../../utils/appStore";
// import { ConnectionCard } from "../ui";
import ConnectionCard from "../ui/ConnectionCard";
const EMPTY_FEED = "/EmptyFeed.svg";

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
	const handleMessage = async () => {
		console.log("handleMessage");
	};
	const handleRemoveConnection = async () => {
		console.log("handleRemoveConnection");
	};
	useEffect(() => {
		fetchConnection();
	}, []);

	// if (loading) {
	//   return (
	//     <div className="flex justify-center m-10">
	//       <span className="loading loading-bars loading-xl bg-primary"></span>
	//     </div>
	//   );
	// }
	// if (connections.length === 0)
	//   return (
	//     <div className="m-10">
	//       <h3 className="text-4xl text-center">No Connections Found</h3>
	//     </div>
	//   );

	return (
		<div className="flex flex-col items-center">
			<h3 className="text-5xl text-center my-6">Connections</h3>
			<div>
				{loading ? (
					<span className="loading loading-bars loading-xl"></span>
				) : connections.length === 0 ? (
					// <p>No Connections Found</p>

					<div className="w-full h-10/12 sm:h-full flex flex-col items-center justify-center">
						<p className="text-2xl sm:text-3xl text-center m-2 xl:mt-10">
							No Connections Found
						</p>
						<img src={EMPTY_FEED} alt="EMPTY FEED" />
					</div>
				) : (
					connections.map((connection) => (
						<ConnectionCard
							user={connection}
							btnType={"Message"}
							key={connection._id}
							actions={[
								{ label: "Message", onClick: handleMessage, type: "success" },
								{
									label: "Remove",
									onClick: handleRemoveConnection,
									toolTipLabel: "Remove Connection",
								},
							]}
						/>
					))
				)}
			</div>
		</div>
	);
};
export default Connection;
