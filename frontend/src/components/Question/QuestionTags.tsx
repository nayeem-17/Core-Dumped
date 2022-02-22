import { Box, CardContent } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useAxiosFetch from "../../utils/useAxiosFetch";
import TagThumbnail from "../Tag/TagThumbnail";
import { defaultQuestionInfo, QuestionInfo, QuestionProps } from "./Question";

export default function QuestionTags({id}:QuestionProps) {
    const [data,setData] = useState<QuestionInfo>(defaultQuestionInfo);
    const [cookies,setCookies] = useCookies(['token','username']);
    const fetchSetTags = (responseData: any) => {
        setData({...data,TAGS:responseData});
    }
    useAxiosFetch(fetchSetTags,'/tag/question/'+id+'',cookies.token,[id]);
    return (<Box key={'question-tags-'+id}>   
        {
            data.TAGS?.map((tag) => {
                return <TagThumbnail key={'tag-thumbnail-'+tag.ID} id={tag.ID}></TagThumbnail>
            })
        }
    </Box>);
}