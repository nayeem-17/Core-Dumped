import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import ArticleThumbnail from "../Article/ArticleThumbnail";
import { ProfileProps, ProfileInfo, defaultProfileInfo } from "./Profile";


export default function ProfileArticles({username}:ProfileProps) {
    const [data,setData] = useState<ProfileInfo>(defaultProfileInfo);
    const [cookies,setCookies] = useCookies(['token','usename']);

    useEffect( () => {
        fetchData('/article/user/'+username,cookies.token)
        .then( (response) => {
            console.log('Profile Articles: '+response.data.data);

            setData({...data,ARTICLES:response.data.data});
        })
        .catch( (error) => {
            console.log(error.response);
        })
    },[username]);

    return (
    <Card> 
        <CardContent>
            <Typography variant="h6" fontWeight={'bold'}>Articles</Typography>
            <Box sx={{overflow:'auto',maxHeight:'500px'}}>  
                {
                data.ARTICLES?.map((article)=> {
                    return <ArticleThumbnail key={article.ID} id={article.ID}></ArticleThumbnail>
                })
                }
            </Box>
        </CardContent>
    </Card>);
}
