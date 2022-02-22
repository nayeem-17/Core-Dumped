import { Box, CardContent, ListItem, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import useAxiosPost from '../../utils/useAxiosPost';
import { SearchBar } from '../SearchBar/SearchBar';
import ArticleThumbnail from './ArticleThumbnail';


export default function SearchTag() {
    interface SearchInfo {
        searchString: string,
        sortBy: string,
        searchResults?: {ID: number}[] ;
    };
    const [searchInfo,setSearchInfo] = useState<SearchInfo>({searchString:'',sortBy:'views'});
    const [cookies,setCookies] = useCookies(['token']) ;

    const handleTabValue = (event: React.SyntheticEvent, newValue: string) => {
        setSearchInfo({...searchInfo,sortBy:newValue});
    };
    
    const fetchSetSearchResults = (responseData:any) => {
        setSearchInfo({...searchInfo,searchResults:responseData});
    }
    useAxiosPost(fetchSetSearchResults,'/article/search',searchInfo,cookies.token,[searchInfo.searchString,searchInfo.sortBy]);
    
    return (<CardContent sx={{padding:'10px'}}>
    <Typography variant="h3">
        Articles
    </Typography>
    <SearchBar searchString={searchInfo.searchString} setSearchString={(s:string)=> setSearchInfo({...searchInfo,searchString:s})}/>
    <Tabs value={searchInfo.sortBy} onChange={handleTabValue}>
        <Tab value="views" label="Views"/>
        <Tab value="created_at" label="Recent"/>
    </Tabs>
    <Box className="search-results" sx={{maxHeight:'700px',overflow:'auto'}}>
        {
            searchInfo.searchResults?.map( (item) => {
                return <ListItem key={item.ID}><ArticleThumbnail key={item.ID} id={item.ID}></ArticleThumbnail>
            </ListItem>;
            })
        }
    </Box>
    </CardContent>);
}