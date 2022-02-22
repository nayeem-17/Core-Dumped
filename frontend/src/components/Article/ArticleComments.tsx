import { Box, Button, Card, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import { ArticleProps, defaultArticleInfo } from "./Article";
import Comment, { addArticleComment } from "../Comment/Comment";
import './Article.css' ;
import useAxiosFetch from "../../utils/useAxiosFetch";

export default function ArticleComments({id}:ArticleProps){
    const [data,setData] = useState(defaultArticleInfo);
    const [cookies,setCookies] = useCookies(['token']);
    const [commentContent,setCommentContent] = useState('');
    const [showCommentInput,setShowCommentInput] = useState(false);

    const fetchSetData = (responseData: any) => {
        setData({...data,COMMENTS:responseData});
    }
    useAxiosFetch(fetchSetData,'/comment/article/'+id,cookies.token,[id]);
    return (
      <Box key={'article-comments-'+id} sx={{ padding: "20px 50px 20px 50px" }}>
        {data.COMMENTS?.map((item) => {
          return <Comment key={'article-comment'+item.ID} id={item.ID} commentOf={"article"}></Comment>;
        })}
        <TextField
          sx={{ width: "80%", height: "50px" }}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        ></TextField>
        <Button
          onClick={() => addArticleComment(id, commentContent, cookies.token)}
        >
          comment
        </Button>
      </Box>
    );
}