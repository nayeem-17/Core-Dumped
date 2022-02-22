import { CardContent } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useAxiosFetch from "../../utils/useAxiosFetch";
import { QuestionProps } from "./Question";
import QuestionThumbnail from "./QuestionThumbnail";
import './Question.css';

export default function RelatedQuestions({id}:QuestionProps) {
    const [cookies,setCookies] = useCookies(['token']);
    interface info {
        ID: number;
    }
    const defaultR:info[] = [{ID:0}] ;
    const [data,setData] = useState<info[]>();

    useAxiosFetch(setData,'/question/'+id+'/related',cookies.token,[id]);
    return <CardContent>
        {
            data?.map( (item) => {
                return <QuestionThumbnail key={'related-question'+item.ID} id={item.ID}/>
            })
        }
    </CardContent>
}