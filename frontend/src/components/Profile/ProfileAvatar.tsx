import { Chip, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import { ProfileProps, ProfileInfo } from "./Profile";

export default function ProfileAvatar({username}:ProfileProps){
    const [data,setData] = useState<ProfileInfo>();
    const [cookies,setCookies] = useCookies(['token','username']);
    
    useAxiosFetch((responseData: any) => {
        setData(responseData[0]);
    },'/profile/'+username+'/avatar',cookies.token,[username]);
    return <>
        <Link className='link' to={`/profile/${data?.USERNAME}`}>
        <Chip size="small" avatar={<Avatar src={data?.PROFILE_PICTURE} ></Avatar>}  label={data?.FIRST_NAME+' '+data?.LAST_NAME} clickable/>
        </Link>
    </>
}
