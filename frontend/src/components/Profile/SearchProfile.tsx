import { Box, CardContent, ListItem, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { Search, SearchBar, SearchIconWrapper, StyledInputBase } from "../SearchBar/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import useAxiosPost from "../../utils/useAxiosPost";
import { useCookies } from "react-cookie";
import ProfileAvatar from "./ProfileAvatar";
import ProfileMini from "./ProfileMini";


export default function SearchProfile() {
    interface SearchInfo {
        searchString: string,
        sortBy: string,
        searchResults?: {ID: number,USERNAME: string}[] ;
    };
    const [searchInfo,setSearchInfo] = useState<SearchInfo>({searchString:'',sortBy:'score'});
    const [cookies,setCookies] = useCookies(['token']) ;

    const handleTabValue = (event: React.SyntheticEvent, newValue: string) => {
        setSearchInfo({...searchInfo,sortBy:newValue});
    };
    
    const fetchSetSearchResults = (responseData:any) => {
        setSearchInfo({...searchInfo,searchResults:responseData});
    }
    useAxiosPost(
        fetchSetSearchResults,
        '/profile/search',
        searchInfo,
        cookies.token,
        [searchInfo.searchString,searchInfo.sortBy]);
    
    return (<CardContent sx={{padding:'10px'}}>
    <Typography variant="h3">
        Users
    </Typography>``
    <SearchBar searchString={searchInfo.searchString} 
        setSearchString={(s:string)=> setSearchInfo({...searchInfo,searchString:s})}/>
    <Tabs value={searchInfo.sortBy} onChange={handleTabValue}>
        <Tab value="created_at" label="New Users"/>
        <Tab value="reputation" label="Reputation"/>
        <Tab value="question_count" label="Questions"/>
        <Tab value="article_count" label="Articles"/>
        <Tab value="answer_count" label="Answers"/>
    </Tabs>
    <Box className="search-results">
        {
            searchInfo.searchResults?.map( (item) => {
                return <ListItem key={item.ID}><ProfileMini key={item.ID} username={item.USERNAME}></ProfileMini>
            </ListItem>;
            })
        }
    </Box>
    </CardContent>);
}