import { useState } from "react";

import { userZodSchema } from "../utils/zodSchema";
import UserInterface from "../interface/UserInterface";
import { validateDOB } from "../utils/helper";
import { ZodError } from "zod";
type UserProps = { user: UserInterface };

const ProfileEdit = ({ user }: UserProps) => {
  const dateOfBirthString: string = user.dateOfBirth.split("T")[0];
  const [yearStr, setYearStr] = useState(dateOfBirthString.split("-")[0]);
  const [monthStr, setMonthStr] = useState(dateOfBirthString.split("-")[1]);
  const [dayStr, setDayStr] = useState(dateOfBirthString.split("-")[2]);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  // const [emailId, setEmailId] = useState(user.emailId);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");

  const handleSave = () => {
    try {
      setError("");
      const isValidDOB = validateDOB(yearStr, monthStr, dayStr);

      if (!isValidDOB) {
        setError("Please enter a valid date.");
        return;
      }

      const updatedUser: UserInterface = {
        firstName: firstName,
        lastName: lastName,
        emailId: user.emailId,
        dateOfBirth: `${yearStr}-${monthStr}-${dayStr}`,
        gender: gender,
        about: about,
        photoUrl: photoUrl,
        skills: skills,
      };
      userZodSchema.parse(updatedUser);
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
      }
    }
  };
  return (
    <>
      <form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mx-auto">
        <legend className="fieldset-legend text-xl">Profile</legend>

        <label className="fieldset-label" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          className="input"
          // placeholder="John"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          id="firstName"
          name="firstName"
        />

        <label className="fieldset-label" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          className="input"
          // placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          id="lastName"
          name="lastName"
        />

        <div className="tooltip tooltip-right" data-tip="Cannot be edited">
          <label className="fieldset-label" htmlFor="lastName">
            Email
          </label>
          <input
            type="email"
            className="input disabled:border-gray-600"
            value={user.emailId}
            id="emailId"
            name="emailId"
            readOnly
            disabled
          />
        </div>
        <label className="fieldset-label" htmlFor="about">
          About
        </label>
        <textarea
          className="textarea"
          placeholder="Bio"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          id="about"
          name="about"
        ></textarea>

        <fieldset className="fieldset flex">
          <legend className="fieldset-label">Date of Birth</legend>

          <input
            type="text"
            className="input"
            minLength={2}
            maxLength={2}
            value={dayStr}
            onChange={(e) => {
              setDayStr(e.target.value);
            }}
            id="day"
            name="day"
            placeholder="DD"
          />
          <input
            type="text"
            className="input"
            minLength={2}
            maxLength={2}
            value={monthStr}
            onChange={(e) => {
              setMonthStr(e.target.value);
            }}
            id="month"
            name="month"
            placeholder="MM"
          />
          <input
            type="text"
            className="input"
            minLength={4}
            maxLength={4}
            value={yearStr}
            onChange={(e) => {
              setYearStr(e.target.value);
            }}
            id="year"
            name="year"
            placeholder="YYYY"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-label">Gender</legend>
          <select
            defaultValue={gender}
            className="select"
            onChange={(e) => {
              setGender(e.target.value);
            }}
            id="gender"
            name="gender"
          >
            <option disabled={true}>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <legend className="fieldset-label">Photo</legend>
          <input type="file" className="file-input" id="photo" name="photo" />
        </fieldset>
        {error.length > 0 && (
          <div role="alert" className="alert alert-error alert-soft">
            <span>{error}</span>
          </div>
        )}
        <button
          className="btn btn-primary mt-4 w-1/3 mx-auto"
          type="button"
          onClick={handleSave}
        >
          Save
        </button>
      </form>
    </>
  );
};
export default ProfileEdit;
