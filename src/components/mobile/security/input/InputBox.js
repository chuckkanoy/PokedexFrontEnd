import React from "react";
import "./InputBox.css";

const InputBox = ({ title, type, handleChange }) => {
  return (
    <div className="boxMobile">
      {title}
      <br />
      <input
        type={type}
        placeholder={title}
        name={title.toLowerCase()}
        className="loginMobile"
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default InputBox;
