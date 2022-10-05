import React from "react";

const themes = [
  {
    background: "bg-cyan-600",
    textColor: "text-slate-200",
  },
  {
    background: "bg-violet-900",
    textColor: "text-slate-100",
  },
  {
    background: "bg-blue-800",
    textColor: "text-blue-100",
  },
  {
    background: "bg-slate-300",
    textColor: "text-slate-800",
  },
];

export const ThemesContext = React.createContext();

export const ThemesContextWrapper = ({ children }) => {
  return (
    <ThemesContext.Provider value={themes}>{children}</ThemesContext.Provider>
  );
};
