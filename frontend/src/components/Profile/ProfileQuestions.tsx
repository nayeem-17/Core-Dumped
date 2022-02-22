import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import QuestionThumbnail from "../Question/QuestionThumbnail";
import { ProfileProps, ProfileInfo, defaultProfileInfo } from "./Profile";

export default function ProfileQuestions({username}:ProfileProps) {
    const [data,setData] = useState<ProfileInfo>(defaultProfileInfo);
    const [cookies,setCookies] = useCookies(['token','usename']);

    useEffect( () => {
        fetchData('/question/user/'+username,cookies.token)
        .then( (response) => {
            console.log('Profile Questions: '+response.data.data);

            setData({...data,QUESTIONS:response.data.data});
        })
        .catch( (error) => {
            console.log(error.response);
        })
    },[username]);

    return (
    <Card> 
        <CardContent>
            <Typography variant="h6" fontWeight={'bold'}>Questions</Typography>
            <Box sx={{overflow:'auto',maxHeight:'500px'}}>  
                {
                data.QUESTIONS?.map((question)=> {
                    return <QuestionThumbnail key={question.ID} id={question.ID}></QuestionThumbnail>
                })
                }
            </Box>
        </CardContent>
    </Card>);
}