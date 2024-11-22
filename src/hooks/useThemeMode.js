import { useState, useEffect } from "react";

const useThemeMode = () => {
  const [theme, setTheme] = useState(() => {
    // Get the theme from localStorage or default to "light"
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save the theme to localStorage
  };

  useEffect(() => {
    // Apply the theme class to the <html> element
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(savedTheme);
  }, []);

  useEffect(() => {
    // Add or remove the 'dark' or 'light' class to <html> on theme change
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme); // Save the current theme
  }, [theme]);

  return { theme, toggleTheme };
};

export default useThemeMode;
