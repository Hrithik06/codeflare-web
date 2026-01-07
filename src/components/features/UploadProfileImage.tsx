// import axios from "axios";
// import { useState } from "react";
// import api from "../../utils/axiosInstance";
// import { setUser } from "../../utils/userSlice";

// import { useAppDispatch } from "../../utils/hooks";

// const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
// const ALLOWED_TYPES = ["image/jpeg", "image/png"];

// function validateImage(file: File) {
// 	if (!ALLOWED_TYPES.includes(file.type)) {
// 		throw new Error("Only JPEG and PNG images are allowed");
// 	}
// 	if (file.size > MAX_IMAGE_SIZE) {
// 		throw new Error("Image must be under 2MB");
// 	}
// }

// const UploadProfileImage = () => {
// 	const [status, setStatus] = useState<
// 		"idle" | "uploading" | "error" | "uploaded"
// 	>("idle");
// 	const dispatch = useAppDispatch();
// 	const handleFileChange = async (file: File) => {
// 		try {
// 			validateImage(file);

// 			setStatus("uploading");

// 			// get presigned PUT
// 			const presignRes = await api.post(
// 				"/profile/upload-url",
// 				{
// 					contentType: file.type,
// 				},
// 				{ withCredentials: true },
// 			);
// 			const { s3UploadUrl, key, contentType } = presignRes.data.data;
// 			// upload to S3
// 			const s3Res = await axios.put(s3UploadUrl, file, {
// 				headers: {
// 					"Content-Type": contentType,
// 				},
// 			});

// 			if (s3Res.status === 200) {
// 				console.log("S3 Upload Success");
// 				const confirmRes = await api.post(
// 					"/profile/image/confirm",
// 					{ key, contentType },
// 					{ withCredentials: true },
// 				);
// 				dispatch(setUser(confirmRes.data.data));
// 			}
// 			setStatus("uploaded");
// 		} catch (err) {
// 			console.error(err);
// 			setStatus("error");
// 		}
// 	};

// 	return (
// 		<>
// 			<input
// 				id="profileImage"
// 				type="file"
// 				className="file-input rounded-xl"
// 				accept="image/jpeg,image/png"
// 				onChange={(e) => {
// 					if (e.target.files?.[0]) {
// 						handleFileChange(e.target.files[0]);
// 					}
// 				}}
// 			/>

// 			{status === "uploading" && <p>Uploading image…</p>}
// 			{status === "uploaded" && <p>Image uploaded ✓</p>}
// 			{status === "error" && <p>Upload failed</p>}
// 		</>
// 	);
// };
// export default UploadProfileImage;

import axios from "axios";
import { useState } from "react";
import api from "../../utils/axiosInstance";
import { setUser } from "../../utils/userSlice";
import { useAppDispatch } from "../../utils/hooks";

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

export default function UploadProfileImage() {
	const [status, setStatus] = useState<
		"idle" | "uploading" | "error" | "uploaded"
	>("idle");
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const dispatch = useAppDispatch();

	const handleFileChange = async (file: File) => {
		try {
			setErrorMsg(null);
			validateImage(file);

			setStatus("uploading");

			// get presigned PUT
			const presignRes = await api.post(
				"/profile/upload-url",
				{ contentType: file.type },
				{ withCredentials: true },
			);

			const { s3UploadUrl, key, contentType } = presignRes.data.data;

			// upload to S3
			await axios.put(s3UploadUrl, file, {
				headers: { "Content-Type": contentType },
			});

			// confirm upload
			const confirmRes = await api.post(
				"/profile/image/confirm",
				{ key, contentType },
				{ withCredentials: true },
			);

			dispatch(setUser(confirmRes.data.data));
			setStatus("uploaded");
		} catch (err) {
			console.error(err);
			setStatus("error");

			if (err instanceof Error) {
				setErrorMsg(err.message);
			} else {
				setErrorMsg("Upload failed. Please try again.");
			}
		}
	};

	return (
		<div className="mt-4">
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Profile photo
			</label>

			<input
				id="profileImage"
				type="file"
				accept="image/jpeg,image/png"
				className="hidden"
				onChange={(e) => {
					if (e.target.files?.[0]) {
						handleFileChange(e.target.files[0]);
					}
				}}
			/>

			<div className="flex items-center gap-4">
				<label
					htmlFor="profileImage"
					className="inline-flex items-center justify-center
                     px-4 py-2 rounded-xl text-sm font-medium
                     bg-violet-600 text-white cursor-pointer
                     hover:bg-violet-700 transition
                     disabled:opacity-50"
				>
					{status === "uploading" ? "Uploading…" : "Change photo"}
				</label>

				<div className="text-xs text-gray-500">JPEG or PNG · Max 2MB</div>
			</div>

			{status === "error" && errorMsg && (
				<p className="mt-2 text-sm text-red-600">{errorMsg}</p>
			)}

			{status === "uploaded" && (
				<p className="mt-2 text-sm text-green-600">
					Photo updated successfully
				</p>
			)}
		</div>
	);
}
