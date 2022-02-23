import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import ProfileAvatar from "../Profile/ProfileAvatar";
import { ArticleProps, defaultArticleInfo } from "./Article";
import ArticleTags from "./ArticleTags";
// import './Article.css';
import ArticleVoteButtons from "./ArticleVoteButtons";

export default function ArticleThumbnail({id}:ArticleProps){
    const [data,setData] = useState(defaultArticleInfo);
    const [cookies,setCookies] = useCookies(['token']);

    useAxiosFetch((responseData:any)=> {
      setData(responseData[0]);
    },'/article/'+id+'/thumbnail',cookies.token,[id]);
    return (
      <Card
        className="article-container"
        key={"article-thumbnail-" + id}
        sx={{ padding: "10px",maxWidth:'100%'}}
      >
        <ArticleTags id={id}/>
        <Box key={"article-thumbnail-" + id}>
          <Typography
            sx={{ textAlign: "center", margin: "auto" }}
            variant="h6"
            fontWeight="bold"
          >
            <Link className="link article" to={`/article/${data.ID}`}>
              {data.TITLE}
            </Link>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ProfileAvatar username={data.CONTRIBUTED_BY}></ProfileAvatar>
            <Typography variant="body2" fontSize="0.8rem">
              {"posted " + data.CREATED_AT}
            </Typography>
            <Typography variant="body2" fontSize="0.8rem">
              {"updated " + data.UPDATED_AT}
            </Typography>
          </Box>
        </Box>

        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <ArticleVoteButtons id={id} />
          <Typography variant="body2" fontSize={".7rem"}>
            {data.VIEWS}
            {" views"}
          </Typography>
        </Box>
      </Card>
    );
}
