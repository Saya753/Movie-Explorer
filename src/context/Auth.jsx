// state:
// isLoggedIn
// user
// login()
// logout()

import { createContext, useContext, useState } from "react";

// 1. ایجاد کانتکست
const AuthContext = createContext();

// 2. ساخت Provider برای مدیریت وضعیت و توابع
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
      setUser(username);
      return true; // برای هدایت کاربر به صفحه واچ‌لیست در کامپوننت لاگین
    }
    return false; // برای نمایش خطا و فوکوس روی input در کامپوننت لاگین
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. هوک سفارشی برای دسترسی راحت‌تر در کامپوننت‌ها
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};