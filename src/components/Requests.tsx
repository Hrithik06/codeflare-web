import React, { useEffect, useRef, useState } from "react";
import api from "../utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { addRequests } from "../utils/requestSlice";
import { RootState } from "../utils/appStore";
import { ConnectionCard } from "./index";
import { clearLoading, setLoading } from "../utils/userSlice";

const Requests = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const requests = useAppSelector((store: RootState) => store.requests);
  const loading = useAppSelector((store: RootState) => store.user.loading);
  // const [showToast, setShowToast] = useState({ status: false, text: "" });
  // const timerRef = useRef(null);
  const fetchRequests = async () => {
    dispatch(setLoading());
    await api
      .get("/user/requests/recieved", { withCredentials: true })
      .then((res) => {
        dispatch(addRequests(res.data.data));
        dispatch(clearLoading());
      })
      .catch((err) => {
        dispatch(clearLoading());
        console.error(err);
      });
  };
  const handleAccept = async (connReqId: string) => {
    // dispatch(setLoading());
    await api
      .post(
        `/request/review/accepted/${connReqId}`,
        {},
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.success) {
          fetchRequests();
          // setShowToast({ status: true, text: res.data.message });
        }
        // timerRef = setTimeout(() => {
        //   setShowToast({ status: false, text: "" });
        // }, 3000);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleReject = async (connReqId: string) => {
    // dispatch(setLoading());
    await api
      .post(
        `/request/review/rejected/${connReqId}`,
        {},
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.success) {
          fetchRequests();
          // setShowToast({ status: true, text: res.data.message });
          // timerRef = setTimeout(() => {
          //   setShowToast({ status: false, text: "" });
          // }, 3000);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    // const localRef = timerRef;
    fetchRequests();
    // return () => {
    //   if (localRef.current) {
    //     clearTimeout(localRef.current);
    //   }
    // };
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
                  onClick: () => handleAccept(connReq._id),
                  type: "success",
                },
                { label: "Reject", onClick: () => handleReject(connReq._id) },
              ]}
            />
          ))
        )}
      </div>
      {/* {showToast.status ? (
        <div className="toast toast-center toast-top">
          <div className="alert alert-success">
            <span>{showToast.text}</span>
          </div>
        </div>
      ) : null} */}
    </>
  );
};
export default Requests;
