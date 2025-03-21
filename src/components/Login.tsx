import React, { useState } from "react";
import { useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { clearError, setError, setUser } from "../utils/userSlice";
import api from "../utils/axiosInstance";
import { emailIdZodSchema, passwordZodSchema } from "../utils/zodSchema";
import { ZodError } from "zod";

const Login = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("Victor@Sully.com");
  const [password, setPassword] = useState("Victor@1234");
  // const [emailId, setEmailId] = useState("");
  // const [password, setPassword] = useState("");
  const error = useAppSelector((store) => store.user.error);
  const handleLogin = async () => {
    try {
      dispatch(clearError());

      emailIdZodSchema.parse(emailId);
      passwordZodSchema.parse(password);

      await api
        .post(
          "/login",
          {
            emailId,
            password,
          },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          const userData = response?.data?.data;

          if (
            response.status === 200 &&
            response.statusText === "OK" &&
            userData
          ) {
            dispatch(setUser(userData));
            navigate("/");
          }
        })
        .catch((err) => {
          if (err.response) {
            let errMessage;
            if (err?.response?.data?.errors) {
              errMessage = err?.response?.data?.errors[0]?.message;
            } else {
              errMessage =
                err?.response?.data?.message || "Something went wrong.";
            }
            dispatch(setError(errMessage));
            console.error(errMessage);
          } else if (err.request) {
            console.log(err.request);
            dispatch(setError("Error: No response from Server "));
          } else {
            console.log("Error: ", err?.message);
            dispatch(setError("Error connecting with server"));
          }
        });
    } catch (err) {
      if (err instanceof ZodError) {
        dispatch(setError(err?.errors[0]?.message));
        return;
      }
      console.error("Error: ", err);
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
      <p className="text-red-500">{error}</p>
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
