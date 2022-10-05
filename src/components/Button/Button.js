import React from "react";

export const Button = ({ className, children, onClickHandler }) => {
  return (
    <button onClick={onClickHandler} className={className}>
      {children}
    </button>
  );
};
