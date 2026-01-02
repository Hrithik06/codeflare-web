import { io } from "socket.io-client";
export const createSocketConnection = () => {
	// return io("http://localhost:7777");
	return io("/"); //this work in Dev/Local cuz there is vite proxy setup in vite.config.ts
};
