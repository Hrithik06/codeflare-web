import React from "react";
import UserInterface from "../interface/UserInterface";
import { ActionButtons } from "./index";
import { ButtonAction } from "./ActionButtons";

type ConnectionCardProps = {
  user: UserInterface;
  btnType: string;
  actions: [ButtonAction, ButtonAction];
};
const ConnectionCard = ({
  user,

  actions,
}: ConnectionCardProps): React.JSX.Element => {
  const { firstName, lastName, about, photoUrl } = user;
  return (
    <div className="flex items-center justify-around py-2 px-4 m-2 border-2 border-black/40 rounded-xl gap-4">
      <img src={photoUrl} className="avatar w-24 h-24 rounded-full " />

      <div className="flex flex-col justify-center min-w-64">
        <p className="text-2xl">{`${firstName} ${lastName}`}</p>
        <p className="text-gray-600 line-clamp-2">{about}</p>
      </div>
      {/* <button className="btn btn-sm btn-primary rounded-full">{btnType}</button>
      <button className="btn btn-sm btn-primary rounded-full">
        {"Reject"}
      </button> */}
      {/* <div className="tooltip tooltip-right" data-tip="Remove connection">
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div> */}
      <ActionButtons actions={actions} />
    </div>
  );
};
export default ConnectionCard;
