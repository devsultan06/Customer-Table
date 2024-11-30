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
      {/* Content Area */}
      <div className={`content flex-1 ${isOpen ? "ml-[300px]" : "ml-0"}`}>
        <ComplexNavbar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
        />

        {/* Full-width line */}
        <hr className="my-2 border-blue-gray-200 w-full" />
      </div>
    </div>
  );
};

export default Admin;
