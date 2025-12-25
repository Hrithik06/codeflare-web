import axios from "axios";
// import { BASE_URL } from "./constants";

const api = axios.create({
	// baseURL: BASE_URL,
	baseURL: "/api",
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		//TODO: whatever you want to do with the error
		throw error;
	},
);
export default api;
