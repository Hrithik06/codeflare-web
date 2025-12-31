export interface UploadedImageMeta {
	key: string;
	contentType: string;
	isUserUploaded: boolean;
	imageVersion: number;
}
export interface UserInterface {
	_id: string;
	firstName: string;
	lastName: string;
	emailId?: string;
	password?: string;
	dateOfBirth: Date | string;
	age?: number;
	gender: string;
	about: string;
	skills: string[];
	profileImageMeta?: UploadedImageMeta;
	updatedAt?: string;
}
