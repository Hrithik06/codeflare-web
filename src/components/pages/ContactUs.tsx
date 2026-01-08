import { useState } from "react";
import api from "../../utils/axiosInstance";
import { useAppSelector } from "../../utils/hooks";
import { RootState } from "../../utils/appStore";
export default function Example() {
	const [subjectTxt, setSubjectTxt] = useState("");
	const [messageTxt, setMessageTxt] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const isAuthenticated = useAppSelector(
		(store: RootState) => store.user.isAuthenticated,
	);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await api
			.post(
				"/contact-us",
				{ subject: subjectTxt, message: messageTxt },
				{ withCredentials: true },
			)
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.error(err.response.data);
				console.error(err.response.data.errors[0].message);
				setErrorMsg(err.response.data.errors[0].message);
			});
	};
	return (
		<div className="min-h-screen bg-gray-50 px-6 py-20 lg:px-8">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
					Get in touch
				</h2>
				<p className="mt-2 text-lg/8 text-gray-600">
					Have a question? or just want to say hi
					{String.fromCodePoint(0x1f44b)}
				</p>
			</div>
			{(errorMsg.length > 0 || !isAuthenticated) && (
				<div className="mx-auto mt-4 max-w-xl rounded-xl bg-red-50 text-red-600 px-4 py-3 text-sm">
					{!isAuthenticated
						? "Please log in before sending a message."
						: errorMsg}
				</div>
			)}
			<form
				className="mx-auto max-w-xl sm:mt-12 bg-white rounded-2xl shadow-sm p-6"
				onSubmit={handleSubmit}
			>
				<fieldset>
					<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
						<div className="sm:col-span-2">
							<label
								htmlFor="message"
								className="block text-sm/6 font-semibold text-gray-900"
							>
								Subject
							</label>
							<div className="mt-2.5">
								<input
									type="text"
									id="subject"
									name="subject"
									className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500"
									value={subjectTxt}
									placeholder="Subject"
									onChange={(e) => setSubjectTxt(e.target.value)}
									disabled={!isAuthenticated}
									minLength={10}
									maxLength={60}
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="message"
								className="block text-sm/6 font-semibold text-gray-900"
							>
								Message
							</label>
							<div className="mt-2.5">
								<textarea
									id="message"
									name="message"
									rows={4}
									className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500"
									value={messageTxt}
									disabled={!isAuthenticated}
									onChange={(e) => setMessageTxt(e.target.value)}
									placeholder={`Hi${String.fromCodePoint(0x1f44b)}`}
									minLength={10}
									maxLength={300}
								/>
							</div>
						</div>
					</div>
					<div className="mt-10">
						<button
							type="submit"
							className="block w-full rounded-md bg-violet-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
							disabled={!isAuthenticated}
						>
							Let's talk
						</button>
					</div>
				</fieldset>
			</form>
		</div>
	);
}
