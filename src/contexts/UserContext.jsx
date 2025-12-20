import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    // ✅ Parte SIN sesión
    return localStorage.getItem("token") === "true";
  });

  const login = () => {
    setToken(true);
    localStorage.setItem("token", "true");
  };

  const logout = () => {
    setToken(false);
    localStorage.setItem("token", "false");
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
