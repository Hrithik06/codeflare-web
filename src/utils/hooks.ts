import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./appStore";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

import { useEffect, useState } from "react";
import api from "./axiosInstance";

type ProfileImageMeta = {
	key: string;
	contentType: string;
	imageVersion: number;
	isUserUploaded: boolean;
};

const DEFAULT_IMAGE = "/DEFAULT_PROFILE_IMG.png";

export function useProfileImage(meta?: ProfileImageMeta) {
	const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);
	useEffect(() => {
		if (!meta?.isUserUploaded || !meta?.key) {
			setImageUrl(DEFAULT_IMAGE);
			return;
		}

		let cancelled = false;

		async function fetchImage() {
			const res = await api.post("/profile/download-url", {
				key: meta?.key,
				contentType: meta?.contentType,
			});

			if (!cancelled) {
				setImageUrl(res.data.data.s3DownloadUrl);
			}
		}

		fetchImage();

		return () => {
			cancelled = true;
		};
		// key is stable by backend contract
	}, [meta?.imageVersion]);

	return imageUrl;
}
