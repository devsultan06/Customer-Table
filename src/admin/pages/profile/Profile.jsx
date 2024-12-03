import { Avatar, Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "Sofia",
    lastName: "Rivers",
    email: "sofia@devias.io",
    phoneNumber: "",
    state: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Saved profile details:", profile);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Profile Content */}
      <div className="flex-1">
        <div className="flex flex-col items-center mb-6 md:mb-12">
          <Avatar
            src="https://via.placeholder.com/150"
            alt="User profile"
            size="lg"
            className="mb-4"
          />
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="body2" color="gray" className="mb-2">
            Los Angeles, USA | GTM-7
          </Typography>
        </div>

        <Card className="shadow-lg p-6">
          <div className="mb-4">
            <Typography variant="h6" className="font-semibold">
              Profile
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              The information can be edited
            </Typography>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <TextField
                label="First Name"
                variant="outlined"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                fullWidth
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <TextField
                label="Email Address"
                variant="outlined"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <TextField
                label="State"
                variant="outlined"
                name="state"
                value={profile.state}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="City" 
                variant="outlined"
                name="city"
                value={profile.city}
                onChange={handleInputChange}
                fullWidth
              />
            </div>

            <div className="flex justify-end">
              <Button variant="outlined" color="blue" type="submit">
                Save Details
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
