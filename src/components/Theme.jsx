import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, LightMode } from "@mui/icons-material"; 
import useThemeMode from "../hooks/useThemeMode";

const Theme = () => {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <div className="fixed top-[30px] right-[50px]">
      <IconButton onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "dark" ? (
          <LightMode className="text-white" /> 
        ) : (
          <Brightness4 className="text-black" /> 
        )}
      </IconButton>
    </div>
  );
};

export default Theme;
