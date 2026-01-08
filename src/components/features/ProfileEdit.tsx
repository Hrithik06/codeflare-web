import { UploadProfileImage } from "./index";
import api from "../../utils/axiosInstance";
import { AuthUser } from "../../interface/UserInterface";
import { useEffect, useState } from "react";
import { ZodError } from "zod";
import { setError, setUser } from "../../utils/userSlice";
import MultiSelectSearch from "../ui/MultiSelectSearch";
import { profileEditZodSchema } from "../../utils/zodSchema";
import { validateDOB, ageCalculate } from "../../utils/helper";
import { isAxiosError } from "axios";

import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import ProfilePreviewCard from "../ui/ProfilePreviewCard";
type UserProps = { user: AuthUser };

export default function ProfileEdit({ user }: UserProps) {
	const dispatch = useAppDispatch();
	console.log(user?.dateOfBirth);
	const dateOfBirthString: string =
		user.dateOfBirth?.toString().split("T")[0] || "";
	const [yearStr, setYearStr] = useState<string>(
		dateOfBirthString.split("-")[0] || "",
	);
	const [monthStr, setMonthStr] = useState<string>(
		dateOfBirthString.split("-")[1] || "",
	);
	const [dayStr, setDayStr] = useState<string>(dateOfBirthString.split("-")[2]);
	const [fullDate, setFullDate] = useState<string>(dateOfBirthString);
	const [age, setAge] = useState(user.age);

	const [firstName, setFirstName] = useState<string>(user.firstName);
	const [lastName, setLastName] = useState<string>(user.lastName);

	const [gender, setGender] = useState<string>(user.gender);
	const [about, setAbout] = useState<string>(user.about);
	const [skills, setSkills] = useState<string[]>(user.skills);

	const [showToast, setShowToast] = useState(false);

	const errorMsg = useAppSelector((store) => store.user.error);

	useEffect(() => {
		setFullDate(`${yearStr}-${monthStr}-${dayStr}`);
		if (validateDOB(yearStr, monthStr, dayStr)) {
			setAge(ageCalculate(fullDate));
		}
		// else {
		//   dispatch(setError("Invalid Date of Birth"));
		// }
	}, [dayStr, monthStr, yearStr, fullDate]);

	const handleSaveProfile = async () => {
		try {
			dispatch(setError(""));
			const isValidDOB = validateDOB(yearStr, monthStr, dayStr);

			if (!isValidDOB) {
				dispatch(setError("Please enter a valid date."));
				return;
			}
			//NOT NEEDED AS ZOD IS HANDLING IT
			// if (!["Man", "Woman", "Non-binary"].includes(gender)) {
			// 	dispatch(
			// 		setError(
			// 			"Invalid gender. Allowed values: 'Man', 'Woman', 'Non-binary'.",
			// 		),
			// 	);
			// 	return;
			// }

			if (about === undefined || about.length < 10 || about?.length > 200) {
				dispatch(setError("About must be between 10-200 characters"));
				return;
			}
			//Show Error when skills are less than 2
			if (skills.length < 2) {
				dispatch(setError("Add at least 2 skills"));
				return;
			}

			const formData = {
				firstName,
				lastName,
				dateOfBirth: `${yearStr}-${monthStr}-${dayStr}`,
				gender,
				about,
				skills,
			};

			const parsedData = profileEditZodSchema.parse(formData);
			await api
				.patch("/profile/edit", parsedData, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.data.success) {
						dispatch(setUser(res.data.data));

						setShowToast(true);

						setTimeout(() => {
							setShowToast(false);
						}, 3000);
					}
				});
		} catch (err) {
			if (err instanceof ZodError) {
				console.error(err);
				dispatch(setError(err.errors[0].message));
				return;
			}
			if (isAxiosError(err)) {
				dispatch(setError(err?.response?.data.message || err.message));
				return;
			}
			if (err instanceof Error) {
				console.error(err);
				dispatch(setError(err.message));
				return;
			}
			console.error(err);
			dispatch(setError("Unexpected Error. Please Try Again"));
		}
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<form className="bg-white rounded-2xl shadow-md p-6">
					<h1 className="text-2xl font-semibold mb-6">Edit profile</h1>
					<h3 className="text-sm font-medium text-gray-500 mt-8 mb-2">
						Basic information
					</h3>
					<div className="mb-4">
						<label
							className="block text-sm font-medium text-gray-700 mb-1"
							htmlFor="firstName"
						>
							First Name
						</label>
						<input
							type="text"
							className="w-full px-4 py-3 rounded-xl border border-gray-300
           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
           transition-all duration-200"
							// placeholder="John"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							id="firstName"
							name="firstName"
							autoComplete="given-name"
							minLength={1}
							maxLength={20}
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-sm font-medium text-gray-700 mb-1"
							htmlFor="lastName"
						>
							Last Name
						</label>
						<input
							type="text"
							className="w-full px-4 py-3 rounded-xl border border-gray-300
           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
           transition-all duration-200"
							// placeholder="Doe"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							id="lastName"
							name="lastName"
							autoComplete="family-name"
							minLength={1}
							maxLength={20}
						/>
					</div>
					<div className="tooltip tooltip-right" data-tip="Cannot be edited">
						<div className="mb-4">
							<label
								className="block text-sm font-medium text-gray-700 mb-1"
								htmlFor="lastName"
							>
								Email
							</label>
							<input
								type="email"
								className="w-full px-4 py-3 rounded-xl border border-gray-300
           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
           transition-all duration-200 disabled:border-gray-600 "
								value={user.emailId}
								id="emailId"
								name="emailId"
								readOnly
								disabled
							/>
						</div>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Date of birth
						</label>
						<div className="flex gap-2">
							<input
								required
								type="text"
								className="w-1/4 px-4 py-3 rounded-xl border border-gray-300
           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
           transition-all duration-200"
								minLength={2}
								maxLength={2}
								value={dayStr}
								onChange={(e) => {
									setDayStr(e.target.value);
								}}
								id="day"
								name="day"
								placeholder="DD"
								autoComplete="bday-day"
							/>
							<input
								required
								type="text"
								className="w-1/4 px-4 py-3 rounded-xl border border-gray-300
           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
           transition-all duration-200"
								minLength={2}
								maxLength={2}
								value={monthStr}
								onChange={(e) => {
									setMonthStr(e.target.value);
								}}
								id="month"
								name="month"
								placeholder="MM"
								autoComplete="bday-month"
							/>
							<input
								required
								type="text"
								className="w-2/4 px-4 py-3 rounded-xl border border-gray-300
           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
           transition-all duration-200"
								minLength={4}
								maxLength={4}
								value={yearStr}
								onChange={(e) => {
									setYearStr(e.target.value);
								}}
								id="year"
								name="year"
								placeholder="YYYY"
								autoComplete="bday-year"
							/>
						</div>
					</div>

					<div className="mb-4">
						<label
							className="block text-sm font-medium text-gray-700 mb-1"
							htmlFor="gender"
						>
							Gender
						</label>
						<select
							defaultValue={gender}
							className="select w-full"
							onChange={(e) => {
								setGender(e.target.value);
							}}
							id="gender"
							name="gender"
						>
							<option>Select Gender</option>
							<option>Man</option>
							<option>Woman</option>
							<option>Non-binary</option>
						</select>
					</div>

					<div className="mb-4">
						<h3 className="text-sm font-medium text-gray-500 mt-8 mb-2">
							About you
						</h3>

						{/*<label
							className="block text-sm font-medium text-gray-700 mb-1"
							htmlFor="about"
						>
							About
						</label>*/}
						<p className="text-xs text-gray-500 mb-1">
							A short introduction that helps others understand who you are.
						</p>

						<textarea
							required
							className="w-full px-4 py-3 rounded-xl border border-gray-300
							    focus:border-violet-500 focus:ring-2 focus:ring-violet-400
							    transition-all duration-200 disabled:border-gray-600"
							// className="textarea w-full"
							placeholder="Say something about you..."
							value={about}
							onChange={(e) => setAbout(e.target.value)}
							id="about"
							name="about"
						></textarea>
					</div>
					<h3 className="text-sm font-medium text-gray-500 mt-8 mb-2">
						Skills
					</h3>

					<MultiSelectSearch
						label="Skills"
						initialSkills={skills}
						setSkills={setSkills}
					/>

					<div className="mb-4">
						{/*<label
							className="block text-sm font-medium text-gray-700 mb-1"
							htmlFor="profileImage"
						>
							Photo
						</label>*/}
						<h3 className="text-sm font-medium text-gray-500 mt-8 mb-2">
							Profile Photo
						</h3>
						<UploadProfileImage />

						{/*{errorMsg && errorMsg.length > 0 && (
							<div role="alert" className="alert alert-error alert-soft">
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
								<span>{errorMsg}</span>
							</div>
						)}*/}
						{errorMsg && (
							<div className="mt-4 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
								{errorMsg}
							</div>
						)}
					</div>

					<button
						className="mt-8 w-1/3 mx-auto
             bg-violet-600 text-white font-medium
             py-3 rounded-xl
             hover:bg-violet-700
             focus:outline-none focus:ring-2 focus:ring-violet-400
             transition"
						type="button"
						onClick={handleSaveProfile}
					>
						Save
					</button>
				</form>

				<div className="sticky top-24 self-start">
					<ProfilePreviewCard
						user={{
							firstName,
							lastName,
							gender,
							about,
							skills,
							age,
							// dateOfBirth: fullDate,
							profileImageMeta: user.profileImageMeta,
							// updatedAt: user.updatedAt,
						}}
					/>
				</div>
			</div>

			{showToast && (
				<div
					className="fixed top-6 left-1/2 -translate-x-1/2
                  bg-violet-600 text-white px-6 py-3
                  rounded-xl shadow-lg"
				>
					Profile updated successfully
				</div>
			)}
		</div>
	);
}

// import { UploadProfileImage } from "./index";
// import api from "../../utils/axiosInstance";
// import { AuthUser } from "../../interface/UserInterface";

// import { useEffect, useState } from "react";
// import { ZodError } from "zod";
// import { setError, setUser } from "../../utils/userSlice";
// // import { MultiSelectSearch, UserCard } from "../ui";
// import MultiSelectSearch from "../ui/MultiSelectSearch";
// import UserCard from "../ui/UserCard";
// import { profileEditZodSchema } from "../../utils/zodSchema";
// import { validateDOB, ageCalculate } from "../../utils/helper";
// import { isAxiosError } from "axios";

// import { useAppDispatch, useAppSelector } from "../../utils/hooks";
// type UserProps = { user: AuthUser };

// export default function ProfileEdit({ user }: UserProps) {
// 	const dispatch = useAppDispatch();
// 	const dateOfBirthString: string =
// 		user.dateOfBirth?.toString().split("T")[0] || "";
// 	const [yearStr, setYearStr] = useState<string>(
// 		dateOfBirthString.split("-")[0] || "",
// 	);
// 	const [monthStr, setMonthStr] = useState<string>(
// 		dateOfBirthString.split("-")[1] || "",
// 	);
// 	const [dayStr, setDayStr] = useState<string>(dateOfBirthString.split("-")[2]);
// 	const [fullDate, setFullDate] = useState<string>(dateOfBirthString);
// 	const [age, setAge] = useState(user.age);

// 	const [firstName, setFirstName] = useState<string>(user.firstName);
// 	const [lastName, setLastName] = useState<string>(user.lastName);

// 	const [gender, setGender] = useState<string>(user.gender);
// 	const [about, setAbout] = useState<string>(user.about);
// 	const [skills, setSkills] = useState<string[]>(user.skills);

// 	const [showToast, setShowToast] = useState(false);

// 	const errorMsg = useAppSelector((store) => store.user.error);

// 	useEffect(() => {
// 		setFullDate(`${yearStr}-${monthStr}-${dayStr}`);
// 		if (validateDOB(yearStr, monthStr, dayStr)) {
// 			setAge(ageCalculate(fullDate));
// 		}
// 		// else {
// 		//   dispatch(setError("Invalid Date of Birth"));
// 		// }
// 	}, [dayStr, monthStr, yearStr, fullDate]);

// 	const handleSaveProfile = async () => {
// 		try {
// 			dispatch(setError(""));
// 			const isValidDOB = validateDOB(yearStr, monthStr, dayStr);

// 			if (!isValidDOB) {
// 				dispatch(setError("Please enter a valid date."));
// 				return;
// 			}
// 			//NOT NEEDED AS ZOD IS HANDLING IT
// 			// if (!["Man", "Woman", "Non-binary"].includes(gender)) {
// 			// 	dispatch(
// 			// 		setError(
// 			// 			"Invalid gender. Allowed values: 'Man', 'Woman', 'Non-binary'.",
// 			// 		),
// 			// 	);
// 			// 	return;
// 			// }

// 			if (about === undefined || about.length < 10 || about?.length > 200) {
// 				dispatch(setError("About must be between 10-200 characters"));
// 				return;
// 			}
// 			//Show Error when skills are less than 2
// 			if (skills.length < 2) {
// 				dispatch(setError("Add at least 2 skills"));
// 				return;
// 			}

// 			const formData = {
// 				firstName,
// 				lastName,
// 				dateOfBirth: `${yearStr}-${monthStr}-${dayStr}`,
// 				gender,
// 				about,
// 				skills,
// 			};

// 			const parsedData = profileEditZodSchema.parse(formData);

// 			await api
// 				.patch("/profile/edit", parsedData, {
// 					withCredentials: true,
// 				})
// 				.then((res) => {
// 					if (res.data.success) {
// 						dispatch(setUser(res.data.data));

// 						setShowToast(true);

// 						setTimeout(() => {
// 							setShowToast(false);
// 						}, 3000);
// 					}
// 				});
// 		} catch (err) {
// 			if (err instanceof ZodError) {
// 				console.error(err);
// 				dispatch(setError(err.errors[0].message));
// 				return;
// 			}
// 			if (isAxiosError(err)) {
// 				dispatch(setError(err?.response?.data.message || err.message));
// 				return;
// 			}
// 			if (err instanceof Error) {
// 				console.error(err);
// 				dispatch(setError(err.message));
// 				return;
// 			}
// 			console.error(err);
// 			dispatch(setError("Unexpected Error. Please Try Again"));
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="p-4 flex flex-col sm:flex-row justify-evenly">
// 				<form className="fieldset xl:w-md bg-base-200 border border-base-300 p-4 rounded-box">
// 					<legend className="fieldset-legend text-xl">Profile</legend>

// 					<label className="fieldset-label" htmlFor="firstName">
// 						First Name
// 					</label>
// 					<input
// 						type="text"
// 						className="input w-full"
// 						// placeholder="John"
// 						value={firstName}
// 						onChange={(e) => setFirstName(e.target.value)}
// 						id="firstName"
// 						name="firstName"
// 						autoComplete="given-name"
// 						minLength={1}
// 						maxLength={20}
// 					/>

// 					<label className="fieldset-label" htmlFor="lastName">
// 						Last Name
// 					</label>
// 					<input
// 						type="text"
// 						className="input w-full"
// 						// placeholder="Doe"
// 						value={lastName}
// 						onChange={(e) => setLastName(e.target.value)}
// 						id="lastName"
// 						name="lastName"
// 						autoComplete="family-name"
// 						minLength={1}
// 						maxLength={20}
// 					/>

// 					<div className="tooltip tooltip-right" data-tip="Cannot be edited">
// 						<label className="fieldset-label" htmlFor="lastName">
// 							Email
// 						</label>
// 						<input
// 							type="email"
// 							className="input disabled:border-gray-600 w-full"
// 							value={user.emailId}
// 							id="emailId"
// 							name="emailId"
// 							readOnly
// 							disabled
// 						/>
// 					</div>

// 					<fieldset className="fieldset flex ">
// 						<legend className="fieldset-label">Date of Birth</legend>
// 						<input
// 							required
// 							type="text"
// 							className="input"
// 							minLength={2}
// 							maxLength={2}
// 							value={dayStr}
// 							onChange={(e) => {
// 								setDayStr(e.target.value);
// 							}}
// 							id="day"
// 							name="day"
// 							placeholder="DD"
// 							autoComplete="bday-day"
// 						/>
// 						<input
// 							required
// 							type="text"
// 							className="input"
// 							minLength={2}
// 							maxLength={2}
// 							value={monthStr}
// 							onChange={(e) => {
// 								setMonthStr(e.target.value);
// 							}}
// 							id="month"
// 							name="month"
// 							placeholder="MM"
// 							autoComplete="bday-month"
// 						/>
// 						<input
// 							required
// 							type="text"
// 							className="input"
// 							minLength={4}
// 							maxLength={4}
// 							value={yearStr}
// 							onChange={(e) => {
// 								setYearStr(e.target.value);
// 							}}
// 							id="year"
// 							name="year"
// 							placeholder="YYYY"
// 							autoComplete="bday-year"
// 						/>
// 					</fieldset>

// 					<fieldset className="fieldset">
// 						<label className="fieldset-label" htmlFor="gender">
// 							Gender
// 						</label>
// 						<select
// 							defaultValue={gender}
// 							className="select w-full"
// 							onChange={(e) => {
// 								setGender(e.target.value);
// 							}}
// 							id="gender"
// 							name="gender"
// 						>
// 							<option>Select Gender</option>
// 							<option>Man</option>
// 							<option>Woman</option>
// 							<option>Non-binary</option>
// 						</select>
// 						<label className="fieldset-label" htmlFor="about">
// 							About
// 						</label>
// 						<textarea
// 							required
// 							className="textarea w-full"
// 							placeholder="Bio"
// 							value={about}
// 							onChange={(e) => setAbout(e.target.value)}
// 							id="about"
// 							name="about"
// 						></textarea>

// 						<MultiSelectSearch
// 							label="Skills"
// 							initialSkills={skills}
// 							setSkills={setSkills}
// 						/>

// 						<label className="fieldset-label" htmlFor="profileImage">
// 							Photo
// 						</label>
// 						<UploadProfileImage />
// 					</fieldset>
// 					{errorMsg && errorMsg.length > 0 && (
// 						<div role="alert" className="alert alert-error alert-soft">
// 							<svg
// 								xmlns="http://www.w3.org/2000/svg"
// 								fill="none"
// 								viewBox="0 0 24 24"
// 								className="h-6 w-6 shrink-0 stroke-current"
// 							>
// 								<path
// 									strokeLinecap="round"
// 									strokeLinejoin="round"
// 									strokeWidth="2"
// 									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// 								></path>
// 							</svg>
// 							<span>{errorMsg}</span>
// 						</div>
// 					)}

// 					<button
// 						className="btn btn-primary mt-4 w-1/3 mx-auto"
// 						type="button"
// 						onClick={handleSaveProfile}
// 					>
// 						Save
// 					</button>
// 				</form>

// 				<div>
// 					<UserCard
// 						user={{
// 							_id: user._id,
// 							firstName,
// 							lastName,
// 							gender,
// 							about,
// 							skills,
// 							age,
// 							dateOfBirth: fullDate,
// 							profileImageMeta: user.profileImageMeta,
// 							updatedAt: user.updatedAt,
// 						}}
// 					/>
// 				</div>
// 			</div>

// 			{showToast ? (
// 				<div className="toast toast-center toast-top">
// 					<div className="alert alert-success">
// 						<span>Profile updated successfully.</span>
// 					</div>
// 				</div>
// 			) : null}
// 		</>
// 	);
// }

// import { useEffect, useState } from "react";
// import { ZodError } from "zod";
// import { setError, setUser } from "../../utils/userSlice";
// import { MultiSelectSearch, UserCard } from "./index";
// import { userZodSchema } from "../../utils/zodSchema";
// import { UserInterface } from "../interface/UserInterface";
// import { validateDOB, ageCalculate } from "../../utils/helper";
// import api from "../../utils/axiosInstance";
// import { AxiosError } from "axios";

// import { useAppDispatch, useAppSelector } from "../../utils/hooks";
// type UserProps = { user: UserInterface };

// const ProfileEdit = ({ user }: UserProps) => {
// 	const dispatch = useAppDispatch();
// 	const dateOfBirthString: string =
// 		user.dateOfBirth?.toString().split("T")[0] || "";
// 	const [yearStr, setYearStr] = useState<string>(
// 		dateOfBirthString.split("-")[0] || "",
// 	);
// 	const [monthStr, setMonthStr] = useState<string>(
// 		dateOfBirthString.split("-")[1] || "",
// 	);
// 	const [dayStr, setDayStr] = useState<string>(dateOfBirthString.split("-")[2]);
// 	const [fullDate, setFullDate] = useState<string>(dateOfBirthString);
// 	const [age, setAge] = useState(user.age);

// 	const [firstName, setFirstName] = useState<string>(user.firstName);
// 	const [lastName, setLastName] = useState<string>(user.lastName);

// 	const [gender, setGender] = useState<string>(user.gender);
// 	const [about, setAbout] = useState<string>(user.about);
// 	const [skills, setSkills] = useState<string[]>(user.skills);
// 	// const [photoUrl, setPhotoUrl] = useState(user.photoUrl);//TODO: photoUrl

// 	const [showToast, setShowToast] = useState(false);

// 	const errorMsg = useAppSelector((store) => store.user.error);

// 	useEffect(() => {
// 		setFullDate(`${yearStr}-${monthStr}-${dayStr}`);
// 		if (validateDOB(yearStr, monthStr, dayStr)) {
// 			setAge(ageCalculate(fullDate));
// 		}
// 		// else {
// 		//   dispatch(setError("Invalid Date of Birth"));
// 		// }
// 	}, [dayStr, monthStr, yearStr, fullDate]);

// 	// useEffect(() => {
// 	//   const newAge = ageCalculate(fullDate);
// 	//   console.log(newAge);
// 	// }, [fullDate]);
// 	const handleSave = async () => {
// 		try {
// 			const userUpdateZodSchema = userZodSchema.omit({
// 				emailId: true,
// 				password: true,
// 			}); // do not let user to update emailId and password here
// 			//  .partial();

// 			dispatch(setError(""));
// 			const isValidDOB = validateDOB(yearStr, monthStr, dayStr);

// 			if (!isValidDOB) {
// 				dispatch(setError("Please enter a valid date."));
// 				return;
// 			}
// 			if (!["Man", "Woman", "Non-binary"].includes(gender)) {
// 				dispatch(
// 					setError(
// 						"Invalid gender. Allowed values: 'Man', 'Woman', 'Non-binary'.",
// 					),
// 				);
// 				return;
// 			}

// 			if (about === undefined || about.length < 10 || about?.length > 200) {
// 				dispatch(setError("About must be between 10-200 characters"));
// 				return;
// 			}
// 			//Show Error when skills are less than 2
// 			if (skills.length < 2) {
// 				dispatch(setError("Add at least 2 skills"));
// 				return;
// 			}

// 			const updatedUser: UserInterface = {
// 				_id: user._id,
// 				firstName: firstName,
// 				lastName: lastName,
// 				dateOfBirth: `${yearStr}-${monthStr}-${dayStr}`,
// 				gender: gender,
// 				about: about,
// 				photoUrl: user.photoUrl, //TODO: photoUrl
// 				skills: skills,
// 			};
// 			userUpdateZodSchema.parse(updatedUser);

// 			await api
// 				.patch("/profile/edit", updatedUser, {
// 					withCredentials: true,
// 				})
// 				.then((res) => {
// 					if (res.data.success) {
// 						dispatch(setUser(res.data.data));

// 						setShowToast(true);

// 						setTimeout(() => {
// 							setShowToast(false);
// 						}, 3000);
// 					}
// 				});
// 		} catch (err) {
// 			if (err instanceof ZodError) {
// 				console.error(err);
// 				dispatch(setError(err.errors[0].message));
// 				return;
// 			}
// 			if (err instanceof AxiosError) {
// 				dispatch(setError(err?.response?.data.message || err.message));
// 				return;
// 			}
// 			if (err instanceof Error) {
// 				console.error(err);
// 				dispatch(setError(err.message));
// 				return;
// 			}
// 			console.error(err);
// 			dispatch(setError("Unexpected Error. Please Try Again"));
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="p-4 flex justify-evenly">
// 				<form className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box">
// 					<legend className="fieldset-legend text-xl">Profile</legend>

// 					<label className="fieldset-label" htmlFor="firstName">
// 						First Name
// 					</label>
// 					<input
// 						type="text"
// 						className="input w-full"
// 						// placeholder="John"
// 						value={firstName}
// 						onChange={(e) => setFirstName(e.target.value)}
// 						id="firstName"
// 						name="firstName"
// 						autoComplete="given-name"
// 						minLength={1}
// 						maxLength={20}
// 					/>

// 					<label className="fieldset-label" htmlFor="lastName">
// 						Last Name
// 					</label>
// 					<input
// 						type="text"
// 						className="input w-full"
// 						// placeholder="Doe"
// 						value={lastName}
// 						onChange={(e) => setLastName(e.target.value)}
// 						id="lastName"
// 						name="lastName"
// 						autoComplete="family-name"
// 						minLength={1}
// 						maxLength={20}
// 					/>

// 					<div className="tooltip tooltip-right" data-tip="Cannot be edited">
// 						<label className="fieldset-label" htmlFor="lastName">
// 							Email
// 						</label>
// 						<input
// 							type="email"
// 							className="input disabled:border-gray-600 w-full"
// 							value={user.emailId}
// 							id="emailId"
// 							name="emailId"
// 							readOnly
// 							disabled
// 						/>
// 					</div>

// 					<fieldset className="fieldset flex ">
// 						<legend className="fieldset-label">Date of Birth</legend>
// 						<input
// 							required
// 							type="text"
// 							className="input"
// 							minLength={2}
// 							maxLength={2}
// 							value={dayStr}
// 							onChange={(e) => {
// 								setDayStr(e.target.value);
// 							}}
// 							id="day"
// 							name="day"
// 							placeholder="DD"
// 							autoComplete="bday-day"
// 						/>
// 						<input
// 							required
// 							type="text"
// 							className="input"
// 							minLength={2}
// 							maxLength={2}
// 							value={monthStr}
// 							onChange={(e) => {
// 								setMonthStr(e.target.value);
// 							}}
// 							id="month"
// 							name="month"
// 							placeholder="MM"
// 							autoComplete="bday-month"
// 						/>
// 						<input
// 							required
// 							type="text"
// 							className="input"
// 							minLength={4}
// 							maxLength={4}
// 							value={yearStr}
// 							onChange={(e) => {
// 								setYearStr(e.target.value);
// 							}}
// 							id="year"
// 							name="year"
// 							placeholder="YYYY"
// 							autoComplete="bday-year"
// 						/>
// 					</fieldset>

// 					<fieldset className="fieldset">
// 						<label className="fieldset-label" htmlFor="gender">
// 							Gender
// 						</label>
// 						<select
// 							defaultValue={gender}
// 							className="select w-full"
// 							onChange={(e) => {
// 								setGender(e.target.value);
// 							}}
// 							id="gender"
// 							name="gender"
// 						>
// 							<option>Select Gender</option>
// 							<option>Man</option>
// 							<option>Woman</option>
// 							<option>Non-binary</option>
// 						</select>
// 						<label className="fieldset-label" htmlFor="about">
// 							About
// 						</label>
// 						<textarea
// 							required
// 							className="textarea w-full"
// 							placeholder="Bio"
// 							value={about}
// 							onChange={(e) => setAbout(e.target.value)}
// 							id="about"
// 							name="about"
// 						></textarea>

// 						<MultiSelectSearch
// 							label="Skills"
// 							initialSkills={skills}
// 							setSkills={setSkills}
// 						/>

// 						<label className="fieldset-label" htmlFor="photo">
// 							Photo
// 						</label>
// 						<input type="file" className="file-input" id="photo" name="photo" />
// 					</fieldset>
// 					{errorMsg && errorMsg.length > 0 && (
// 						<div role="alert" className="alert alert-error alert-soft">
// 							<svg
// 								xmlns="http://www.w3.org/2000/svg"
// 								fill="none"
// 								viewBox="0 0 24 24"
// 								className="h-6 w-6 shrink-0 stroke-current"
// 							>
// 								<path
// 									strokeLinecap="round"
// 									strokeLinejoin="round"
// 									strokeWidth="2"
// 									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// 								></path>
// 							</svg>
// 							<span>{errorMsg}</span>
// 						</div>
// 					)}
// 					<button
// 						className="btn btn-primary mt-4 w-1/3 mx-auto"
// 						type="button"
// 						onClick={handleSave}
// 					>
// 						Save
// 					</button>
// 				</form>

// 				<div>
// 					<UserCard
// 						user={{
// 							_id: user._id,
// 							firstName,
// 							lastName,
// 							gender,
// 							about,
// 							skills,
// 							photoUrl: user.photoUrl,
// 							age,
// 							dateOfBirth: fullDate,
// 						}}
// 					/>
// 				</div>
// 			</div>

// 			{showToast ? (
// 				<div className="toast toast-center toast-top">
// 					<div className="alert alert-success">
// 						<span>Profile updated successfully.</span>
// 					</div>
// 				</div>
// 			) : null}
// 		</>
// 	);
// };
// export default ProfileEdit;
