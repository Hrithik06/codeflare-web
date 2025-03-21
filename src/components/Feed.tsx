import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import api from "../utils/axiosInstance";

import { UserCard } from "./index";
import { addFeed } from "../utils/feedSlice";

const Feed = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const feed = useAppSelector((store) => store.feed);
  const getFeed = async () => {
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
    if (feed.length === 0) {
      getFeed();
    }
  }, []);
  return (
    <div className="">
      {feed.length > 0 &&
        feed.map((f) => {
          return <UserCard user={f} key={f._id} />;
        })}
    </div>
  );
};
export default Feed;
