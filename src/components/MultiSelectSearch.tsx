import React, { useReducer, useEffect, useState } from "react";

import { skillsData } from "../utils/constants";
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
      const newSkillList = initialSkillsFromDB.map(
        (value) => !skillList.includes(value),
      );
      console.log(newSkillList);
      return {
        userSkills: [...initialSkillsFromDB],
        skillList,
      };
    }
    default:
      return state;
  }
}
const initialState: State = { userSkills: [], skillList: skillsArr };
type MultiSelectSearchProps = { label: string; initialSkills: string[] };
const MultiSelectSearch = ({
  label,
  initialSkills,
}: MultiSelectSearchProps): React.JSX.Element => {
  const [searchTxt, setSearchTxt] = useState("");

  const [state, dispatch] = useReducer(skillsReducer, initialState);

  const [searchResults, setSearchResults] = useState<string[]>([]);

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
    if (clickedSkill) dispatch({ type: "ADD", payload: clickedSkill });
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
    if (clickedSkill) dispatch({ type: "REMOVE", payload: clickedSkill });

    //Removed Pill should be added back to searchResults only if it includes searchText
    if (
      searchTxt !== "" &&
      clickedSkill.toLocaleLowerCase().includes(searchTxt.toLocaleLowerCase())
    ) {
      setSearchResults([...searchResults, clickedSkill]);
    }
  };

  return (
    <fieldset className="fieldset">
      <label className="fieldset-label" htmlFor="skills">
        {label}
      </label>
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
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Skills"
          className="input w-full p-2 rounded focus"
          value={searchTxt}
          onChange={(e) => {
            handleSearch(e);
          }}
          id="skills"
          name="skills"
        />
      </div>
      <div className="">
        {searchResults.length > 0 && (
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
    </fieldset>
  );
};

export default MultiSelectSearch;
