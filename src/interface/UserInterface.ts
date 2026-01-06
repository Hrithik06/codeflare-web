export interface UploadedImageMetaInterface {
	key: string;
	contentType: string;
	isUserUploaded: boolean;
	imageVersion: number;
}

/**
 * User shape as RECEIVED from backend
 */
export interface UserBase {
	_id: string;
	firstName: string;
	lastName: string;
	dateOfBirth: Date | string;
	age?: number;
	gender: string;
	about: string;
	skills: string[];
	profileImageMeta?: UploadedImageMetaInterface;
	updatedAt?: Date | string;
}

/**
 * Logged-in user (auth context)
 */
export interface AuthUser extends UserBase {
	emailId: string;
}

/**
 * Payload sent when editing profile
 */
export type UserUpdatePayload = Partial<
	Pick<
		UserBase,
		"firstName" | "lastName" | "dateOfBirth" | "gender" | "about" | "skills"
	>
>;
