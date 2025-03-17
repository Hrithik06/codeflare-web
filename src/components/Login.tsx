import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../utils/hooks";
import { clearError, setError, setUser } from "../utils/userSlice";

import { BASE_URL } from "../utils/constants";
const Login = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("Elesna@Drake.com");
  const [password, setPassword] = useState("Elena@1234");
  // const [emailId, setEmailId] = useState("");
  // const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await axios
        .post(
          `${BASE_URL}/login`,
          {
            emailId,
            password,
          },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          const userData = response.data.data;

          if (
            response.status === 200 &&
            response.statusText === "OK" &&
            userData
          ) {
            dispatch(clearError());
            dispatch(setUser(userData));
            navigate("/");
          }
        })
        .catch((err) => {
          if (err.response) {
            const errMessage = err.response.data.message;
            dispatch(setError(errMessage));
            console.log(errMessage);
          } else if (err.request) {
            console.log(err.request);
            dispatch(setError("Error: No response from Server "));
          } else {
            console.log("Error: ", err.message);
            dispatch(setError("Error connecting with server"));
          }
        });
    } catch (err) {
      console.error("Error: ", err.message);
    }
  };

  return (
    <form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto">
      <legend className="fieldset-legend text-xl">Login</legend>

      <label className="fieldset-label" htmlFor="emailInput">
        Email
      </label>
      <input
        type="email"
        className="input"
        placeholder="Email"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
        id="emailInput"
      />

      <label className="fieldset-label" htmlFor="passwordInput">
        Password
      </label>
      <input
        type="password"
        className="input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="passwordInput"
      />

      <button
        className="btn btn-primary mt-4 w-1/3 mx-auto"
        type="button"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
