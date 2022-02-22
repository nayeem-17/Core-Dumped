import { ThumbUpAltOutlined, ThumbDownAltOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import ProfileAvatar from "../Profile/ProfileAvatar";
import { QuestionProps, defaultQuestionInfo, QuestionInfo } from "./Question";
import QuestionTags from "./QuestionTags";
// import './Question.css';
import QuestionVoteButtons from "./QuestionVoteButtons";

export default function QuestionThumbnail({id}:QuestionProps){
    const [data,setData] = useState<QuestionInfo>(defaultQuestionInfo);
    const [cookies,setCookies] = useCookies(['token','username']);

    useAxiosFetch((responseData: any) => {
        setData(responseData[0]);
    } ,'/question/'+id+'/thumbnail',cookies.token,[id]);
    return (
      <>
        <Card
          className="question-container"
          key={"question-thumbnail-" + id}
          sx={{ padding: "10px" , width:'100%'}}
        >
          <Box className="question">
            <QuestionTags id={id}/>
            <Box>
              <Typography
                variant="h4"
                sx={{
                    fontSize: "var(--dynamic-font-size)",
                    fontWeight: "bold",
                }}
                gutterBottom
              >
                <Link className="link question" to={`/question/${data.ID}`}>
                  {data.TITLE}
                </Link>
              </Typography>
              <div style={{ display: "block" }}>
                <ProfileAvatar username={data.CONTRIBUTED_BY} />
                <Typography variant="body2" fontSize=".7rem">
                  {"asked "}
                  {data.CREATED_AT}
                </Typography>
                <Typography variant="body2" fontSize=".7rem">
                  {"updated "}
                  {data.UPDATED_AT}
                </Typography>
              </div>
            </Box>
          </Box>
          <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <QuestionVoteButtons id={id} />
          <Typography variant="body2" fontSize="0.7rem">
            {data.VIEWS}
            {" views"}
          </Typography>
          </Box>
        </Card>
      </>
    );
}