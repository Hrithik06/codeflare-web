import axios from "axios";
import { useState } from "react";
import api from "../utils/axiosInstance";
// type UploadedImageMeta = {
// 	key: string;
// 	contentType: string;
// };
import { setUser } from "../utils/userSlice";

import { useAppDispatch } from "../utils/hooks";
// type Props = {
// 	onPreviewReady: React.Dispatch<React.SetStateAction<string | null>>;
// 	onImageReady: React.Dispatch<React.SetStateAction<UploadedImageMeta | null>>;
// };

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

function validateImage(file: File) {
	if (!ALLOWED_TYPES.includes(file.type)) {
		throw new Error("Only JPEG and PNG images are allowed");
	}
	if (file.size > MAX_IMAGE_SIZE) {
		throw new Error("Image must be under 2MB");
	}
}

// onPreviewReady,
// onImageReady,
const UploadAndDisplayImage2 = () => {
	const [status, setStatus] = useState<
		"idle" | "uploading" | "error" | "uploaded"
	>("idle");
	const dispatch = useAppDispatch();
	const handleFileChange = async (file: File) => {
		try {
			validateImage(file);

			// STEP 3 — local preview immediately
			// const localPreviewUrl = URL.createObjectURL(file);
			// onPreviewReady(localPreviewUrl);

			setStatus("uploading");

			// STEP 4 — get presigned PUT
			const presignRes = await api.post(
				"/profile/upload-url",
				{
					contentType: file.type,
				},
				{ withCredentials: true },
			);
			const { s3UploadUrl, key, contentType } = presignRes.data.data;
			// STEP 5 — upload to S3
			const s3Res = await axios.put(s3UploadUrl, file, {
				headers: {
					"Content-Type": contentType,
				},
			});

			if (s3Res.status === 200) {
				console.log("S3 Upload Success");
				const confirmRes = await api.post(
					"/profile/image/confirm",
					{ key, contentType },
					{ withCredentials: true },
				);
				dispatch(setUser(confirmRes.data.data));
			}
			// STEP 7 — switch preview to S3 + notify parent

			// onImageReady({ key, contentType });

			setStatus("uploaded");
		} catch (err) {
			console.error(err);
			setStatus("error");
		}
	};

	return (
		<>
			<input
				id="profileImage"
				type="file"
				className="file-input"
				accept="image/jpeg,image/png"
				onChange={(e) => {
					if (e.target.files?.[0]) {
						handleFileChange(e.target.files[0]);
					}
				}}
			/>

			{status === "uploading" && <p>Uploading image…</p>}
			{status === "uploaded" && <p>Image uploaded ✓</p>}
			{status === "error" && <p>Upload failed</p>}
		</>
	);
};
export default UploadAndDisplayImage2;
