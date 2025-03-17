import React from "react";
import { Outlet } from "react-router";
import axios from "axios";

import NavBar from "./NavBar";
import Footer from "./Footer";

import { useAppDispatch } from "../utils/hooks";
import { clearError, setError, setUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Body = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const fetchUser = async () => {
    await axios
      .get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      })
      .then((response) => {
        const userData = response.data.data;
        dispatch(clearError());
        dispatch(setUser(userData));
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errMessage = err.response.data.message;
          dispatch(setError(errMessage));
        } else if (err.request) {
          // The request was made but no response was received
          // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error: ", err.message);
        }
      });
  };
  React.useEffect(() => {
    try {
      fetchUser();
    } catch (err) {
      console.error("Error: ", err.message);
    }
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
