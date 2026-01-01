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
		<div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
				/>
			</div>
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
					Contact
				</h2>
				<p className="mt-2 text-lg/8 text-gray-600">
					Have a question? or just want to say hi
					{String.fromCodePoint(0x1f44b)}
				</p>
			</div>
			{(errorMsg.length > 0 || !isAuthenticated) && (
				<div
					role="alert"
					className="mx-auto mt-4 max-w-xl alert alert-error alert-soft"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="h-6 w-6 shrink-0 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					{!isAuthenticated ? (
						<span>Please login before sending a message</span>
					) : (
						<span>{errorMsg}</span>
					)}
				</div>
			)}
			<form className="mx-auto max-w-xl sm:mt-12" onSubmit={handleSubmit}>
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
									className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
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
									className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
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
							className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
