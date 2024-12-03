import React from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Switch,
} from "@material-tailwind/react";

const Settings = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-blue-gray-800 mb-6">Settings</h1>

      {/* Profile Settings */}
      <Card className="w-full max-w-lg mb-6">
        <CardBody>
          <h2 className="text-lg font-semibold text-blue-gray-800 mb-4">
            Profile
          </h2>
          <div className="mb-4">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              className="w-full"
            />
          </div>
          <Button color="blue" fullWidth>
            Save Changes
          </Button>
        </CardBody>
      </Card>

      {/* Notification Settings */}
      <Card className="w-full max-w-lg mb-6">
        <CardBody>
          <h2 className="text-lg font-semibold text-blue-gray-800 mb-4">
            Notifications
          </h2>
          <div className="flex items-center justify-between mb-4">
            <span>Email Notifications</span>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <Switch id="push-notifications" />
          </div>
        </CardBody>
      </Card>

      {/* Privacy Settings */}
      <Card className="w-full max-w-lg">
        <CardBody>
          <h2 className="text-lg font-semibold text-blue-gray-800 mb-4">
            Privacy
          </h2>
          <Button color="red" fullWidth>
            Delete Account
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Settings;
