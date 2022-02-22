import { CardContent } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useAxiosFetch from "../../utils/useAxiosFetch";
import { ArticleProps } from "./Article";
import ArticleThumbnail from "./ArticleThumbnail";
import './Article.css';

export default function RelatedArticles({id}:ArticleProps) {
    const [cookies,setCookies] = useCookies(['token']);
    interface info {
        ID: number;
    }
    const defaultR:info[] = [{ID:0}] ;
    const [data,setData] = useState<info[]>();
    useAxiosFetch(setData,'/article/'+id+'/related',cookies.token,[id]);
  
    return <CardContent key={'related-articles'}>
        {
            data?.map( (item) => {
                return <ArticleThumbnail key={item.ID} id={item.ID}/>
            })
        }
    </CardContent>
  }