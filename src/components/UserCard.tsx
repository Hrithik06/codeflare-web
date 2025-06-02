import React from "react";
import UserInterface from "../interface/UserInterface";
import api from "../utils/axiosInstance";
import { useAppDispatch } from "../utils/hooks";
import { removeUserFromFeed } from "../utils/feedSlice";
type UserProps = {
  user: UserInterface;
};
const UserCard = ({ user }: UserProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { _id, firstName, lastName, photoUrl, about, age, gender, skills } =
    user;
  const handleSendRequest = async (status: string) => {
    await api
      .post(`/request/send/${status}/${_id}`, {}, { withCredentials: true })
      .then((res) => {
        dispatch(removeUserFromFeed(_id));
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="card w-80 shadow-sm m-4 bg-white dark:bg-zinc-900">
      <figure className="h-3/4">
        <img src={photoUrl} alt="photo" className="w-full bg-gray-400" />
      </figure>
      <div className="card-body h-1/4">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <h3 className="card-actions">{`${age || "Age"}, ${
          gender || "Gender"
        }`}</h3>
        <p>{about || "Bio"}</p>
        {/* <div className="flex justify-start gap-2 ">
          <span className="italic">Top Skills:</span> */}
        <div className="flex justify-start gap-1">
          {skills.slice(0, 2).map((x) => (
            <span
              className="bg-blue-200 dark:bg-gray-800 border rounded-full border-gray-500 inline-block px-2"
              key={x}
            >
              {x}
            </span>
          ))}
        </div>
        {/* </div> */}
        <div className="card-actions justify-evenly">
          <button
            className="btn btn-primary rounded-full"
            name="ignored-btn"
            onClick={() => handleSendRequest("ignored")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <button
            className="btn btn-success rounded-full"
            name="interested-btn"
            onClick={() => handleSendRequest("interested")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
