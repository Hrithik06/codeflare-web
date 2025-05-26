import React, { useState } from "react";
import { useNavigate } from "react-router";
import { clearLoading, setLoading, setUser } from "../utils/userSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import api from "../utils/axiosInstance";
import { emailIdZodSchema, passwordZodSchema } from "../utils/zodSchema";
import { ZodError } from "zod";
import { RootState } from "../utils/appStore";

const Login = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("Nathan@Drake.com");
  const [password, setPassword] = useState("Nathan@1234");
  const [error, setError] = useState("");
  // const [emailId, setEmailId] = useState("");
  // const [password, setPassword] = useState("");
  const loading = useAppSelector((store: RootState) => store.user.loading);
  const handleLogin = async () => {
    try {
      emailIdZodSchema.parse(emailId);
      passwordZodSchema.parse(password);
      dispatch(setLoading());
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
            dispatch(clearLoading());
            navigate("/");
          }
        })
        .catch((err) => {
          dispatch(clearLoading());
          if (err.response) {
            let errMessage;
            if (err?.response?.data?.errors) {
              errMessage = err?.response?.data?.errors[0]?.message;
            } else {
              errMessage =
                err?.response?.data?.message || "Something went wrong.";
            }
            setError(errMessage);
            console.error(errMessage);
          } else if (err.request) {
            console.log(err.request);
            setError("Error: No response from Server ");
          } else {
            console.log("Error: ", err?.message);
            setError("Error connecting with server");
          }
        });
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err?.errors[0]?.message);
        return;
      }
      console.error("Error: ", err);
    }
  };

  return (
    <form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto my-20">
      <legend className="fieldset-legend text-xl">Login</legend>

      <label className="fieldset-label" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        className="input"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
        id="email"
        name="email"
        autoComplete="email"
      />

      <label className="fieldset-label" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        name="password"
        autoComplete="current-password"
      />
      <button
        className="btn btn-primary mt-4 w-1/3 mx-auto"
        type="button"
        onClick={handleLogin}
      >
        {loading ? (
          <span className="loading loading-bars loading-xs"></span>
        ) : (
          "Login"
        )}
      </button>
      {error.length > 0 && (
        <div role="alert" className="alert alert-error alert-soft">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};

export default Login;
