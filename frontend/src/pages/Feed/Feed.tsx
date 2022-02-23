import React,{useEffect,useState,useContext} from 'react';
import {Navigate} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { useCookies } from 'react-cookie';
import useAxiosFetch from '../../utils/useAxiosFetch';
import { Box, Card, CardContent, Dialog, DialogContent, DialogTitle, Divider, IconButton, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import QuestionThumbnail from '../../components/Question/QuestionThumbnail';
import ArticleThumbnail from '../../components/Article/ArticleThumbnail';
import TagThumbnail from '../../components/Tag/TagThumbnail';
import { LeftPanel } from '../../components/LeftSideBar/LeftSideBar';
import { CreatePost } from '../../components/Editor/Editor';
import EditQuestion from '../../components/Question/EditQuestion';
import EditArticle from '../../components/Article/EditArticle';
export interface IDs{
      ID: number;
    };
    
const Feed = () => {   
    const [cookies,setCookies] = useCookies(['token','username']);
    const [showAddQuestion,setShowAddQuestion] = useState(false);
    const [showAddArticle,setShowAddArticle] = useState(false);
    
    const [popularTags,setPopularTags] = useState<IDs[]>([]);
    const [topArticles,setTopArticles] = useState<IDs[]>([]);
    const [topQuestions,setTopQuestions] = useState<IDs[]>([]);

    useAxiosFetch( (response)=> {
      console.log(response);
      setTopQuestions(response);
    }, '/topQuestions',cookies.token,[]);
    useAxiosFetch( (response)=> {
      console.log(response);
      setTopArticles(response);
    }, '/topArticles',cookies.token,[]);
    useAxiosFetch( (response)=> {
      console.log(response);
      setPopularTags(response);
    }, '/topTags',cookies.token,[]);

    if( !cookies.token )
        return <Navigate to='/login'></Navigate>;
    return (
      <>
        <Navbar />
        <div className="container feed">
          <div className="container-left feed">
            <LeftPanel id={0}></LeftPanel>
          </div>
          <Paper className="container-center" sx={{background:'var(--clr-gainsboro)'}}>
            <Dialog
              open={showAddQuestion}
              onClose={() => setShowAddQuestion(false)}
            >
              <EditQuestion id={undefined} />
            </Dialog>
            <Dialog
              open={showAddArticle}
              onClose={() => setShowAddArticle(false)}
            >
              <EditArticle id={undefined} />
            </Dialog>

            <CardContent>
              {/* <Divider></Divider> */}
              <Typography variant="h4" fontWeight="bold">
                Top Questions
              </Typography>
              <Divider></Divider>
              <Box sx={{ maxHeight: "500px", overflow: "auto",padding:'5px'}}>
                {topQuestions.map((post) => {
                  return (
                    <QuestionThumbnail
                      key={post.ID}
                      id={post.ID}
                    ></QuestionThumbnail>
                  );
                })}
              </Box>
            </CardContent>

            <CardContent>
              {/* <Divider></Divider> */}
              <Typography variant="h4" fontWeight="bold">
                Top Articles
              </Typography>
              <Divider></Divider>
              <Box sx={{ maxHeight: "500px", overflow: "auto",padding:'5px'}}>
                {topArticles.map((post) => {
                  return (
                    <ArticleThumbnail
                      key={post.ID}
                      id={post.ID}
                    ></ArticleThumbnail>
                  );
                })}
              </Box>
            </CardContent>
          </Paper>
          <Paper className="container-right">
            <IconButton onClick={() => setShowAddQuestion(!showAddQuestion)}>
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
            <IconButton onClick={() => setShowAddArticle(!showAddArticle)}>
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
                  Add article
                </Typography>
              </Box>
            </IconButton>
            <Paper>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  Popular Topics
                </Typography>
                <Box sx={{ maxHeight: "900px", overflow: "auto" }}>
                  {popularTags?.map((item) => {
                    return (
                      <TagThumbnail
                        key={"tag-thumbnail-" + item.ID}
                        id={item.ID}
                      ></TagThumbnail>
                    );
                  })}
                </Box>
              </CardContent>
            </Paper>
          </Paper>
        </div>
      </>
    );
}
export default Feed;