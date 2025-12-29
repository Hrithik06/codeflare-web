// Source - https://stackoverflow.com/a
// Posted by ABHIJEET KHIRE, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-26, License - CC BY-SA 4.0

import { useState } from "react";
import api from "../utils/axiosInstance";
import { Loader } from "../components/";
import axios from "axios";
// Define a functional component named UploadAndDisplayImage

const UploadAndDisplayImage = () => {
	type UploadStatus = "idle" | "selected" | "uploading" | "uploaded" | "error";
	const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
	const ALLOWED_TYPES = ["image/jpeg", "image/png"];

	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [photoUrl, setPhotoUrl] = useState<string | null>(null);
	const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
	const [uploadMeta, setUploadMeta] = useState<{
		key: string;
		contentType: string;
	} | null>(null);

	function validateImage(file: File) {
		if (!file) {
			throw new Error("No file selected");
		}

		if (!ALLOWED_TYPES.includes(file.type)) {
			throw new Error("Only JPEG and PNG images are allowed");
		}

		if (file.size > MAX_IMAGE_SIZE) {
			throw new Error("Image must be under 2MB");
		}
	}

	const uploadProfileImage = async (file: File) => {
		// 1. presign
		const presignRes = await api.post("/profile/upload-url", {
			contentType: file.type,
		});

		const { s3UploadUrl, key, contentType } = presignRes.data.data;

		// 2. upload
		await axios.put(s3UploadUrl, file, {
			headers: { "Content-Type": contentType },
		});

		// 3. preview
		const previewRes = await api.post("/profile/download-url", {
			key,
			contentType,
		});

		setPhotoUrl(previewRes.data.data.s3DownloadUrl);
		setUploadMeta({ key, contentType });
		setUploadStatus("uploaded");
	};
	const handleSaveProfile = async () => {
		if (uploadStatus === "uploading") {
			console.log("Please wait, image is still uploading"); //toast it
			return;
		}
		//Make profile edit api
		// await api.post("/profile", {
		// 	...formData,
		// 	profileImage: uploadMeta,
		// });
	};

	const handleFileChange = async (file: File) => {
		try {
			validateImage(file); // sync
			setSelectedImage(file);
			setUploadStatus("uploading");

			await uploadProfileImage(file); // async auto-start
		} catch (err) {
			console.log(err);
			setUploadStatus("error");
		}
	};

	return (
		<div>
			{/* Header */}
			<h1>Upload and Display Image</h1>
			<h3>using React Hooks</h3>

			{/* Conditionally render the selected image if it exists */}
			{selectedImage && (
				<div>
					{/* Display the selected image */}
					<img alt="not found" width={"250px"} src={photoUrl} />
					<br /> <br />
					{/* Button to remove the selected image */}
					<button
						onClick={() => {
							setSelectedImage(null);
						}}
					>
						Remove
					</button>
				</div>
			)}

			<br />

			{/* Input element to select an image file */}
			<input
				type="file"
				name="myImage"
				className="file-input"
				accept="image/png, image/jpeg"
				// Event handler to capture file selection and update the state
				// onChange={(event) => {
				// 	setSelectedImage(event?.target?.files[0]); // Update the state with the selected file
				// 	setPhotoUrl(URL.createObjectURL(event?.target?.files[0]));
				// }}
				onChange={(event) => handleFileChange(event?.target?.files[0])}
			/>
			{uploadStatus === "uploading" && <Loader />}
			{uploadStatus === "uploaded" && <span>Uploaded ✓</span>}

			<button
				disabled={uploadStatus === "uploading"}
				className="btn btn-primary"
			>
				Save profile
			</button>
		</div>
	);
};

// Export the UploadAndDisplayImage component as default
export default UploadAndDisplayImage;
