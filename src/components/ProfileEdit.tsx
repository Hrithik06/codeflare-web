import React, { useState } from "react";
import UserInterface from "../interface/UserInterface";
type UserProps = {
  user: UserInterface;
};
const ProfileEdit = ({ user }: UserProps): React.JSX.Element => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [dob, setDob] = useState(user.dateOfBirth);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
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
          placeholder="John"
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
          placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          id="lastName"
          name="lastName"
        />
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

        <label className="fieldset-label" htmlFor="dob">
          Date of Birth
        </label>
        <input
          type="date"
          className="input"
          value={dob.toString()}
          onChange={(e) => {
            setDob(new Date(e.target.value));
            console.log(dob);
          }}
          id="dob"
          name="dob"
        />

        {/* <p className="text-red-500">{error}</p> */}
        <button
          className="btn btn-primary mt-4 w-1/3 mx-auto"
          type="button"
          // onClick={handleSave}
        >
          Save
        </button>
      </form>
    </>
  );
};
export default ProfileEdit;
