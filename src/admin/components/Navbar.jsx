import React, { useState, useEffect } from "react";
import { ProfileMenu } from "./ProfileMenu";
import MenuIcon from "@mui/icons-material/Menu";

export function ComplexNavbar({ isOpen, toggleSidebar, closeSidebar }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768;
      setIsSmallScreen(isSmall);

      if (!isSmall) {
        closeSidebar();
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [closeSidebar]);

  const handleToggleSidebar = () => {
    if (isSmallScreen) {
      toggleSidebar();
    }
  };
  return (
    <>
      <div className="fixed mx-auto z-40 w-full bg-[#f5f5f5] right-0 flex items-center justify-between text-blue-gray-900 p-[10px] ">
        <div className="md:hidden">
          <MenuIcon
            className="fixed top-4 left-4 text-[400px] rounded-md cursor-pointer"
            onClick={handleToggleSidebar}
          />
        </div>
        {isOpen && isSmallScreen && (
          <div
            className="fixed inset-0 z-[60px] bg-black bg-opacity-50"
            onClick={closeSidebar}
          />
        )}
        <div className="flex items-center ml-auto">
          <ProfileMenu />
        </div>{" "}
      </div>
    </>
  );
}
