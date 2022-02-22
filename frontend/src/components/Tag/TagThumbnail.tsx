import { Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import { TagProps, TagInfo, defaultTagInfo } from "./Tag";

export default function TagThumbnail({id}:TagProps) {
    const [cookies,setCookies] = useCookies(['token']);
    const [data,setData] = useState<TagInfo>(defaultTagInfo);

    useAxiosFetch((responseData:any)=> {
        setData(responseData[0]);
    },'/tag/'+id+'/thumbnail',cookies.token,[id]);
    return <> 
         <Link to={`/tag/${data.ID}`} className='link'>
            <Chip label={data.TITLE} variant="outlined" clickable/>
        </Link>
         
    </>;
}