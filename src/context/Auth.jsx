import { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
      setUser(username);
      return true;
    }
    return false;
  };

  // const logout = () => {
  //   setIsLoggedIn(false);
  //   setUser(null);
  // };
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setWatchlist([]);
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
    }),
    [isLoggedIn, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider is missing");
  }
  return context;
};
