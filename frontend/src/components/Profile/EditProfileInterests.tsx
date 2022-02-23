import { Add, Delete } from "@mui/icons-material";
import { Card, CardContent, Typography, Box, IconButton, TextField, List, ListItem } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import useAxiosPost from "../../utils/useAxiosPost";
import TagThumbnail from "../Tag/TagThumbnail";
import { ProfileProps, ProfileInfo, defaultProfileInfo } from "./Profile";

export default function ProfileInterests({username}:ProfileProps) {
    const [data,setData] = useState<ProfileInfo>(defaultProfileInfo);
    const [cookies,setCookies] = useCookies(['token','username']);
    const [showSearchTags,setShowSearchTags] = useState(false);
    const [searchString,setSearchString] = useState('');
    
    const defaultSR = [{ID:65,TITLE:'Comp Sci'}];
    const [searchResults,setSearchResults] = useState(defaultSR);
  
    const addInterest = (tagId: number, tagTitle: string) => {
        postData('/tag/user/'+username+'/add',{tagId: tagId},cookies.token)
        .then( (response) => {
            console.log('addInterest: '+response.data);
        })
        .catch( (error) => {
            console.log(error.response);
        });

        fetchData('/tag/user/'+username,cookies.token)
        .then( (response) => {
            setInterests(response.data.data);
        })
        .catch( (error) => {
            console.log(error.respnse) ;
        });
    }
    const removeInterest = (tagId: number) => {
        postData('/tag/user/'+username+'/remove',{tagId: tagId},cookies.token)
        .then( (response) => {
            console.log('removeInterest: '+response.data);
        })
        .catch( (error) => {
            console.log(error.response);
        });

        fetchData('/tag/user/'+username,cookies.token)
        .then( (response) => {
            setInterests(response.data.data);
        })
        .catch( (error) => {
            console.log(error.respnse) ;
        });
    }

    const setInterests = (responseData:any) =>{
        setData({...data,INTERESTS:responseData});
    }
    const fetchSetSearchResults = (responseData: any) => {
        console.log('Search Results: '+responseData);
        setSearchResults(responseData);
    }
    useAxiosFetch(setInterests,'/tag/user/'+username,cookies.token,[username]) ;
    useAxiosPost(fetchSetSearchResults,'/tag/search',{searchString: searchString},cookies.token,[searchString]);
    return  (<>
    <Card>
        <CardContent >
            <Typography variant="h5" sx={{fontWeight:'bold'}}>Interests</Typography>
            <Box>
                {
                data.INTERESTS?.map((tag) => {
                    return (<Box key={'profile-interest-tag-box'+tag.ID}>
                                <TagThumbnail key={'profile-interest-'+tag.ID} id={tag.ID}></TagThumbnail>
                                <IconButton onClick={()=>removeInterest(tag.ID)}>
                                        <Delete></Delete>
                                </IconButton>
                           </Box>);
                })
                }
            </Box>
            <IconButton onClick={()=>setShowSearchTags(!showSearchTags)}>
                <Add></Add>
            </IconButton>
            <Box sx={{width:'400px',maxHeight:'200px'}}>
            { showSearchTags && (<>
                <TextField
                    sx={{marginTop:'10px',width:'100%'}}
                    id="outlined-required"
                    label="Search Tags"
                    value={searchString}
                    onChange={(e)=>setSearchString(e.target.value)}
                />
                <List sx={{maxHeight:'200px',overflow:'auto'}}>
                {
                    searchResults?.map((item) => {
                        return <ListItem key={item.ID}> 
                                    <TagThumbnail id={item.ID}></TagThumbnail> 
                                    <IconButton onClick={()=>addInterest(item.ID,item.TITLE)}>
                                        <Add></Add>
                                    </IconButton>
                                </ListItem>
                    })
                }
                </List>
            </>)
            }
            </Box>
        </CardContent>
    </Card>
    </>);
}
