import { Delete } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import deleteData from '../../utils/deleteData';
import fetchData from '../../utils/fetchData';
import postData from '../../utils/postData';
import useAxiosFetch from '../../utils/useAxiosFetch';
import ProfileAvatar from '../Profile/ProfileAvatar';
// import './Comment.css';
const server_url = process.env.REACT_APP_SERVER_URL+'';
export interface CommentProps{
    id : number ;
    commentOf: string; 
}
const defaultCommentInfo: CommentInfo = {
    ID: 0,
    TEXT: 'MY FIRST COMMENT',
    CONTRIBUTED_BY: ''
};
export interface CommentInfo {
    ID: number,
    TEXT: string,
    CONTRIBUTED_BY: string,
    CREATED_AT?: string,
    UPDATED_AT?: string
}

export const addQuestionComment = (questionId: number, commentContent: string, token: string) =>{
    postData('/comment/add',{comment:commentContent,typeId:questionId,commentOf:'question'},token)
    .then( (response) => {
        console.log(response);
        window.location.reload();
    })
    .catch( (error) => {
        console.log(error.response);
    });
}

export const addArticleComment = (articleId: number, commentContent: string, token:string) => {
  postData('/comment/add',{comment:commentContent,typeId:articleId,commentOf:'article'},token)
    .then( (response) => {
        console.log(response);
        window.location.reload();
    })
    .catch( (error) => {
        console.log(error.response);
    });
}

export const addAnswerComment = (answerId: number, commentContent: string, token:string)=>{
  postData('/comment/add',{comment:commentContent,typeId:answerId,commentOf:'answer'}, token)
  .then( response=>{
    console.log(response);
    window.location.reload();
  })
  .catch(error=> {
    console.log(error.response.data.message);
  })
}

export const deleteComment = (commentId: number, token:string) => {
  deleteData('/comment/delete/'+commentId,token)
  .then( (response ) => {
    window.location.reload();
  })
  .catch(error=> {
    console.log(error.response.data.message);
  })
}

export default function Comment({id,commentOf}:CommentProps){
    const [cookies,setCookies] = useCookies(['token','username']);
    const [data,setData] = useState<CommentInfo>(defaultCommentInfo);

    const fetchSetCommentData = (responseData: any)=>{
        setData(responseData[0]);
    }
    useAxiosFetch(fetchSetCommentData,'/comment/'+id,cookies.token,[id]);

    return (
      <>
        <Divider light />
        <Box
          className="comment"
          sx={{
            display: "flex",
            justifySelf: "center",
            justifyItems: "center",
            alignItems: "center",
            padding: "5px",
          }}
        >
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            {data.TEXT} {"----"}
          </Typography>
          <Link className="link" to={`/profile/${data.CONTRIBUTED_BY}`}>
            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
              [{data.CONTRIBUTED_BY}]{" "}
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            {"," + data?.CREATED_AT}
          </Typography>
          {data.CONTRIBUTED_BY === cookies.username && (
            <IconButton onClick={() => deleteComment(id, cookies.token)}>
              <Delete sx={{fontSize:'1rem'}}></Delete>
            </IconButton>
          )}
        </Box>
        <Divider light />
      </>
    );
}

