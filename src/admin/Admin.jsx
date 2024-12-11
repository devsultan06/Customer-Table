import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { ComplexNavbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";

import { CustomerProvider } from "./contexts/CustomerContext";
const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  return (
    <CustomerProvider>
      <div className="admin flex overflow-x-auto">
        <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
        />
        {/* Content Area */}
        <div className="flex-1 ">
          <ComplexNavbar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            closeSidebar={closeSidebar}
          />

          {/* Full-width line */}
          <hr className="my-2 border-blue-gray-200 w-full mt-[55px] fixed" />
          <div className="content ml-[0px] mt-[100px] md:ml-[300px] px-[20px] w-[auto]">
            <Outlet />{" "}
          </div>
        </div>
      </div>
    </CustomerProvider>
  );
};

export default Admin;
