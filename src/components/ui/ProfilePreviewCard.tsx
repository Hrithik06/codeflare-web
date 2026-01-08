import { UploadedImageMetaInterface } from "../../interface/UserInterface";
import { useProfileImage } from "../../utils/hooks";

type ProfilePreviewCardProps = {
	user: {
		firstName: string;
		lastName: string;
		age?: number;
		gender?: string;
		about?: string;
		skills?: string[];
		profileImageMeta?: UploadedImageMetaInterface;
	};
};

export default function ProfilePreviewCard({ user }: ProfilePreviewCardProps) {
	const {
		firstName,
		lastName,
		age,
		gender,
		about,
		skills = [],
		profileImageMeta,
	} = user;
	const imageUrl = useProfileImage(profileImageMeta);

	return (
		<div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border">
			{/* Image */}
			<div className="h-64 bg-gray-200 rounded-t-2xl overflow-hidden">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt="Profile preview"
						className="w-full h-full object-cover saturate-95 contrast-95"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-gray-400">
						No photo
					</div>
				)}
			</div>

			{/* Content */}
			<div className="p-4">
				<h2 className="text-lg font-semibold">
					{firstName} {lastName}
					{(age || gender) && (
						<span className="text-gray-500 font-normal">
							{" "}
							· {age ?? "—"} {gender ? `· ${gender}` : ""}
						</span>
					)}
				</h2>

				{about && (
					<p className="text-sm text-gray-700 mt-2 line-clamp-3">{about}</p>
				)}

				{skills.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-3">
						{skills.slice(0, 4).map((skill) => (
							<span
								key={skill}
								className="px-3 py-1 rounded-full text-xs
                           bg-violet-50 text-violet-600"
							>
								{skill}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
