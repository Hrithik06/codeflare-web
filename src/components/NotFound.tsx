import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
//TODO: Should not load if there is no error and user directly enters /notfound in address bar
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
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            {/* <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
        500
      </h1>
      <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
        Internal Server Error.
      </p> */}
            <img src="/404_Not_Found_Error.svg" className="w-1/2 m-auto" />
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              <h1 className="text-3xl">Page Not Found</h1>
              <p>Redirecting to home in {redirectIn} </p>
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Go back to Home
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default NotFound;
