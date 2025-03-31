import React, { FormEvent, useEffect, useState } from "react";

import { skillsData } from "../utils/constants";
let skills: Array<string> = []; //contains only skills from skillsData

skillsData.map((value) => {
  value.skills.map((s) => {
    skills.push(s);
  });
});

//Get only unique skills
const skillsUniqueSet = new Set<string>(skills);
//Re-assign to skills, now "skills" contains only unique values
skills = Array.from(skillsUniqueSet);

const MultiSelectSearch = (): React.JSX.Element => {
  const [searchTxt, setSearchTxt] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);

  useEffect(() => {
    if (searchTxt.length === 0) {
      setSearchResults([]);
      return;
    }

    const timerId = setTimeout(() => {
      const filtered = skills.filter((value) =>
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
      setUserSkills([...userSkills, clickedSkill]);
      setSearchResults(
        searchResults.filter(
          (skill) => skill.toLowerCase() !== clickedSkill.toLowerCase(),
        ),
      );
    }
  };

  return (
    <fieldset className="fieldset">
      <label className="fieldset-label" htmlFor="skills">
        Skills
      </label>
      {userSkills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {userSkills.map((skill) => (
            //TODO: give some bg for x on click delete it and add back to searchskills
            <button
              className="flex border rounded-md p-2 border-gray-500"
              key={skill}
            >
              {skill}
              <span className="m-0 p-0">
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Skills"
          className="input w-full"
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
          <ul className="list bg-base-100 rounded-box shadow-md">
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
