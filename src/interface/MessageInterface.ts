export interface MessageInteface {
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
