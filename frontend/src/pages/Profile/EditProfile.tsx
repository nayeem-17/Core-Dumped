import {
  CardContent,
  Card,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { LeftPanel } from "../../components/LeftSideBar/LeftSideBar";
import Navbar from "../../components/Navbar/Navbar";
import DeleteProfile from "../../components/Profile/DeleteProfile";
import EditProfileInfo from "../../components/Profile/EditProfileInfo";
import EditProfilePassword from "../../components/Profile/EditProfilePassword";
import EditProfilePicture from "../../components/Profile/EditProfilePicture";
import EditProfileInterests from '../../components/Profile/EditProfileInterests';

export default function EditProfile() {
  const [cookies, setCookies] = useCookies(["token", "username"]);
  const [tabValue,setTabValue] = useState('profileInfo');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <Paper className="container-center">
          <CardContent>
            {tabValue === 'profilePicture' && (<EditProfilePicture username={cookies.username}></EditProfilePicture>) }
            {tabValue === 'profileInfo' && (<EditProfileInfo username={cookies.username}></EditProfileInfo>) }
            {tabValue === 'profileInterests' && (<EditProfileInterests username={cookies.username}/>)}
            {tabValue === 'changePassword' && (<EditProfilePassword username={cookies.username}></EditProfilePassword>)}
            {tabValue === 'deleteProfile' && (<DeleteProfile username={cookies.username}></DeleteProfile>) }

          </CardContent>
        </Paper>
        <div className="container-left">
          <LeftPanel id={3}/>
        </div>
        <Card className="container-right">
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={handleChange}
          >
            <Tab value="profileInfo" label="Info" />
            <Tab value="profilePicture" label="Profile Picture" />
            <Tab value="profileInterests" label="Interests" />
            <Tab value="changePassword" label="Change Password" />
            <Tab value="deleteProfile" label="Delete Profile" />
          </Tabs>
        </Card>
      </div>
    </>
  );
}
