import React,{useEffect, useState} from 'react';
import {Link, Navigate,useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import Navbar from '../../components/Navbar/Navbar';
import LeftSideBar, { LeftPanel } from '../../components/LeftSideBar/LeftSideBar';
import Editor from '../../components/Editor/Editor';

import './Question.css';
import SearchQuestion from '../../components/Question/SearchQuestion';
import { Box, Dialog, IconButton, Paper, Typography } from '@mui/material';
import QuestionAnswers from '../../components/Question/QuestionAnswers';
import QuestionComments from '../../components/Question/QuestionComments';
import QuestionCompact from '../../components/Question/QuestionCompact';
import RelatedQuestions from '../../components/Question/RelatedQuestions';
import { defaultQuestionInfo } from '../../components/Question/Question';
import useAxiosFetch from '../../utils/useAxiosFetch';
import { Add, Delete, Edit } from '@mui/icons-material';
import EditQuestion from '../../components/Question/EditQuestion';
import useAxiosPost from '../../utils/useAxiosPost';


export default function Question(){
    const {id} = useParams();
    const id_int = parseInt(id+'');
    const [cookies,setCookies] = useCookies(['token','username']);
    // const [questionInfo,setQuestionInfo] = useState(defaultQuestionInfo);
    const [showCreateQuestion,setShowCreateQuestion] = useState(false);
    // const fetchSetQuestionInfo = (responseData: any) =>{
    //     setQuestionInfo(responseData[0]);
    // }
    // useAxiosFetch(fetchSetQuestionInfo,'/question/'+id+"",cookies.token,[id]);
    useAxiosPost((responseData)=> {},'/question/'+id+'/view',{},cookies.token,[id]);

    if( !cookies.token )
        return <Navigate to='/login'/>;
    if( id === undefined ){
        return (
        <>
        <Navbar/>
        <div className='container'>
            <Paper className='container-center' sx={{background:'var(--clr-gainsboro)'}}>
                <Dialog sx={{overflow:'auto', maxHeight:'900px'}} open={showCreateQuestion} onClose={()=>setShowCreateQuestion(false)} >
                    <EditQuestion id={undefined} />
                </Dialog>
                <SearchQuestion/>
            </Paper>
            <div className='container-left'>
                <LeftPanel id={1}/>
            </div>
            <div className='container-right'>
                <IconButton onClick={() => setShowCreateQuestion(!showCreateQuestion)}>
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
                    Add question
                    </Typography>
                </Box>
                </IconButton>
            </div>
        </div>
        </>
        );
    }
    return (
      <>
        <Navbar />
        <div className="container">
          <Paper className="container-center">
            <QuestionCompact id={id_int}></QuestionCompact>
            <QuestionComments id={id_int}></QuestionComments>
            <QuestionAnswers id={id_int}></QuestionAnswers>
          </Paper>
          <div className="container-left">
            <LeftPanel id={1} />
          </div>
          <Paper className="container-right">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Related questions
            </Typography>
            <RelatedQuestions id={id_int} />
          </Paper>
        </div>
      </>
    );
} 