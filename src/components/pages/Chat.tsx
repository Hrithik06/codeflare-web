import { FC, useState } from "react";
import { useParams } from "react-router-dom";

// interface ComponentNameProps {
//   propName: type;
// }

// const ComponentName: FC<ComponentNameProps> = ({ propName }) => {
// 	return <div></div>;
// };
const ComponentName: FC = () => {
	const { targetUserId } = useParams();
	const [messages, setMessages] = useState(["hi , hello"]);
	return (
		<div className="h-[75vh] w-1/3 mx-auto border border-gray-500 rounded-xl m-5 flex flex-col">
			<h1 className="border-b border-gray-500 p-4">Chat</h1>
			<div className="flex-1 py-5">
				<div className="overflow-y-scroll h-3/4"></div>
				{messages.length > 0 ? (
					messages.map((msg, index) => {
						return (
							<div key={index} className="chat chat-start">
								<div className="chat-header">
									Obi-Wan Kenobi
									<time className="text-xs opacity-50">12:45</time>
								</div>
								<div className="chat-bubble ">{msg}</div>
								<div className="chat-footer opacity-50">Delivered</div>
							</div>
						);
					})
				) : (
					<div>Start a conversation</div>
				)}

				<div className="p-5 border-t border-gray-500 flex items-center gap-2 ">
					<input
						type="text"
						className="flex-1 border border-gray-400 rounded p-2 bg-gray-100 dark:bg-black"
					/>
					<button className="btn btn-secondary">
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="size-6"
						>
							<path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};
export default ComponentName;
