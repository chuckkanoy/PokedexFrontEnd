import React from "react";
import "./InputBox.css";

const InputBox = ({ title, type, handleChange }) => {
  return (
    <div className="box">
      {title}
      <br />
      <input
        type={type}
        placeholder={title}
        name={title.toLowerCase()}
        className="login"
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default InputBox;
