import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import fetchData from '../../utils/fetchData';
import AnswerThumbnail from "../Answer/AnswerThumbnail";
import { ProfileProps, ProfileInfo, defaultProfileInfo } from "./Profile";

export default function ProfileAnswers({username}:ProfileProps) {
    const [data,setData] = useState<ProfileInfo>(defaultProfileInfo);
    const [cookies,setCookies] = useCookies(['token','usename']);

    useEffect( () => {
        fetchData('/answer/user/'+username,cookies.token)
        .then( (response) => {
            console.log('Profile Answers: '+response.data.data);

            setData({...data,ANSWERS:response.data.data});
        })
        .catch( (error) => {
            console.log(error.response);
        })
    },[username]);

    return (
    <Card> 
        <CardContent>
            <Typography variant="h6" fontWeight="bold">Answers</Typography>
            <Box sx={{overflow:'auto',maxHeight:'400px'}}>  
                {
                data.ANSWERS?.map((answer)=> {
                    return <AnswerThumbnail key={answer.ID} id={answer.ID} /> 
                })
                }
            </Box>
        </CardContent>
    </Card>);
}
