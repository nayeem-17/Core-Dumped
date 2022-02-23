import { Card, CardContent, Divider, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import { TagProps, TagInfo, defaultTagInfo } from "./Tag";

export default function TagCompact({id}:TagProps) {
    const [cookies,setCookies] = useCookies(['token']);
    const [data,setData] = useState<TagInfo>(defaultTagInfo);

    useEffect( ()=>{
        fetchData('/tag/'+id,cookies.token)
        .then( (response) => {
            console.log( response.data.data) ;
            setData(response.data.data[0]);
        })
        .catch( (error) => {
            console.log(error.reponse) ;

        })
    },[id]);

    return (
      <Card variant="outlined" sx={{width:'100%'}}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" component="div">
            <Link className="link" style={{color:'black'}} to={"/tag/"+id}>{data.TITLE}</Link>
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data.SYNONYMS}
          </Typography>
          <Typography variant="body2">
            {data.DESCRIPTION}
          </Typography>
          <Divider sx={{marginTop:'20px'}}></Divider>
          <Typography variant="body1">
            {data.QUESTION_COUNT}{" questions"}{"  "}{data.ARTICLE_COUNT}{" articles"}
          </Typography>
        </CardContent>
      </Card>
    );    
}