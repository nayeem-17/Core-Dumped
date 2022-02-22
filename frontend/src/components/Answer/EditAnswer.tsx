import { Add, Cancel } from "@mui/icons-material";
import { Box, Button, Card, CardContent, IconButton, List, ListItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import React,{ useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import putData from "../../utils/putData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import useAxiosPost from "../../utils/useAxiosPost";
import { formats, toolbar } from "../Editor/Editor";
import TagThumbnail from "../Tag/TagThumbnail";
import { defaultAnswerInfo, AnswerInfo } from "./Answer";

interface EditProps {
  id: number | undefined;
  questionId: number;
};

// undefined for creating a answer, otherwise edit 
export default function EditAnswer({ id = undefined, questionId }: EditProps) {
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [answerContent,setAnswerContent] = useState('');

  const saveAnswer = () => {
    if( id === undefined ){
      postData('/answer/add',{answer: answerContent, questionId: questionId},cookies.token)
      .then(response=> {
        console.log(response.data);
        window.location.reload();
      })
      .catch(error=> {
        console.log(error.response.data.message);
      })
    }
    else {
      putData('/answer/'+id+'/edit',{answer: answerContent, questionId: questionId}, cookies.token)
        .then(response=> {
          console.log(response.data);
          window.location.reload();
        })
        .catch(error=> {
          console.log(error.response.data.message);
        });
    }
  }

  useEffect(() => {
    if (id === undefined) {
      return function () {
        unmounted = true;
        source.cancel("Cancelling in cleanup");
      };
    }

    let unmounted = false;
    let source = axios.CancelToken.source();
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL + "",
      headers: { authorization: "Bearer " + cookies.token },
      timeout: 1000,
      cancelToken: source.token,
    });

    axiosInstance
      .get("/answer/" + id)
      .then((response) => {
        if (!unmounted) {
          console.log(response.data.data);
          setAnswerContent(response.data.data[0].ANSWER);
        }
      })
      .catch(function (e) {
        if (!unmounted) {
          if (axios.isCancel(e)) {
            console.log(`request cancelled:${e.message}`);
          } else {
            console.log("another error happened:" + e.message);
          }
        }
      });

      return function () {
        unmounted = true;
        source.cancel("Cancelling in cleanup");
      };
  }, [id]);
  return (
    <Card className="editor" sx={{ padding: "20px",maxHeight:'800px',overflow:'auto'}}>
      <ReactQuill
        modules={{
          toolbar: {
            container: toolbar,
          },
        }}
        formats={formats}
        theme="snow"
        value={answerContent}
        onChange={setAnswerContent}
      ></ReactQuill>
      {/* <Button onClick={() => postNewPost()}>Post</Button> */}
      <Button onClick={() => console.log({answer: answerContent})}>Log</Button>
      <Button onClick={() => saveAnswer() } >Save</Button>
    </Card>
  );
}