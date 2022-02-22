import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "../../components/Navbar/Navbar";
import LeftSideBar, {
  LeftPanel,
} from "../../components/LeftSideBar/LeftSideBar";
import SearchArticle from "../../components/Article/SearchArticle";
import ArticleComments from "../../components/Article/ArticleComments";
import ArticleCompact from "../../components/Article/ArticleCompact";
import { Box, Dialog, IconButton, Paper, Typography } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import EditArticle from "../../components/Article/EditArticle";
import RelatedArticles from "../../components/Article/RelatedArticles";
import useAxiosPost from "../../utils/useAxiosPost";

export default function Article() {
  const { id } = useParams();
  const id_int = parseInt(id + "");
  const [cookies, setCookies] = useCookies(["token", "username"]);
  const [showEditArticle, setShowEditArticle] = useState(false);
  // const [articleInfo, setArticleInfo] =
  //   useState<ArticleInfo>(defaultArticleInfo);
  // const fetchSetArticleInfo = (responseData: any) => {
  //   setArticleInfo(responseData[0]);
  // };
  // useAxiosFetch(fetchSetArticleInfo, "/article/" + id + "", cookies.token, [
  //   id,
  // ]);
  useAxiosPost((responseData)=> {},"/article/"+id+'/view',{},cookies.token,[id]);

  if (!cookies.token) return <Navigate to="/login"></Navigate>;

  if (id === undefined) {
    return (
      <>
        <Navbar />
        <div className="container">
          <Paper className='container-center' sx={{background:'var(--clr-gainsboro)'}}>
             <Dialog
              open={showEditArticle}
              onClose={() => setShowEditArticle(false)}
            >
              <EditArticle id={undefined} />
            </Dialog>
            <SearchArticle /> 
          </Paper>
          <div className="container-left">
            <LeftPanel id={2} />
          </div>
          <div className="container-right">
            <IconButton onClick={() => setShowEditArticle(!showEditArticle)}>
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
          <ArticleCompact id={id_int}></ArticleCompact>
          <ArticleComments id={id_int}></ArticleComments>
        </Paper>
        <div className="container-left">
          <LeftPanel id={2} />
        </div>
        <Paper className="container-right">
          <h3>Related articles</h3>
          <RelatedArticles id={id_int}></RelatedArticles>
        </Paper>
      </div>
    </>
  );
}
