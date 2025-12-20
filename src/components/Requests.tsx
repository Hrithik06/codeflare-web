import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { RootState } from "../utils/appStore";
import { ConnectionCard } from "./index";
// import { clearLoading, setLoading } from "../utils/userSlice";
const Requests = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const requests = useAppSelector((store: RootState) => store.requests);
  // const loading = useAppSelector((store: RootState) => store.user.loading);
const [loading, setLoading] = useState(false)

  const fetchRequests = async () => {
    // dispatch(setLoading());
    setLoading(true);
    await api
      .get("/user/requests/recieved", { withCredentials: true })
      .then((res) => {
        dispatch(addRequests(res.data.data));
        // dispatch(clearLoading());
        setLoading(false);
      })
      .catch((err) => {
        // dispatch(clearLoading());
        setLoading(false);
        console.error(err);
      });
  };

  const handleReviewRequest = async (status: string, connReqId: string) => {
    await api
      .post(
        `/request/review/${status}/${connReqId}`,
        {},
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.success) {
          dispatch(removeRequest(connReqId));
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center">
        <h3 className="text-5xl text-center my-6">Connection Requests</h3>
        {loading ? (
          <span className="loading loading-bars loading-xl"></span>
        ) : requests.length === 0 ? (
          <p>No New Requests</p>
        ) : (
          requests.map((connReq) => (
            <ConnectionCard
              user={connReq.fromUserId}
              btnType={"Accept"}
              key={connReq._id}
              actions={[
                {
                  label: "Accept",
                  onClick: () => handleReviewRequest("accepted", connReq._id),
                  type: "success",
                },
                {
                  label: "Reject",
                  onClick: () => handleReviewRequest("rejected", connReq._id),
                },
              ]}
            />
          ))
        )}
      </div>
    </>
  );
};
export default Requests;
