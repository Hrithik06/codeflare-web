import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {  setUser } from "../utils/userSlice";
// import { clearLoading, setLoading } from "../utils/userSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import api from "../utils/axiosInstance";
import { emailIdZodSchema, passwordZodSchema } from "../utils/zodSchema";
import { ZodError } from "zod";
import { RootState } from "../utils/appStore";
const Login = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
const [loading, setLoading] = useState(false)
  // const loading = useAppSelector((store: RootState) => store.user.loading);
  const isAuthenticated = useAppSelector(
    (store: RootState) => store.user.isAuthenticated
  );
  const handleLogin = async () => {
    try {
      emailIdZodSchema.parse(emailId);
      passwordZodSchema.parse(password);
      setShowPassword(false);
      // dispatch(setLoading());
      setLoading(true);
      await api
        .post(
          "/login",
          {
            emailId,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("response");
          const userData = response?.data?.data;
          if (
            response.status === 200 &&
            response.statusText === "OK" &&
            userData
          ) {
            console.log("if all ok");
          console.log("loading before dispatch: ",loading);

            dispatch(setUser(userData));
            // dispatch(clearLoading());
            setLoading(false);
          console.log("loading after dispatch before navigate: ",loading);

            navigate("/");
          }
        })
        .catch((err) => {
          console.log("loading catch section: ",loading);
          
          // dispatch(clearLoading());
      setLoading(false);

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
  const handleSignUp = async () => {
    await api
      .post(
        "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setUser(res.data.data));
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          if (err.response.status === 409) {
            console.log(err.response.data);
            setError(err.response.data.message);
          }
        }
      });
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);
  //TODO: when user is loggedIn and visits the /login page it should not come to Login Page redirect to home(feed)
  return (
    <form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto my-20">
      <legend className="fieldset-legend text-xl">
        {isLogin ? "Login" : "Sign Up"}
      </legend>
      {!isLogin && (
        <>
          <label className="fieldset-label" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            minLength={1}
            maxLength={20}
          />

          <label className="fieldset-label" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            minLength={1}
            maxLength={20}
          />
        </>
      )}

      <>
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
          required
        />
      </>
      <>
        <label className="fieldset-label" htmlFor="password">
          Password
        </label>
        <div className="flex items-center relative">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            autoComplete="current-password"
            required
          />

          <button
            className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
            type="button"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
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
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </button>
        </div>
      </>

      <button
        className="btn btn-primary my-4 w-1/3 mx-auto"
        type="button"
        onClick={isLogin ? handleLogin : handleSignUp}
      >
        {loading ? (
          <span className="loading loading-bars loading-xs"></span>
        ) : isLogin ? (
          "Login"
        ) : (
          "Sign Up"
        )}
      </button>

      <p className="m-auto">
        {isLogin ? "New User? Click here to" : "Existing User? Click here to"}
        <button
          type="button"
          className="btn btn-link p-0 my-0 mx-1 no-underline hover:underline"
          // className="text-primary cursor-pointer hover:underline ml-1"
          onClick={() => {
            setIsLogin((prev) => !prev);
            setError("");
          }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
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
