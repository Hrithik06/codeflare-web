import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const ErrorPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => {
      clearTimeout(timeOutId);
    };
  });
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl">
        Something went wrong. Please try again later. You will be redirected to
        Home shortly.
      </h1>
    </div>
  );
};
export default ErrorPage;
