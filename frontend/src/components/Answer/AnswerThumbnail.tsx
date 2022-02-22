import { Box, Card, Dialog, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useAxiosFetch from "../../utils/useAxiosFetch";
import { AnswerInfo, AnswerProps, defaultAnswerInfo, removeAnswer } from "./Answer";
import './Answer.css';
import 'react-quill/dist/quill.snow.css';
import { Delete, Edit } from "@mui/icons-material";
import ProfileAvatar from "../Profile/ProfileAvatar";
import AnswerVoteButtons from "./AnswerVoteButtons";
import EditAnswer from "./EditAnswer";
import { useNavigate } from "react-router-dom";
function createMarkup(innerHtml: string) {
    return {__html: innerHtml};
}
export default function AnswerThumbnail ({id}:AnswerProps){
    const [cookies,setCookies] = useCookies(['token']);
    const [data,setData] = useState<AnswerInfo>(defaultAnswerInfo);
    const navigate = useNavigate();
    const fetchSetData = (responseData: any) => {
        setData(responseData[0]);
    } ;
    useAxiosFetch(fetchSetData,'/answer/'+id,cookies.token,[id]);
    
    return (
      <Card
        key={"answer-compact-" + id}
        className="answer"
        sx={{ marginBottom: "10px" }}
      >
        <div className="ql-container ql-snow" style={{ border: "none"}} onClick={()=> {navigate('/question/'+data.QUESTION_ID)}} >
          <div
            style={{WebkitLineClamp:'2',overflow:'hidden'}}
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: data.ANSWER }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AnswerVoteButtons id={id} />
          <Box>
            <ProfileAvatar username={data.CONTRIBUTED_BY} />
            <Typography variant="body2" fontSize=".8rem">
              {"answered "} {data.CREATED_AT}
            </Typography>
            <Typography variant="body2" fontSize={".8rem"}>
              {"updated at "} {data.UPDATED_AT}
            </Typography>
          </Box>
        </div>
      </Card>
    );
}