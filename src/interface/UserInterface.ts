export interface UploadedImageMeta {
	key: string;
	contentType: string;
	isUserUploaded: boolean;
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
	// photoUrl: string;
	skills: string[];
	profileImageMeta: UploadedImageMeta;
}
