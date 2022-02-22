import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {IDs} from "../../pages/Feed/Feed";
import fetchData from "../../utils/fetchData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import ArticleThumbnail from "../Article/ArticleThumbnail";
import { TagProps, TagInfo, defaultTagInfo } from "./Tag";

export default function TaggedArticles({id}:TagProps) {
    const [cookies,setCookies] = useCookies(['token']);
    const [data,setData] = useState<IDs[]>([]);

    useAxiosFetch((responseData:any) => {
        setData(responseData) ;
    },'/tag/'+id+'/articles',cookies.token,[id]);

    return (
      <Card key={'articles-tagged-'+id} variant="outlined">
        <Box sx={{maxHeight:'600px',overflow:'auto'}}>
        {
            data.map((ques)=> {
                return <ArticleThumbnail id={ques.ID}/>;
            })
        }
        </Box>
      </Card>
    );    
}