import { ThumbUpAltOutlined, ThumbDownAltOutlined, ThumbUpOffAltRounded, ThumbDownOffAltRounded, ThumbDownAltRounded } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import useAxiosPost from "../../utils/useAxiosPost";
import { QuestionProps } from "./Question";

interface QuestionVoteInfo {
  USER_VOTE: string,
  UPVOTES: number,
  DOWNVOTES: number
}
const defaultVoteInfo :QuestionVoteInfo = {
  USER_VOTE: 'EMPTY',
  UPVOTES: 0,
  DOWNVOTES: 0
}



export default function QuestionVoteButtons({id}:QuestionProps) {
    const [cookies,setCookies] = useCookies(['token','username']);
    const [data,setData] = useState<QuestionVoteInfo>();


    const upVote = () => {
      postData('/question/'+id+'/upvote',{},cookies.token)
      .then(response=> {
        fetchData('/question/'+id+'/voteinfo',cookies.token)
        .then( response => {
          setData(response.data.data[0]);
        })
        .catch( error => {

        });
      }).
      catch(error=> {

      });
    }

    const downVote = () => {
      postData('/question/'+id+'/downvote',{},cookies.token)
      .then(response=> {
        fetchData('/question/'+id+'/voteinfo',cookies.token)
        .then( response => {
          setData(response.data.data[0]);
        })
        .catch( error => {

        });
      }).
      catch(error=> {

      });
    }


    useAxiosFetch((responseData: any) => {
      console.log('/question/voteinfo');
      console.log(responseData);
      setData(responseData[0]);
    },'/question/'+id+'/voteinfo',cookies.token,[id]);
    return (
      <>
        <div className="question-vote-buttons">
          <IconButton onClick={() => upVote()}>
            <Typography variant="body2">{data?.UPVOTES}</Typography>
            {(data?.USER_VOTE === 'Y') ? (<ThumbUpOffAltRounded/>) : (<ThumbUpAltOutlined />) }
          </IconButton>
          <IconButton onClick={() => downVote()}>
            <Typography variant="body2">{data?.DOWNVOTES}</Typography>
            {(data?.USER_VOTE === 'N') ? (<ThumbDownAltRounded/>) : (<ThumbDownAltOutlined />) }
          </IconButton>
        </div>
      </>
    );
}