import React, { useState } from "react";

const Login = (): React.ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    console.log("hi");
    console.log({
      email,
      password,
    });
  };

  return (
    <form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto">
      <legend className="fieldset-legend text-xl">Login</legend>

      <label className="fieldset-label">Email</label>
      <input
        type="email"
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        type="submit"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
