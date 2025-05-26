import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import api from "../utils/axiosInstance";

import { UserCard } from "./index";
import { addFeed } from "../utils/feedSlice";
import { RootState } from "../utils/appStore";

const Feed = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const feed = useAppSelector((store: RootState) => store.feed);
  const getFeed = async () => {
    if (feed.length !== 0) return;
    const res = await api.get("/user/feed", {
      params: {
        page: 1,
        limit: 10,
      },
      withCredentials: true,
    });
    dispatch(addFeed(res.data.data));
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex justify-center mx-auto">
      <div className="">
        {feed.length > 0 &&
          feed.map((user) => {
            return <UserCard user={user} key={user._id} />;
          })}
      </div>
    </div>
  );
};
export default Feed;
