import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, LightMode } from "@mui/icons-material"; // Use appropriate icons
import useThemeMode from "../hooks/useThemeMode";

const Theme = () => {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <div className="fixed top-[30px] right-[50px]">
      <IconButton onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "dark" ? (
          <LightMode className="text-white" /> // Dark mode icon
        ) : (
          <Brightness4 className="text-black" /> // Light mode icon
        )}
      </IconButton>
    </div>
  );
};

export default Theme;