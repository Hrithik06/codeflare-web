import React, { useState } from "react";
import axios from "axios";
const Login = (): React.JSX.Element => {
  const [emailId, setEmailId] = useState("Nathan@Drake.com");
  const [password, setPassword] = useState("Nathan@1234");
  // const [emailId, setEmailId] = useState("");
  // const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await axios.post(
      "http://localhost:7777/login",
      {
        emailId,
        password,
      },
      {
        withCredentials: true,
      }
    );
    // localStorage.setItem("userData", JSON.stringify(response.data.data));
    // localStorage.clear();
  };

  return (
    <form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto">
      <legend className="fieldset-legend text-xl">Login</legend>

      <label className="fieldset-label">Email</label>
      <input
        type="email"
        className="input"
        placeholder="Email"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
      />

      <label className="fieldset-label">Password</label>
      <input
        type="password"
        className="input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
