import { createContext } from "react";

export const LoginContext = createContext();

export const LoginContextWrapper = ({ children }) => {
  return (
    <LoginContext.Provider
      value={{
        login: "j@d.ua",
        password: 2323,
        isLoggedIn: false,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
