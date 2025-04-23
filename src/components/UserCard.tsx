import React from "react";
import UserInterface from "../interface/UserInterface";
type UserProps = {
  user: UserInterface;
};
const UserCard = ({ user }: UserProps): React.JSX.Element => {
  const { firstName, lastName, photoUrl, about, age, gender, skills } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="h-3/4">
        <img src={photoUrl} alt="photo" className="w-full" />
      </figure>
      <div className="card-body h-1/4">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <h3 className="card-actions">{`${age}, ${gender}`}</h3>
        <p>{about}</p>
        {/* <div className="flex justify-start gap-2 ">
          <span className="italic">Top Skills:</span> */}
        <div className="flex justify-start gap-1">
          {skills.slice(0, 2).map((x) => (
            <span
              className="border rounded-full border-gray-500 inline-block px-2"
              key={x}
            >
              {x}
            </span>
          ))}
        </div>
        {/* </div> */}
        <div className="card-actions justify-evenly ">
          <button className="btn btn-primary">
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
          <button className="btn btn-success">
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
