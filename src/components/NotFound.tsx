import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const NotFound = (): React.JSX.Element => {
  const navigate = useNavigate();

  const [redirectIn, setRedirectIn] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRedirectIn((prev) => {
        if (prev <= 0) {
          clearInterval(intervalId);
          // setTimeout(() => {
          //   navigate("/");
          // }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timeOutId = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeOutId);
    };
  }, []);

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl">Page Not Found</h1>
      <p>Redirecting to home in {redirectIn} </p>
    </div>
  );
};
export default NotFound;
