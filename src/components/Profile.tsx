import React from "react";
import ProfileEdit2 from "./ProfileEdit2";
import { ProfileEdit } from "./index";
import TempProfileEdit from "./TempProfileEdit";
import { useAppSelector } from "../utils/hooks";
import { RootState } from "../utils/appStore";
const Profile = (): React.ReactElement => {
	const user = useAppSelector((store: RootState) => store.user.user);
	// return <>{user && <ProfileEdit user={user} />}</>;
	// return <>{user && <ProfileEdit2 user={user} />}</>;
	return <>{user && <TempProfileEdit user={user} />}</>;
};

export default Profile;
