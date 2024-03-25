import { useState } from "react";

export const GenderCheckbox = ({ gender, setGender }) => {
  const handleGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="space-x-4">
      <label className="cursor-pointer label">
        <span className="label-text ml-4">Male</span>
        <input
          type="radio"
          onChange={handleGender}
          name="gender"
          className="radio radio-accent"
          value="male"
          checked={gender === "male"}
        />
      </label>

      <label className="cursor-pointer label">
        <span className="label-text">Female</span>
        <input
          type="radio"
          onChange={handleGender}
          name="gender"
          className="radio radio-accent"
          value="female"
          checked={gender === "female"}
        />
      </label>
    </div>
  );
};
