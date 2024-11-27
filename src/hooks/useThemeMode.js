//useThemeMode.js
import { useState, useEffect } from "react";

const useThemeMode = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.add(savedTheme);
    return savedTheme;
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save the theme to localStorage
    document.documentElement.classList.replace(theme, newTheme); // Update the class on <html>
  };

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useThemeMode;
