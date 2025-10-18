import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import api from "../utils/axiosInstance";

import { UserCard } from "./index";
import { addFeed } from "../utils/feedSlice";
import { RootState } from "../utils/appStore";
// import { setLoading, clearLoading } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Feed = (): React.JSX.Element => {
          console.log("ON HOME/FEED PAGE");
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const feed = useAppSelector((store: RootState) => store.feed);
  const [loading, setLoading] = useState(false)
  // const loading = useAppSelector((store: RootState) => store.user.loading);
  const isAuthenticated = useAppSelector(
    (store: RootState) => store.user.isAuthenticated
  );
  const [error, setError] = useState(""); //TODO: Implement error handling and proper UI feedback
  const getFeed = async () => {
    if (feed.length !== 0) {
      // dispatch(clearLoading());
      setLoading(false);
      return;
    }

    // dispatch(setLoading());
    setLoading(true);

    await api
      .get("/user/feed", {
        params: {
          page: 1,
          limit: 10,
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(addFeed(res.data.data));
        // dispatch(clearLoading());
        setLoading(false);
      })
      .catch((err) => {
        // dispatch(clearLoading());
        setLoading(false);
        if (err.response) {
          if (err.response.status === 401) {
            navigate("/login");
          } else if (err.response.status === 404) {
            // setError("No New Users found");
            console.error("No New Users found");
            navigate("/login");
          } else {
            const errorMessage =
              err.response.data?.message || "An error occurred";
            console.error(errorMessage);
            setError(errorMessage);

            // alert(errorMessage);
          }
        } else {
          console.error("Network error or server is down");
          // alert("Network error or server is down");
          setError("Network error or server is down");
          navigate("/login");
        }

        console.error(err);
      });
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    getFeed();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center mx-auto my-10">
        <span className="loading loading-bars loading-xl"></span>{" "}
      </div>
    );
  }

  if (error.length > 0) {
    return (
      <div className="text-center p-10">
        <div className="toast toast-center toast-top">
          <div className="alert alert-success">
            <span>{error}</span>
          </div>
        </div>
        <h1 className="text-3xl">{error}</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center mx-auto">
      <div className="">
        {feed.length > 0 ? (
          feed.map((user) => {
            return <UserCard user={user} key={user._id} />;
          })
        ) : (
          <div>
            <p className="text-3xl text-center my-6">
              No New Users available right now...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Feed;
