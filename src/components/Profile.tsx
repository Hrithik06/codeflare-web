import React from "react";
import { ProfileEdit } from "./index";
import { useAppSelector } from "../utils/hooks";
const Profile = (): React.ReactElement => {
  const user = useAppSelector((store) => store.user.user);
  return <>{user && <ProfileEdit user={user} />}</>;
};

export default Profile;
