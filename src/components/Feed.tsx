import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import api from "../utils/axiosInstance";

import { UserCard } from "./index";
import { addFeed } from "../utils/feedSlice";
import { RootState } from "../utils/appStore";
import { setLoading, clearLoading } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Feed = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const feed = useAppSelector((store: RootState) => store.feed);
  const loading = useAppSelector((store: RootState) => store.user.loading);
  const isAuthenticated = useAppSelector(
    (store: RootState) => store.user.isAuthenticated,
  );
  const getFeed = async () => {
    if (feed.length !== 0) {
      dispatch(clearLoading());
      return;
    }
    // if (!isAuthenticated) {
    //   navigate("/login");
    // }
    dispatch(setLoading());
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
        dispatch(clearLoading());
      })
      .catch((err) => {
        dispatch(clearLoading());
        console.error(err);
      });
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center mx-auto my-10">
        <span className="loading loading-bars loading-xl"></span>{" "}
      </div>
    );
  }
  // if (feed.length === 0) {
  //   return (
  //     <div>
  //       <p>No New Users found</p>
  //     </div>
  //   );
  // }

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
