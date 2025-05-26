import React from "react";
import { ProfileEdit } from "./index";
import { useAppSelector } from "../utils/hooks";
import { RootState } from "../utils/appStore";
const Profile = (): React.ReactElement => {
  const user = useAppSelector((store: RootState) => store.user.user);
  return <>{user && <ProfileEdit user={user} />}</>;
};

export default Profile;
