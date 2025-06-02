import React, { useEffect } from "react";
import { useNavigate } from "react-router";

//TODO: Should not load if there is no error and user directly enters /error in address bar
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
            <img
              src="/500_Internal_Server_Error.svg"
              className="w-1/2 m-auto"
            />
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              We are already working to solve the problem. Please try again
              later. You will be redirected to Home shortly.
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
export default ErrorPage;
