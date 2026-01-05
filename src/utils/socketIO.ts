import { io } from "socket.io-client";
export const createSocketConnection = () => {
	return io("/", {
		path: "/api/socket.io",
	});

	//NOTE: I dont need this as I have vite proxy
	// if (location.hostname === "localhost") {
	// 	return io("http://localhost:7777");
	// } else {
	// 	return io("/", {
	// 		path: "/api/socket.io",
	// 	});
	// }
};
