import React from "react";

export const Input = ({
  className,
  placeholder,
  currentRef,
  onChangeHandler,
  name,
  value,
}) => {
  return (
    <input
      value={value}
      name={name}
      onChange={onChangeHandler}
      placeholder={placeholder}
      className={className}
      ref={currentRef}
    />
  );
};
