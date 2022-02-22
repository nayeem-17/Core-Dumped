import { Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import { ProfileProps, ProfileInfo, defaultProfileInfo } from "./Profile";

export default function ProfileStats({username}:ProfileProps) {
    const defaultStats = {
        REPUTATION: 0,
        QUESTION_COUNT: 0,
        ARTICLE_COUNT: 0,
        ANSWER_COUNT: 0,
    }
    const [data,setData] = useState(defaultStats);
    const [cookies,setCookies] = useCookies(['token'])
    
    useAxiosFetch((respData:any)=> {
        setData({...data,...respData[0]});
    },'/profile/'+username+'/stats',cookies.token,[username]);
    
    return (<>
    <Card className='profile-stats'>
        <CardContent >
            <Typography variant="h5" fontWeight={'bold'}>Stats</Typography>
            <Typography variant='body2' >
                {data.REPUTATION} {' Reputation'} {', '}
                {data.QUESTION_COUNT} {' Qeustions'} {', '}
                {data.ANSWER_COUNT} {' Answers'} {', '}
                {data.ARTICLE_COUNT} {' Articles'}
            </Typography>
        </CardContent>
    </Card>
    </>);
} 
