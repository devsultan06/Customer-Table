import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { useCustomerContext } from "../../../../context/CustomerContext";

export function CardWithLink() {
  const { totalCustomer } = useCustomerContext();
  const cardData = [
    {
      id: 1,
      title: "Budget",
      value: "$24k",
      icon: <CurrencyDollarIcon className="h-6 w-6" />,
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Total Customers",
      value: totalCustomer ? totalCustomer : "",
      icon: <UserGroupIcon className="h-6 w-6" />,
      iconBg: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Task Progress",
      value: "75%",
      icon: <ListBulletIcon className="h-6 w-6" />,
      iconBg: "bg-orange-100 text-orange-600",
      progress: true,
    },
    {
      id: 4,
      title: "Total Profit",
      value: "$15k",
      icon: <DocumentIcon className="h-6 w-6" />,
      iconBg: "bg-blue-100 text-blue-600",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-0">
      {cardData.map((card) => (
        <Card key={card.id} className="shadow-md border rounded-[20px]">
          <CardBody className="flex flex-col gap-2">
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <Typography
                variant="small"
                color="gray"
                className="text-sm font-medium uppercase"
              >
                {card.title}
              </Typography>
              <div className={`${card.iconBg} p-2 rounded-full`}>
                {card.icon}
              </div>
            </div>

            {/* Main Stats */}
            <Typography variant="h3" color="blue-gray" className="font-bold">
              {card.value}
            </Typography>

            {/* Progress Bar (if applicable) */}
            {card.progress && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: card.value }}
                ></div>
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
