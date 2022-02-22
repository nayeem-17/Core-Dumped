import { Add, Cancel } from "@mui/icons-material";
import { Box, Button, Card, CardContent, IconButton, List, ListItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import React,{ useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import useAxiosPost from "../../utils/useAxiosPost";
import { formats, toolbar } from "../Editor/Editor";
import TagThumbnail from "../Tag/TagThumbnail";
import { defaultQuestionInfo, QuestionInfo } from "./Question";

interface EditProps {
  id: number | undefined;
};
interface QuestionTagsInterface {
    TAGS?: { ID: number }[];
};
// undefined for creating a question, otherwise edit 
export default function EditQuestion({ id = undefined }: EditProps) {
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [questionTitle,setQuestionTitle] = useState('');
  const [questionContent,setQuestionContent] = useState('');

  const defaultSR = [{ID:65,TITLE:'Comp Sci'}];
  const [searchResults,setSearchResults] = useState(defaultSR);
  const [newTags, setNewTags] = useState(defaultSR);
  const [tags,setTags] = useState(defaultSR);
  const [showSearchTags,setShowSearchTags] = useState(false);
  const [searchString,setSearchString] = useState('');

  const addTag = (id: number, title: string) => {
    let n_newTags:{ID:number,TITLE: string}[] = [...newTags];
    
    let canPush = true;
    newTags.forEach( item => {
      if(item.ID === id )
        canPush = false;
    });
    if( canPush )
      n_newTags.push({ID:id,TITLE:title});
    setNewTags(n_newTags);
  }
  const removeTag = (id: number) => {
    const n_newTags = newTags.filter( (item) => item.ID !== id ) ;
    setNewTags(n_newTags);
  }

  const saveQuestion = () => {
    const tagsToAdd = newTags.filter((newtag) => {
      var notIn = true;
      tags.forEach((tag) => {
        if (tag.ID === newtag.ID) notIn = false;
      });
      return notIn;
    });
    const tagsToRemove = tags.filter((tag) => {
      var notIn = true;
      newTags.forEach((newtag) => {
        if (tag.ID === newtag.ID) notIn = false;
      });
      return notIn;
    });
    console.log('Adding :');
    console.log(tagsToAdd);
    console.log('Removing :');
    console.log(tagsToRemove);

    
    const addRemoveQuestionTags = (id:number) =>{ 
      tagsToAdd.forEach( (tag) => {
        postData('/tag/question/'+id+'/add',{tagId: tag.ID},cookies.token)
        .then(response=> {
          console.log(response.data.message);
        })
        .catch(error=> {
          console.log(error.response.data.message);
        });
      });
  
      tagsToRemove.forEach( (tag) => {
        postData('/tag/question/'+id+'/remove',{tagId: tag.ID}, cookies.token)
        .then(response=>{
          console.log(response.data.message);
        })
        .catch(error=>{{
          console.log(error.response.data.message);
        }});
      });
    }


    if( id === undefined ){
      postData('/question/add',{questionTitle: questionTitle, questionContent: questionContent, organization_id: 0},cookies.token)
      .then(response=> {
        console.log(response.data);
        let questionId = response.data.data['questionId'];

        addRemoveQuestionTags(questionId);
        // navigate('/question/'+questionId);
        window.location.reload();
      })
      .catch(error=> {
        console.log(error.response.data.message);
      })
    }
    else {
      postData('/question/'+id+'/edit',{questionTitle: questionTitle, questionContent: questionContent, organization_id:0}, cookies.token)
        .then(response=> {
          console.log(response.data);

          addRemoveQuestionTags(id);
          // navigate('/question/'+id);
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
      .get("/question/" + id)
      .then((response) => {
        if (!unmounted) {
          console.log(response.data.data);
          setQuestionTitle(response.data.data[0].TITLE);
          setQuestionContent(response.data.data[0].CONTENT);
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
  },[id]);

  useEffect(()=>{
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
      .get("/tag/question/" + id)
      .then((response) => {
        if (!unmounted) {
          console.log(response.data.data);
          setTags(response.data.data);
          setNewTags(response.data.data);
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
  },[id]);
  useAxiosPost(setSearchResults,'/tag/search',{searchString: searchString},cookies.token,[searchString]);
  
  return (
    <Card className="editor" sx={{ padding: "20px",maxHeight:'800px',overflow:'auto'}}>
      <Box>
        <CardContent>
          {/* <Typography variant="h5">Tags</Typography> */}
          <Box>
            {newTags?.map((tag) => {
              return <Box key={'box'+tag.ID}>
                        <TagThumbnail key={'tagthumbnail'+tag.ID} id={tag.ID} />
                        <IconButton key={tag.ID} onClick={() => removeTag(tag.ID) }> 
                          <Cancel key={tag.ID}></Cancel>
                        </IconButton> 
                      </Box>;
            })}
          </Box>
          <IconButton onClick={() => setShowSearchTags(!showSearchTags)}>
              <Add></Add>
              <Typography variant="body2">Add tags</Typography>
          </IconButton>
          <Box sx={{ width: "400px", maxHeight: "200px" }}>
            {showSearchTags && (
              <>
                <TextField
                  sx={{ marginTop: "10px", width: "100%" }}
                  id="outlined-required"
                  label="Search Tags"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                />
                <List sx={{ maxHeight: "200px", overflow: "auto" }}>
                  {searchResults?.map((item) => {
                    return (
                      <ListItem key={item.ID}>
                        <TagThumbnail id={item.ID}></TagThumbnail>
                        <IconButton
                          onClick={() => addTag(item.ID, item.TITLE)}
                        >
                          <Add></Add>
                        </IconButton>
                      </ListItem>
                    );
                  })}
                </List>
              </>
            )}
          </Box>
        </CardContent>
      </Box>
      <TextField
        id="filled-multiline-flexible"
        sx={{ width: "100%" }}
        label="Title"
        multiline
        maxRows={4}
        value={questionTitle}
        // placeholder={`Title of your Question`}
        onChange={(event) =>
          setQuestionTitle(event.target.value)
        }
        variant="filled"
      />
      <ReactQuill
        modules={{
          toolbar: {
            container: toolbar,
          },
        }}
        formats={formats}
        theme="snow"
        value={questionContent}
        onChange={setQuestionContent}
      ></ReactQuill>
      {/* <Button onClick={() => postNewPost()}>Post</Button> */}
      <Button onClick={() => console.log({questionTitle: questionTitle, questionContent: questionContent, Tags: newTags})}>Log</Button>
      <Button onClick={() => saveQuestion() } >Save</Button>
    </Card>
  );
}