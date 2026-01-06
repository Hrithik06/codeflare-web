export interface Message {
	senderId: {
		_id: string;
		firstName: string;
		lastName: string;
	};
	text: string;
	_id: string;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}
export interface ChatParticipant {
	_id: string;
	firstName: string;
	lastName: string;
}
export interface ChatDetails {
	_id: string;
	participants: ChatParticipant[];
	messages: Message[];
}
