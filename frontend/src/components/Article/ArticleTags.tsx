import { CardContent } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useAxiosFetch from "../../utils/useAxiosFetch";
import TagThumbnail from "../Tag/TagThumbnail";
import { defaultArticleInfo, ArticleInfo, ArticleProps } from "./Article";

export default function ArticleTags({id}:ArticleProps) {
    const [data,setData] = useState<ArticleInfo>(defaultArticleInfo);
    const [cookies,setCookies] = useCookies(['token','username']);
    const fetchSetTags = (responseData: any) => {
        setData({...data,TAGS:responseData});
    }
    useAxiosFetch(fetchSetTags,'/tag/article/'+id+'',cookies.token,[id]);
    return (<Box key={'article-tags-'+id}>   
        {
            data.TAGS?.map((tag) => {
                return <TagThumbnail key={'article-tag-thumbnail-'+tag.ID} id={tag.ID}></TagThumbnail>
            })
        }
    </Box>);
}