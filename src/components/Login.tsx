import React, { useState } from "react";
import { useNavigate } from "react-router";
import { setUser } from "../utils/userSlice";
import { useAppDispatch } from "../utils/hooks";
import api from "../utils/axiosInstance";
import { emailIdZodSchema, passwordZodSchema } from "../utils/zodSchema";
import { ZodError } from "zod";

const Login = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("Jesse@Faden.com");
  const [password, setPassword] = useState("Jesse@1234");
  const [error, setError] = useState("");
  // const [emailId, setEmailId] = useState("");
  // const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
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
    <form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto">
      <legend className="fieldset-legend text-xl">Login</legend>

      <label className="fieldset-label" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        className="input"
        // placeholder="johndoe@company.com"
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
        // placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        name="password"
        autoComplete="current-password"
      />
      <p className="text-red-500">{error}</p>
      <button
        className="btn btn-primary mt-4 w-1/3 mx-auto"
        type="button"
        onClick={handleLogin}
      >
        Login
      </button>
      {error.length > 0 && (
        <div role="alert" className="alert alert-error alert-soft">
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};

export default Login;
