import { Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import { ProfileProps, ProfileInfo, defaultProfileInfo } from "./Profile";
import ProfileAvatar from "./ProfileAvatar";
import ProfileMini from "./ProfileMini";

export default function ProfileFollowers({username}:ProfileProps){
    const [data,setData] = useState<ProfileInfo>(defaultProfileInfo);
    const [cookies,setCookies] = useCookies(['token']);
    
    useEffect( () => {
        fetchData('/profile/'+username+'/followers',cookies.token)
        .then( (response) =>{ 
            console.log("Followers: "+response.data.data);
            setData({...data,FOLLOWERS:response.data.data});
        })
        .catch( (error) => {
            console.log(error.response);
        });
    },[username]);

    return (<>
        <Card className='profile-follower'  sx={{height:'50%',overflow:'auto'}}>
            <CardContent>
            <Typography variant="h6" fontWeight="bold">Followers</Typography>
            {
                data.FOLLOWERS?.map( (item) => {
                    // return <p key={item.ID}><Link className='link' to={`/profile/${item.USERNAME}`}>{item.USERNAME}</Link></p>;
                    return <ProfileMini key={item.ID} username={item.USERNAME}></ProfileMini>
                })
            }
            </CardContent>
        </Card>
    </>);
}
