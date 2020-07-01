import React from "react";
import "./InputBox.css";

const InputBox = ({ title, type, handleChange, modifier }) => {
  return (
    <div className={"box" + modifier}>
      {title}
      <br />
      <input
        type={type}
        placeholder={title}
        name={title.toLowerCase()}
        className={"login" + modifier}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default InputBox;
