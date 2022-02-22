import { ThumbUpAltOutlined, ThumbDownAltOutlined, Delete, Edit } from "@mui/icons-material";
import { Card, CardContent, Dialog, IconButton, Typography } from "@mui/material";
import { Props, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import ProfileAvatar from "../Profile/ProfileAvatar";
import {
  AnswerInfo,
  AnswerProps,
  defaultAnswerInfo,
  downVote,
  removeAnswer,
  upVote,
} from "./Answer";
import "./Answer.css";
import "react-quill/dist/quill.snow.css";
import AnswerVoteButtons from "./AnswerVoteButtons";
import { Box } from "@mui/system";
import EditAnswer from "./EditAnswer";

export default function AnswerCompact({ id }: AnswerProps) {
  const [data, setData] = useState<AnswerInfo>(defaultAnswerInfo);
  const [showEditAnswer,setShowEditAnswer] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [cookies, setCookies] = useCookies(["token",'username']);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const addComment = () => {
    postData(
      "/comment/add",
      { comment: commentContent, typeId: id, commentOf: "answer" },
      cookies.token
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const fetchSetData = (responseData: any) => {
    setData(responseData[0]);
  };
  useAxiosFetch(fetchSetData, "/answer/" + id, cookies.token, [id]);

  return (
    <Card
      key={"answer-compact-" + id}
      className="answer"
      sx={{ marginBottom: "10px" }}
    > 
      <Dialog open={showEditAnswer} onClose={()=>setShowEditAnswer(false)}>
        <EditAnswer id={id} questionId={data.QUESTION_ID}></EditAnswer>
      </Dialog>
      {data.CONTRIBUTED_BY===cookies.username && (<>
        <IconButton onClick={() => removeAnswer(id,cookies.token) }>
          <Delete></Delete>
        </IconButton>
        <IconButton onClick={()=> setShowEditAnswer(true)}>
          <Edit></Edit>
        </IconButton>
        </>
      )}
      <div className="ql-container ql-snow" style={{ border: "none" }}>
        <div
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
          <Typography variant="body2" fontSize={'.8rem'}>
            {"updated at "} {data.UPDATED_AT}
          </Typography>
        </Box>
      </div>
    </Card>
  );
}
