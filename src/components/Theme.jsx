import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, LightMode } from "@mui/icons-material"; // Use appropriate icons
import useThemeMode from "../hooks/useThemeMode";

const Theme = () => {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <div>
      <IconButton onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "dark" ? (
          <LightMode sx={{ color: "#000" }} /> // Dark mode icon
        ) : (
          <Brightness4 sx={{ color: "#000" }} /> // Light mode icon
        )}
      </IconButton>
    </div>
  );
};

export default Theme;
