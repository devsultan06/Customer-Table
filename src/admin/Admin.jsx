import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { ComplexNavbar } from "./components/Navbar";
const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  return (
    <div className="admin flex">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
      />
      <div className="content w-full flex-1 ml-[300px]">
        <ComplexNavbar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
        />
      </div>
    </div>
  );
};

export default Admin;
