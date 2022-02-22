import { ThumbUpAltOutlined, ThumbDownAltOutlined, Delete, Edit } from "@mui/icons-material";
import { Card, CardContent, Dialog, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import ProfileAvatar from "../Profile/ProfileAvatar";

import { ArticleProps, downVote, upVote } from "./Article";
import { defaultArticleInfo } from "./Article";
// import './Article.css';
import 'react-quill/dist/quill.snow.css';
import ArticleTags from "./ArticleTags";
import ArticleVoteButtons from "./ArticleVoteButtons";
import EditArticle from "./EditArticle";
import deleteData from "../../utils/deleteData";

export default function ArticleCompact({id}:ArticleProps){
    const [data,setData] = useState(defaultArticleInfo);
    const [cookies,setCookies] = useCookies(['token','username']);
    const [showEditArticle,setShowEditArticle] = useState(false);
    const navigate = useNavigate();

    const deleteArticle = () => {
      deleteData('/article/'+id+'/remove',cookies.token)
      .then(response=>{
        if( response.data.success )
          navigate('/article');
      })
      .catch(error=> {
        console.log(error.response.data.message);
      })
    }

    const fetchSetData = (responseData: any) => {
      setData(responseData[0]);
    }
    useAxiosFetch(fetchSetData,'/article/'+id,cookies.token,[id]);

    return (
      <Card key={"article-compact-" + id}>
        {data.CONTRIBUTED_BY === cookies.username && (
          <>
            <IconButton onClick={() => setShowEditArticle(!showEditArticle)}>
              <Edit />
            </IconButton>
            <IconButton onClick={()=>deleteArticle()}>
              <Delete></Delete>
            </IconButton>
          </>
        )}
        <Dialog
          open={showEditArticle}
          onClose={() => setShowEditArticle(false)}
        >
          <EditArticle id={id} />
        </Dialog>
        <ArticleTags id={id}></ArticleTags>
        <CardContent key={"article-compact-" + id}>
          <Link className="link article" to={`/article/${data.ID}`}>
            <Typography
              sx={{ textAlign: "center", margin: "auto" }}
              variant="h4"
              fontWeight="bold"
            >
              {data.TITLE}
            </Typography>
          </Link>
          <Typography variant="body2" fontSize="0.8rem">
            {"by "}
            <ProfileAvatar username={data.CONTRIBUTED_BY}></ProfileAvatar>
            {" posted " + data.CREATED_AT}
            {", updated " + data.UPDATED_AT}
          </Typography>

          <div className="ql-container ql-snow" style={{ border: "none" }}>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: data.CONTENT }}
            ></div>
          </div>
        </CardContent>
        <Typography
          sx={{ textAlign: "right" }}
          variant="body2"
          fontSize={"0.8rem"}
        >
          {data.VIEWS}
          {" views"}
        </Typography>
        <ArticleVoteButtons id={id} />
      </Card>
    );    
}
