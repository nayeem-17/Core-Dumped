import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import { QuestionProps, QuestionInfo, defaultQuestionInfo } from "./Question";
import Comment, { addQuestionComment } from "../Comment/Comment";
import './Question.css';
import useAxiosFetch from "../../utils/useAxiosFetch";
import { Box, Button, TextField } from "@mui/material";

export default function QuestionComments({id}:QuestionProps){
    const [cookies,setCookies] = useCookies(['token']);
    const [data,setData] = useState<QuestionInfo>(defaultQuestionInfo);
    const [commentContent,setCommentContent] = useState('');
    const [showCommentInput,setShowCommentInput] = useState(false);

    const refreshData = () => {
      fetchData('/comment/question/'+id,cookies.token)
      .then(response=> {
        setData({...data,COMMENTS:response.data.data});
      })
      .catch( error=> {
        console.log(error.response.data.message);
      });
    }
    const fetchSetData = (responseData: any) => {
        setData({...data,COMMENTS:responseData});
    }
    useAxiosFetch(fetchSetData,'/comment/question/'+id,cookies.token,[id]);
    return (
      <>
        <Box sx={{ padding: "20px 50px 20px 50px" }}>
          {data.COMMENTS?.map((item) => {
                return <Comment key={'question-comment-'+id} id={item.ID} commentOf={"question"}></Comment>
            })
          }
          
          <input type="text" value={commentContent} onChange={(e)=>setCommentContent(e.target.value)}></input>
          <Button
            onClick={() =>{
              addQuestionComment(id, commentContent, cookies.token);
              
              }
            }
          >
            comment
          </Button>
        </Box>
      </>
    );
}
