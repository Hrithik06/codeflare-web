import { UploadedImageMetaInterface } from "./UserInterface";

export interface Message {
	senderId: {
		_id: string;
		firstName: string;
		lastName: string;
	};
	text: string;
	_id: string;
	createdAt?: string;
	updatedAt?: string;
}
export interface ChatParticipant {
	_id: string;
	firstName: string;
	lastName: string;
	profileImageMeta?: UploadedImageMetaInterface;
}
export interface ChatDetails {
	_id: string;
	participants: ChatParticipant[];
	messages: Message[];
}
