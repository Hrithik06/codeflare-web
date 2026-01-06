import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socketIO";
import { useAppSelector } from "../../utils/hooks";
import api from "../../utils/axiosInstance";
import { ChatDetails, Message } from "../../interface/ChatInterface";
// interface ChatProps {
//   propName: type;
// }

// const Chat: FC<ChatProps> = ({ propName }) => {
// 	return <div></div>;
// };

type MessageObj = {
	senderUserId: string;
	firstName: string;
	lastName: string;
	text: string;
};

const Chat: FC = () => {
	const { targetUserId } = useParams();

	const [messages, setMessages] = useState<Array<MessageObj>>([]);
	const [newMessage, setNewMessage] = useState("");
	const [chatDetails, setChatDetails] = useState<ChatDetails | null>(null);
	const user = useAppSelector((store) => store.user.user);
	const userId = user?._id;
	//TODO: while api call is being made show loader/shimmer
	//TODO: Handle error emitted from socket serverside
	//TODO: Show green dot when online
	//TODO: last seen by storing the information about the connection that timestamp can tell u last seen and keep  updating that
	//TODO: Scroll down auto when new messages arrive in chat area
	//TODO: Project Idea tictactoe game using socketIO
	//TODO: Project Idea chess game using socketIO
	//TODO: Games like typeracer socketIo

	// const selectConnectionByUserId = user?.connections.filter();
	const getChatHistory = async () => {
		const res = await api.get(`/chat/${targetUserId}`, {
			withCredentials: true,
		});
		if (!res.status) {
			console.error("ERROR"); //TODO: TOAST not error 403 not a connection yet
		}
		/**
		 *Participants other than loggedInUser currently its only one cuz current setup is 2 person chat but scalable if goroup chats is used
		 */
		setChatDetails(res.data.data);
		if (res.data.data?.messages.length !== 0) {
			const oldMessages = res.data.data?.messages.map((msg: Message) => {
				return {
					senderUserId: msg.senderId._id,
					firstName: msg.senderId.firstName,
					lastName: msg.senderId.lastName,
					text: msg.text,
				};
			});
			// if (oldMessages.length > 0) {
			setMessages(oldMessages);
			// }
		}
	};

	useEffect(() => {
		if (!userId) {
			return;
		}
		getChatHistory();
	}, []);
	useEffect(() => {
		if (!userId || !chatDetails) {
			return;
		}

		const socket = createSocketConnection();
		socket.emit("joinChat", {
			// targetUserId: targetUserId?.trim(),
			chatId: chatDetails?._id,
		});
		socket.on(
			"messageReceived",
			({ senderUserId, firstName, lastName, text }) => {
				setMessages((prevMessages) => [
					...prevMessages,
					{ senderUserId, firstName, lastName, text },
				]);
			},
		);
		socket.on("app_error", (payload) => {
			console.log(payload);
		});
		socket.on("connect_error", (err) => {
			console.log(err.message); // "NO_TOKEN"
		});

		socket.on("err", (payload) => {
			console.log(payload);
		});

		return () => {
			socket.disconnect();
		};
	}, [userId, targetUserId, chatDetails]);

	const sendMessage = () => {
		if (newMessage.length === 0) {
			return;
		}

		const socket = createSocketConnection();
		if (!newMessage.trim()) return;
		if (!userId || !targetUserId) return;

		socket.emit("sendMessage", {
			chatId: chatDetails?._id,
			// targetUserId,
			text: newMessage.trim(),
		});

		setNewMessage("");
		socket.on("app_error", (payload) => {
			console.log(payload);
		});
		socket.on("connect_error", (err) => {
			console.log(err.message); // "NO_TOKEN"
		});
	};

	return (
		<div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] rounded-xl flex flex-col">
			<h1 className="p-5 border-b border-gray-600">
				{chatDetails?.participants[0]?.firstName +
					" " +
					chatDetails?.participants[0]?.lastName}
			</h1>
			<div className="flex-1 overflow-y-scroll p-5">
				{messages.map((msg, index) => {
					return (
						<div
							key={index}
							className={`chat ${user?._id === msg.senderUserId ? "chat-end" : "chat-start"}`}
						>
							<div className="chat-header">
								{`${msg.firstName}  ${msg.lastName}`}
								<time className="text-xs opacity-50"> 2 hours ago</time>
							</div>
							<div className="chat-bubble">{msg.text}</div>
							<div className="chat-footer opacity-50">Seen</div>
						</div>
					);
				})}
			</div>
			<div className="p-5 border-t border-gray-600 flex items-center gap-2">
				<input
					id="messageInput"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className="flex-1 border border-gray-500 rounded p-2"
				></input>
				<button onClick={sendMessage} className="btn btn-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
						/>
					</svg>
					{/*		<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="size-6"
					>
						<path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
					</svg>*/}
				</button>
			</div>
		</div>
	);
};
export default Chat;
