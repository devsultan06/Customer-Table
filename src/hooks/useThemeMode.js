import { useState, useEffect } from "react";

const useThemeMode = () => {
  const [theme, setTheme] = useState(() => {
    // Get the theme from localStorage or default to "light"
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.add(savedTheme); // Apply theme immediately
    return savedTheme;
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save the theme to localStorage
    document.documentElement.classList.replace(theme, newTheme); // Update the class on <html>
  };

  useEffect(() => {
    // This ensures the <html> element always has the current theme class
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useThemeMode;
