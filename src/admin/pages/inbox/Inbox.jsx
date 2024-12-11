import React from "react";
import { useCustomerContext } from "../../contexts/CustomerContext";

const Inbox = () => {
  const { newCustomer} = useCustomerContext(); // Get the new customers from context
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inbox</h2>
      <ul>
        {/* {newCustomer.map((customer) => (
          <li key={customer.id} className="border-b p-2">
            <p>
              <strong>Name:</strong> {customer.name}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Inbox;
