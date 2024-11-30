import React, { useState } from "react";
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
import MenuIcon from "@mui/icons-material/Menu";

export function Sidebar({ isOpen, toggleSidebar, closeSidebar }) {
  return (
    <div>
      {/* Mobile Toggle Bar */}
      {/* Sidebar */}
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
            <ListItem className="border-b-0 p-3 text-white">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-white">
                Dashboard
              </Typography>
            </ListItem>
            <ListItem className=" border-b-0 p-3 text-white">
              <ListItemPrefix>
                <PeopleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-white">
                Customers
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <AdminPanelSettingsIcon className="h-5 w-5" />
              </ListItemPrefix>
              Roles & Permissions
            </ListItem>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  className="rounded-full text-black bg-white"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
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
