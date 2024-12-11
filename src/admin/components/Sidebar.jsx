import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogOut";
import { useCustomerContext } from "../contexts/CustomerContext";

const iconComponents = {
  PresentationChartBarIcon: (
    <PresentationChartBarIcon className="h-5 w-5 text-white" />
  ),
  UserCircleIcon: <UserCircleIcon className="h-5 w-5" />,
  Cog6ToothIcon: <Cog6ToothIcon className="h-5 w-5" />,
  InboxIcon: <InboxIcon className="h-5 w-5" />,
  PeopleIcon: <PeopleIcon className="h-5 w-5" />,
  AdminPanelSettingsIcon: <AdminPanelSettingsIcon className="h-5 w-5" />,
};

export function Sidebar({ isOpen, closeSidebar }) {
  const { totalCustomer } = useCustomerContext();

  const menuItems = [
    {
      to: "/admin/dashboard",
      label: "Dashboard",
      icon: "PresentationChartBarIcon",
    },
    {
      to: "/admin/customers",
      label: "Customers",
      icon: "PeopleIcon",
    },
    {
      to: "/admin/roles",
      label: "Roles & Permissions",
      icon: "AdminPanelSettingsIcon",
      divider: true, // Indicates an hr should appear after this item
    },
    {
      to: "/admin/inbox",
      label: "Inbox",
      icon: "InboxIcon",
      chip: totalCustomer,
    },
    {
      to: "/admin/profile",
      label: "Profile",
      icon: "UserCircleIcon",
    },
    {
      to: "/admin/settings",
      label: "Settings",
      icon: "Cog6ToothIcon",
    },
  ];

  const { pathname } = useLocation(); // Get the current path
  const { handleLogout } = useLogout();

  const isActive = (path) => pathname === path;

  return (
    <div>
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[300px] bg-[#1976d2] text-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Card className="h-full w-full p-4 shadow-none bg-[#1976d2] text-white rounded-none">
          <div className="mb-2 flex items-center gap-4 p-4">
            <Typography variant="h5">Customer Table</Typography>
          </div>
          <List className="text-white">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <Link to={item.to} onClick={closeSidebar}>
                  <ListItem
                    className={`border-b-0 p-3 ${
                      isActive(item.to) ? "bg-blue-600" : "text-white"
                    }`}
                  >
                    <ListItemPrefix>{iconComponents[item.icon]}</ListItemPrefix>{" "}
                    <Typography className="mr-auto font-normal text-white">
                      {item.label}
                    </Typography>
                    {(item.chip || item.chip === 0) && (
                      <ListItemSuffix>
                        <Chip
                          value={item.chip}
                          size="sm"
                          className="rounded-full text-black bg-white"
                        />
                      </ListItemSuffix>
                    )}
                  </ListItem>
                </Link>
                {item.divider && <hr className="my-2 border-blue-gray-50" />}
              </React.Fragment>
            ))}
            <ListItem onClick={handleLogout}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </div>
    </div>
  );
}
