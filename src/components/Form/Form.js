import React from "react";

export const Form = ({ children, className, onSubmitHandler }) => {
  return (
    <form onSubmit={onSubmitHandler} className={className}>
      {children}
    </form>
  );
};
