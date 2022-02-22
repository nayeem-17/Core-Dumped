import { Add, Cancel } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    List,
    ListItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import useAxiosPost from "../../utils/useAxiosPost";
import { formats, toolbar } from "../Editor/Editor";
import TagThumbnail from "../Tag/TagThumbnail";

interface EditProps {
    id: number | undefined;
}
// undefined for creating an article, otherwise edit
export default function EditArticle({ id = undefined }: EditProps) {
    const [cookies, setCookies] = useCookies(["token"]);
    const navigate = useNavigate();
    const [articleTitle, setArticleTitle] = useState("");
    const [articleContent, setArticleContent] = useState("");

    const defaultSR = [{ ID: 65, TITLE: "Comp Sci" }];
    const [searchResults, setSearchResults] = useState(defaultSR);
    const [newTags, setNewTags] = useState(defaultSR);
    const [tags, setTags] = useState(defaultSR);
    const [showSearchTags, setShowSearchTags] = useState(false);
    const [searchString, setSearchString] = useState("");

    const addTag = (id: number, title: string) => {
        let n_newTags: { ID: number; TITLE: string }[] = [...newTags];

        let canPush = true;
        newTags.forEach((item) => {
            if (item.ID === id) canPush = false;
        });
        if (canPush) n_newTags.push({ ID: id, TITLE: title });
        setNewTags(n_newTags);
    };
    const removeTag = (id: number) => {
        const n_newTags = newTags.filter((item) => item.ID !== id);
        setNewTags(n_newTags);
    };

    const saveArticle = () => {
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
        console.log("Adding :");
        console.log(tagsToAdd);
        console.log("Removing :");
        console.log(tagsToRemove);

        const addRemoveArticleTags = (id: number) => {
            tagsToAdd.forEach((tag) => {
                postData(
                    "/tag/article/" + id + "/add",
                    { tagId: tag.ID },
                    cookies.token
                )
                    .then((response) => {
                        console.log(response.data.message);
                    })
                    .catch((error) => {
                        console.log(error.response.data.message);
                    });
            });

            tagsToRemove.forEach((tag) => {
                postData(
                    "/tag/article/" + id + "/remove",
                    { tagId: tag.ID },
                    cookies.token
                )
                    .then((response) => {
                        console.log(response.data.message);
                    })
                    .catch((error) => {
                        {
                            console.log(error.response.data.message);
                        }
                    });
            });
        };

        if (id === undefined) {
            postData(
                "/article/add",
                { articleTitle: articleTitle, articleContent: articleContent },
                cookies.token
            )
                .then((response) => {
                    console.log(response.data);
                    let articleId = response.data.data["articleId"];

                    addRemoveArticleTags(articleId);
                    // navigate("/article/" + articleId);
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        } else {
            postData(
                "/article/" + id + "/edit",
                { articleTitle: articleTitle, articleContent: articleContent },
                cookies.token
            )
                .then((response) => {
                    console.log(response.data);

                    addRemoveArticleTags(id);
                    // navigate("/article/" + id);
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        }
    };

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
            .get("/article/" + id)
            .then((response) => {
                if (!unmounted) {
                    console.log(response.data.data);
                    setArticleTitle(response.data.data[0].TITLE);
                    setArticleContent(response.data.data[0].CONTENT);
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
    }, [id]);

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
            .get("/tag/article/" + id)
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
    }, [id]);
    useAxiosPost(
        setSearchResults,
        "/tag/search",
        { searchString: searchString },
        cookies.token,
        [searchString]
    );

    return (
        <Card
            className="editor"
            component="form"
            autoComplete="off"
            sx={{ maxWidth: "700px", padding: "20px",maxHeight:'700px',overflow:'auto' }}
        >

            <Stack spacing={2}>
                <Box>
                    <CardContent>
                        <Box>
                            {newTags?.map((tag) => {
                                return (
                                    <Box key={"box" + tag.ID}>
                                        <TagThumbnail key={"tagthumbnail" + tag.ID} id={tag.ID} />
                                        <IconButton key={tag.ID} onClick={() => removeTag(tag.ID)}>
                                            <Cancel key={tag.ID}></Cancel>
                                        </IconButton>
                                    </Box>
                                );
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
                                                    <IconButton onClick={() => addTag(item.ID, item.TITLE)}>
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
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        display: {
                            xs: "none",
                            sm: "block",
                        },
                        alignSelf: "center",
                    }}
                >
                    Title
                </Typography>
                <TextField
                    style={{ backgroundColor: "AppWorkspace" }}
                    fullWidth
                    variant="outlined"
                    value={articleTitle}
                    placeholder={`Title of your article`}
                    onChange={(event) => setArticleTitle(event.target.value)}
                ></TextField>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        display: {
                            xs: "none",
                            sm: "block",
                        },
                        alignSelf: "center",
                    }}
                >
                    Content
                </Typography>
                <ReactQuill
                    modules={{
                        toolbar: {
                            container: toolbar,
                        },
                    }}
                    formats={formats}
                    theme="snow"
                    value={articleContent}
                    onChange={setArticleContent}
                />
                <Button
                    style={{
                        backgroundColor: "#00bcd4",
                        color: "white",
                        marginTop: "10px",
                        width: "20%",
                        alignSelf: "center",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => saveArticle()}
                >
                    {" "}
                    Save
                </Button>
            </Stack>
        </Card>
    );
}
