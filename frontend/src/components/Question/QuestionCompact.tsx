import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import fetchData from '../../utils/fetchData';
import postData from '../../utils/postData';
import { addAnswer } from '../Answer/Answer';
import { addQuestionComment } from '../Comment/Comment';
import Editor from '../Editor/Editor';
import {QuestionProps,QuestionInfo,defaultQuestionInfo} from './Question' ;
import QuestionTags from './QuestionTags';
// import './Question.css';
import 'react-quill/dist/quill.snow.css';
import useAxiosFetch from '../../utils/useAxiosFetch';
import { Box, Card, Dialog, IconButton, Typography } from '@mui/material';
import { Delete, Edit, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import ProfileAvatar from '../Profile/ProfileAvatar';
import QuestionVoteButtons from './QuestionVoteButtons';
import EditQuestion from './EditQuestion';
import deleteData from '../../utils/deleteData';


export default function QuestionCompact({id}:QuestionProps){
    const [data,setData] = useState<QuestionInfo>(defaultQuestionInfo);
    const [showEditQuestion,setShowEditQuestion] = useState(false);
    const [cookies,setCookies] = useCookies(['token','username']);
    const navigate = useNavigate();

    const removeQuestion = () => {
        deleteData('/question/'+id+'/remove',cookies.token)
        .then(response => {
            if( response.data.success )
                navigate('/question') ;
        })
        .catch(error=> {
            console.log(error.response.data.message);
        });
    }
    const fetchSetData = (responseData: any) => {
        setData(responseData[0]);
    } 
    useAxiosFetch(fetchSetData,'/question/'+id,cookies.token,[id]);
    return (<>
        <Card key={'question-compact-'+id} className='question-container'>
            <Box className='question'>
                {data.CONTRIBUTED_BY === cookies.username && (
                <>
                    <IconButton onClick={()=>setShowEditQuestion(!showEditQuestion)}>
                    <Edit/>
                    </IconButton>
                    <IconButton onClick={()=>removeQuestion()}>
                    <Delete></Delete>
                    </IconButton>
                </>
                )}
                <Dialog open={showEditQuestion} onClose={()=>setShowEditQuestion(false)} >
                    <EditQuestion id={id}/>
                </Dialog>
                <QuestionTags id={id}></QuestionTags>
                <Typography variant="body1" fontWeight="bold"><Link className='link question' to={`/question/${data?.ID}`}>{data?.TITLE}</Link></Typography>
                <div style={{display:'block'}}>
                    <ProfileAvatar username={data.CONTRIBUTED_BY}/>
                    <Typography variant="body2" fontSize=".7rem">{"asked "}{data.CREATED_AT}</Typography>
                    <Typography variant="body2" fontSize=".7rem">{"updated "}{data.UPDATED_AT}</Typography>                    
                </div>
                <div className='ql-container ql-snow' style={{border:'none'}}>
                    <div className='ql-editor ql-snow' dangerouslySetInnerHTML={{__html: data?.CONTENT}}></div>
                </div>
                <Typography variant="body2" fontSize=".7rem">{data.VIEWS}{" views"}</Typography>
                <QuestionVoteButtons id={id} />
            </Box> 
        </Card>
    </>);
}
