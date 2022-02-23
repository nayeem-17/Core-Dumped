import { Add } from "@mui/icons-material";
import { Card, CardContent, Typography, Box, IconButton, TextField, List, ListItem } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import useAxiosPost from "../../utils/useAxiosPost";
import TagThumbnail from "../Tag/TagThumbnail";
import { ProfileProps, ProfileInfo, defaultProfileInfo } from "./Profile";

export default function ProfileInterests({username}:ProfileProps) {
    const [data,setData] = useState<ProfileInfo>(defaultProfileInfo);
    const [cookies,setCookies] = useCookies(['token','username']);



    const setInterests = (responseData:any) =>{
        setData({...data,INTERESTS:responseData});
    }

    useAxiosFetch(setInterests,'/tag/user/'+username,cookies.token,[username]) ;
    return  (<>
    <Card>
        <CardContent >
            <Typography variant="h5" sx={{fontWeight:'bold'}}>Interests</Typography>
            <Box>
                {
                data.INTERESTS?.map((tag) => {
                    return <TagThumbnail key={tag.ID} id={tag.ID}/>;
                })
                }
            </Box>
        </CardContent>
    </Card>
    </>);
}
