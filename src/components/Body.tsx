import React from "react";
import { Outlet } from "react-router";
import { isAxiosError } from "axios";

import { NavBar, Footer } from "./index";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { setUser } from "../utils/userSlice";
import { RootState } from "../utils/appStore";
import { useNavigate } from "react-router";
import api from "../utils/axiosInstance";

const Body = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useAppSelector((store: RootState) => store.user.user);

  // const [error, setError] = useState("");
  //TODO: handle error everywhere in the app
  const fetchUser = async () => {
    try {
      const res = await api.get(`profile/view`, {
        withCredentials: true,
      });
      const userData = res.data.data;

      dispatch(setUser(userData));
      // navigate(-1);
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (err.status === 401) {
            //If unauthorised
            return navigate("/login");
          }
          if (err.status === 404) {
            //If for seomereason provided api end-point doesn't exist
            console.error("Invalid API endpoint: Check backend routes.");
            // Instead of redirecting, show a user-friendly message
            // setError("Something went wrong. Please try again later.");
            return navigate("/error");
          }
        } else if (err.request) {
          // The request was made but no response was received
          // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error("No response from Server");
          // setError("Error: No response from Server ");
          return navigate("/error");
        }
      }
      // Something happened in setting up the request that triggered an Error
      console.log("Unexpected Error: ", err);
    }
  };
  React.useEffect(() => {
    try {
      if (!userData) fetchUser();
    } catch (err: Error | any) {
      console.error("Error: ", err?.message);
    }
  }, []);
  return (
    <div data-theme={"light"} className="min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
