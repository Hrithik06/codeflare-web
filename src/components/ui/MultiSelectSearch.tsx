import React, { useReducer, useEffect, useState } from "react";

import { skillsData } from "../../utils/constants";
let skillsArr: Array<string> = []; //contains only skills from skillsData

skillsData.map((category) => {
	category.skills.map((s) => {
		skillsArr.push(s);
	});
});

//Get only unique skills
const skillsUniqueSet = new Set<string>(skillsArr);
//Re-assign to skillsArr, now "skillsArr" contains only unique values
skillsArr = Array.from(skillsUniqueSet);

type State = {
	userSkills: string[];
	skillList: string[];
};

type AppActions =
	| { type: "ADD"; payload: string }
	| { type: "REMOVE"; payload: string }
	| { type: "SET_INITIAL"; payload: string[] };

function skillsReducer(state: State, action: AppActions): State {
	const { type, payload } = action;
	const { userSkills, skillList } = state;
	switch (type) {
		case "ADD": {
			const skillValueToAdd = payload;
			const newSkillList = skillList.filter(
				(v: string) => v !== skillValueToAdd,
			);
			return {
				userSkills: [...userSkills, skillValueToAdd],
				skillList: [...newSkillList],
			};
		}

		case "REMOVE": {
			const skillValueToRemove = payload;
			const newUserSkillList = userSkills.filter(
				(v: string) => v !== skillValueToRemove,
			);
			return {
				userSkills: [...newUserSkillList],
				skillList: [...skillList, skillValueToRemove],
			};
		}

		//TODO: remove skills from DB from skillList so they don't come up in Search
		case "SET_INITIAL": {
			const initialSkillsFromDB = payload;
			const newSkillList = skillList.filter(
				(x) => !initialSkillsFromDB.includes(x),
			);
			//  console.log(newSkillList);
			return {
				userSkills: [...initialSkillsFromDB],
				skillList: newSkillList,
			};
		}
		default:
			return state;
	}
}
const initialState: State = { userSkills: [], skillList: skillsArr };
type MultiSelectSearchProps = {
	label: string;
	initialSkills: string[];
	setSkills: React.Dispatch<React.SetStateAction<string[]>>;
};

const MultiSelectSearch = ({
	label,
	initialSkills,
	setSkills,
}: MultiSelectSearchProps): React.JSX.Element => {
	const [searchTxt, setSearchTxt] = useState("");

	const [state, dispatch] = useReducer(skillsReducer, initialState);

	const [searchResults, setSearchResults] = useState<string[]>([]);

	const [showSelect, setShowSelect] = useState(false);

	useEffect(() => {
		if (initialSkills.length > 0) {
			dispatch({ type: "SET_INITIAL", payload: initialSkills });
		}
	}, []);
	useEffect(() => {
		if (searchTxt.length === 0) {
			setSearchResults([]);
			return;
		}

		const timerId = setTimeout(() => {
			const filtered = state.skillList.filter((value: string) =>
				value.toLowerCase().includes(searchTxt.toLowerCase()),
			);
			setSearchResults(filtered);
		}, 500);

		return () => clearTimeout(timerId);
	}, [searchTxt]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTxt(e.target.value); // Update search text
	};

	const handleAddSkill = (e: React.MouseEvent<HTMLLIElement>) => {
		const clickedSkill = e.currentTarget.textContent;
		if (clickedSkill) {
			dispatch({ type: "ADD", payload: clickedSkill });
			setSkills((prev) => [...prev, clickedSkill]);
		}
		//Removing the selected pill from search
		setSearchResults(searchResults.filter((option) => option !== clickedSkill));
	};

	/**
  FIXME: as state changes for any of the useState, re-render happens so all are loaded again,
  and after re-render searchResults will have skills which were removed.
  If I have added it userSkills and if I again search from start, it again shows same results b
  ecause component rerenders and array contains data from start

  */
	const handleRemoveSkill = (skill: string) => {
		const clickedSkill = skill;
		if (clickedSkill) {
			dispatch({ type: "REMOVE", payload: clickedSkill });
			setSkills((prev) => prev.filter((x) => x !== clickedSkill));
		}

		//Removed Pill should be added back to searchResults only if it includes searchText
		if (
			searchTxt !== "" &&
			clickedSkill.toLocaleLowerCase().includes(searchTxt.toLocaleLowerCase())
		) {
			setSearchResults([...searchResults, clickedSkill]);
		}
	};

	return (
		<div className="mb-4">
			<label
				className="block text-sm font-medium text-gray-700 mb-1"
				htmlFor="skills"
			>
				{label}
			</label>
			<div className="outline-1 outline-gray-500 rounded-xl p-2">
				<span className="inline-block">
					{state.userSkills.length > 0 && (
						<div className="flex flex-wrap gap-1 mb-2">
							{state.userSkills.map((skill) => (
								<div
									className="btn btn-sm text-xs btn-primary rounded-full "
									key={skill}
								>
									{skill}
									<button
										onClick={() => handleRemoveSkill(skill)}
										className="hover:cursor-pointer"
									>
										<svg
											className="swap-on fill-current "
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 512 512"
										>
											<polygon
												points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51
                  145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
											/>
										</svg>
									</button>
								</div>
							))}
						</div>
					)}
				</span>

				<input
					type="text"
					placeholder="Add at least 2 skill"
					// className="py-1 focus:outline-0 w-full bg-transparent"
					className="w-full px-4 py-3 rounded-xl border border-gray-300
           focus:border-violet-500 focus:ring-2 focus:ring-violet-400
           transition-all duration-200"
					value={searchTxt}
					onChange={(e) => {
						handleSearch(e);
					}}
					onBlur={() =>
						setTimeout(() => {
							setShowSelect(false);
						}, 200)
					}
					onFocus={() => setShowSelect(true)}
					id="skills"
					name="skills"
				/>
			</div>

			{searchResults.length > 0 && showSelect && (
				<ul className="list bg-base-100 rounded-box shadow-md max-h-48 overflow-y-scroll">
					{searchResults.map((skill) => (
						<li
							className="list-row hover:cursor-pointer"
							onClick={(e) => handleAddSkill(e)}
							key={skill}
						>
							{skill}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MultiSelectSearch;
