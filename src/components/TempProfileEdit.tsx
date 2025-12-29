import { useState } from "react";
import UploadAndDisplayImage2 from "./UploadAndDisplayImage2";
import UserCard from "./UserCard";
import api from "../utils/axiosInstance";
import UserInterface from "../interface/UserInterface";

// type UploadedImageMeta = {
// 	key: string;
// 	contentType: string;
// };
type UserProps = { user: UserInterface };

export default function ProfileEdit2({ user }: UserProps) {
	const [photoUrl, setPhotoUrl] = useState<string | null>(user.photoUrl);
	const [profileImageMeta, setProfileImageMeta] =
		useState<UploadedImageMeta | null>(null);

	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [about, setAbout] = useState(user.about);

	const handleSaveProfile = async () => {
		await api.post("/profile", {
			firstName,
			lastName,
			about,
			profileImageMeta: profileImageMeta, // null or { key, contentType }
		});
	};

	return (
		<>
			{/* SINGLE preview surface */}
			<UserCard
				user={{
					...user,
					firstName,
					lastName,
					about,
					photoUrl,
				}}
			/>

			{/* Upload component (headless) */}
			<UploadAndDisplayImage2
				onPreviewReady={setPhotoUrl}
				onImageReady={setProfileImageMeta}
			/>

			{/* Profile fields */}
			<input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
			<input value={lastName} onChange={(e) => setLastName(e.target.value)} />
			<textarea value={about} onChange={(e) => setAbout(e.target.value)} />

			{/* Single commit button */}
			<button onClick={handleSaveProfile}>Save profile</button>
		</>
	);
}
