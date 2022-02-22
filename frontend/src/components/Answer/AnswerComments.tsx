import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import { AnswerProps, AnswerInfo, defaultAnswerInfo } from "./Answer";
import Comment, { addAnswerComment } from "../Comment/Comment";
import './Answer.css';
import useAxiosFetch from "../../utils/useAxiosFetch";
import { Box, Button, TextField } from "@mui/material";

export default function AnswerComments({id}:AnswerProps){
    const [cookies,setCookies] = useCookies(['token']);
    const [data,setData] = useState<AnswerInfo>(defaultAnswerInfo);
    const [commentContent,setCommentContent] = useState('');

    const fetchSetData = (responseData: any) => {
        setData({...data,COMMENTS:responseData});
    }
    useAxiosFetch(fetchSetData,'/comment/answer/'+id,cookies.token,[id]);
    return (
      <>
        <Box key={'answer-comments-'+id} sx={{ padding: "0px 50px 20px 50px" }}>
          {data.COMMENTS?.map((item) => {
                return <Comment key={'answer-comment-'+id} id={item.ID} commentOf={"answer"}></Comment>
            })
          }
          <input type='text' value={commentContent} onChange={(e)=>setCommentContent(e.target.value)} />
          <Button
            onClick={() =>
              addAnswerComment(id, commentContent, cookies.token)
            }
          >
            comment
          </Button>
        </Box>
      </>
    );
}
