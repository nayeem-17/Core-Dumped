import { ThumbUpAltOutlined, ThumbDownAltOutlined, ThumbDownAltRounded, ThumbUpOffAltRounded } from "@mui/icons-material";
import { Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import { ArticleProps } from "./Article";

interface ArticleVoteInfo {
  USER_VOTE: string;
  UPVOTES: number;
  DOWNVOTES: number;
}
const defaultVoteInfo: ArticleVoteInfo = {
  USER_VOTE: "EMPTY",
  UPVOTES: 0,
  DOWNVOTES: 0,
};

export default function ArticleVoteButtons({ id }: ArticleProps) {
  const [cookies, setCookies] = useCookies(["token", "username"]);
  const [data, setData] = useState<ArticleVoteInfo>();

  const upVote = () => {
    postData("/article/" + id + "/upvote", {}, cookies.token)
      .then((response) => {
        fetchData('/article/'+id+'/voteinfo',cookies.token)
        .then( response => {
          setData(response.data.data[0]);
        })
        .catch(error=> {

        });
      })
      .catch((error) => {});
  };

  const downVote = () => {
    postData("/article/" + id + "/downvote", {}, cookies.token)
      .then((response) => {
        fetchData('/article/'+id+'/voteinfo',cookies.token)
        .then( response => {
          setData(response.data.data[0]);
        })
        .catch(error=> {

        });
      })
      .catch((error) => {});
  };

  useAxiosFetch(
    (responseData: any) => {
    //   console.log("/article/voteinfo");
      console.log(responseData);
      setData(responseData[0]);
    },
    "/article/" + id + "/voteinfo",
    cookies.token,
    [id]
  );
  return (
    <>
      <div className="article-vote-buttons">
        <IconButton onClick={() => upVote()}>
          <Typography variant="body2">{data?.UPVOTES}</Typography>
          {data?.USER_VOTE === "Y" ? (
            <ThumbUpOffAltRounded />
          ) : (
            <ThumbUpAltOutlined />
          )}
        </IconButton>
        <IconButton onClick={() => downVote()}>
          <Typography variant="body2">{data?.DOWNVOTES}</Typography>
          {data?.USER_VOTE === "N" ? (
            <ThumbDownAltRounded />
          ) : (
            <ThumbDownAltOutlined />
          )}
        </IconButton>
      </div>
    </>
  );
}
