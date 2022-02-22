import { Email } from "@mui/icons-material";
import {
  Card,
  Avatar,
  Stack,
  Typography,
  Button,
  styled,
  CardContent,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import { MessageSendButton } from "../Message/Message";
import { ProfileInfo, ProfileProps } from "./Profile";
import ProfileFollowButton from "./ProfileFollowButton";

export default function ProfileCard({ username }: ProfileProps) {
  const [data, setData] = useState<ProfileInfo>();
  const [cookies, setCookis] = useCookies(["token", "username"]);

  const handleFollow = () => {
    postData("/profile/follow/" + username, data, cookies.token)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    fetchData("/profile/" + username, cookies.token)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [username]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: "10px",
          width: "90%",
        }}
      >
        <Avatar
          sx={{ display: "block", width: "196px", height: "196px" }}
          src={data?.PROFILE_PICTURE}
        ></Avatar>
        <Stack spacing={1}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bolder",
            }}
          >
            {" "}
            {data?.FIRST_NAME} {data?.LAST_NAME}{" "}
            <Typography variant="body2">
              {" "}
              [
              <Link className="link" to={`/profile/${data?.USERNAME}`}>
                {data?.USERNAME}
              </Link>
              ]{" "}
            </Typography>
          </Typography>
          <Typography variant="body2"> {data?.TITLE} </Typography>
          <Typography variant="body2">
            {" "}
            Joined {data?.CREATED_AT}, Last Active {data?.LAST_ACTIVE}
          </Typography>
          <Typography variant="body2">
            <Email></Email>
            {data?.EMAIL}{" "}
          </Typography>

          {(username!==cookies.username) && (<><ProfileFollowButton username={username} />
                                              <MessageSendButton receiverId={data?.ID}></MessageSendButton>
                                              </>)}
        </Stack>
      </CardContent>
      <Typography variant="body1" sx={{ fontWeight: "130" }}>
        {" "}
        {data?.DESCRIPTION}
      </Typography>
    </Card>
  );
}
