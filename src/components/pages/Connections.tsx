import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { addConnections } from "../../utils/connectionSlice";
// import { clearLoading, setLoading } from "../../utils/userSlice";
import { RootState } from "../../utils/appStore";
// import { ConnectionCard } from "../ui";
import ConnectionCard from "../ui/ConnectionCard";

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
					<p>No Connections Found</p>
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
				{/* {connections.map((connection) => {
          const { firstName, lastName, photoUrl, _id, about } = connection;
          return (
            <div
              className="flex items-center justify-around py-2 px-10 m-2 border-2 border-black/40 rounded-xl gap-4"
              key={_id}
            >
              <img src={photoUrl} className="avatar w-24 h-24 rounded-full " />

              <div className="flex flex-col justify-center min-w-80">
                <p className="text-2xl">{`${firstName} ${lastName}`}</p>
                <p className="text-gray-600 line-clamp-2">{about}</p>
              </div>
              <button className="btn btn-sm btn-primary rounded-full">
                Message
              </button>
              <div
                className="tooltip tooltip-right"
                data-tip="Remove connection"
              >
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>
          );
        })}*/}
			</div>
		</div>
	);
};
export default Connection;
