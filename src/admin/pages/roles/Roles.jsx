import React from "react";
import { Card, CardBody, Select, Option, Button } from "@material-tailwind/react";

const Roles = () => {
  const users = [
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "SuperAdmin" },
    { id: 3, name: "Michael Brown", role: "User" },
    { id: 4, name: "Lisa Taylor", role: "Editor" },
  ];

  const roles = ["SuperAdmin", "Admin", "Editor", "User"];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-blue-gray-800 mb-6 text-center">
        User Roles Management
      </h1>

      <Card className="w-full max-w-4xl overflow-hidden">
        <CardBody>
          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-blue-gray-200">
              <thead>
                <tr className="bg-blue-gray-50">
                  <th className="p-4 text-left border-b border-blue-gray-200">
                    User Name
                  </th>
                  <th className="p-4 text-center border-b border-blue-gray-200">
                    Current Role
                  </th>
                  <th className="p-4 text-center border-b border-blue-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-gray-50">
                    <td className="p-4 border-b border-blue-gray-200">
                      {user.name}
                    </td>
                    <td className="p-4 text-center border-b border-blue-gray-200">
                      <Select
                        value={user.role}
                        className="w-full"
                        variant="outlined"
                      >
                        {roles.map((role, index) => (
                          <Option key={index} value={role}>
                            {role}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td className="p-4 text-center border-b border-blue-gray-200">
                      <Button size="sm" color="blue" ripple={true}>
                        Update Role
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-6">
            <Button color="green" ripple={true}>
              Save All Changes
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Roles;
