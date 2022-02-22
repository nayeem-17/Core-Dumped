import { Chip, Avatar, Typography, Card, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import { ProfileInfo, ProfileProps } from "./Profile";
import ProfileFollowButton from "./ProfileFollowButton";

export default function ProfileMini({ username }: ProfileProps) {
  const [data, setData] = useState<ProfileInfo>();
  const [cookies, setCookies] = useCookies(["token", "username"]);
  const defaultStats = {
    REPUTATION: 0,
    QUESTION_COUNT: 0,
    ARTICLE_COUNT: 0,
    ANSWER_COUNT: 0,
  };
  const [stats,setStats] = useState(defaultStats);

  useAxiosFetch(
    (responseData: any) => {
      setData(responseData[0]);
    },
    "/profile/" + username,
    cookies.token,
    [username]);

  useAxiosFetch(
    (respData: any) => {
      setStats({ ...stats, ...respData[0] });
    },
    "/profile/" + username + "/stats",
    cookies.token,
    [username]);

  return (
    <Card
      sx={{
        marginBottom: "10px",
        display: "block",
        minWidth: "400px",
        width: "100%",
      }}
    >
      <Link
        className="link"
        style={{ color: "black" }}
        to={`/profile/${data?.USERNAME}`}
      >
        <Box display={"flex"} justifyContent="space-evenly" maxWidth={"300px"}>
          <Avatar src={data?.PROFILE_PICTURE}></Avatar>
          <Typography variant="body1" fontWeight={"bold"}>
            {data?.FIRST_NAME} {data?.LAST_NAME}
          </Typography>
        </Box>
      </Link>
      <Box>
      <Typography variant='body2' >
                {stats.REPUTATION} {' Reputation'} {', '}
                {stats.QUESTION_COUNT} {' Qeustions'} {', '}
                {stats.ANSWER_COUNT} {' Answers'} {', '}
                {stats.ARTICLE_COUNT} {' Articles'}
        </Typography>
      </Box>
      {data?.USERNAME!==cookies.username && <ProfileFollowButton username={username}></ProfileFollowButton> }
    </Card>
  );
}
