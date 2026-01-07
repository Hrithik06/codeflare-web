import React from "react";
// import { ProfileEdit } from "../features";
import ProfileEdit from "../features/ProfileEdit";
import { useAppSelector } from "../../utils/hooks";
import { RootState } from "../../utils/appStore";
import Test from "../features/Test";
const Profile = (): React.ReactElement => {
	const user = useAppSelector((store: RootState) => store.user.user);
	// return <>{user && <ProfileEdit user={user} />}</>;
	return <>{user && <Test user={user} />}</>;
};

export default Profile;
