import React, { useState } from "react";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxArrowDownIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import HomeIcon from "@mui/icons-material/Home";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogOut";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    to: "/admin/profile",
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    to: "/admin/inbox",
  },
  {
    label: "Home",
    icon: HomeIcon,
    to: "/home",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

export function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const { handleLogout } = useLogout();

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler className="cursor-pointer">
        <AccountCircleIcon sx={{ fontSize: "35px" }} />
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, to }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return isLastItem ? (
            <MenuItem
              key={label}
              onClick={handleLogout}
              className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
            >
              {React.createElement(icon, {
                className: "h-4 w-4 text-red-500",
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="red"
              >
                {label}
              </Typography>
            </MenuItem>
          ) : (
            <Link
              to={to}
              key={label}
              onClick={closeMenu}
              className="block focus:outline-none"
            >
              <MenuItem className="flex items-center gap-2 rounded">
                {React.createElement(icon, {
                  className: "h-4 w-4",
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal text-inherit"
                >
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}
