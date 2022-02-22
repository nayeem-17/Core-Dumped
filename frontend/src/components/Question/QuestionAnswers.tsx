import { Add } from "@mui/icons-material";
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import { addAnswer } from "../Answer/Answer";
import AnswerComments from "../Answer/AnswerComments";
import  AnswerCompact from "../Answer/AnswerCompact";
import EditAnswer from "../Answer/EditAnswer";
import Editor from "../Editor/Editor";
import { QuestionProps, QuestionInfo, defaultQuestionInfo } from "./Question";
import './Question.css';

export default function QuestionAnswers({id}:QuestionProps){
    const [cookies,setCookies] = useCookies(['token']);
    const [showAnswerForm,setShowAnswerForm] = useState(false);
    const [data,setData] = useState<QuestionInfo>(defaultQuestionInfo);

    const fetchSetData = (responseData: any) => {
      setData({...data,ANSWERS:responseData});
    }
    useAxiosFetch(fetchSetData,'/answer/question/'+id,cookies.token,[id]);
    return (
      <>
        <IconButton onClick={()=>setShowAnswerForm(!showAnswerForm)}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  background: "brown",
                  padding: "10px",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                <Add></Add>
                <Typography variant="body1" fontWeight={"bold"}>
                  Add answer
                </Typography>
              </Box>
            </IconButton>
        <Dialog open={showAnswerForm} onClose={()=>setShowAnswerForm(false)}>
          <EditAnswer id={undefined} questionId={id}></EditAnswer>
        </Dialog>
        <div>
          {data.ANSWERS?.map((item) => {
            return (<><AnswerCompact key={'question-answer-'+item.ID} id={item.ID}/>
                    <AnswerComments key={'question-answer-comment-'+item.ID} id={item.ID} /> </>);
          })}
        </div>
      </>
    );
}