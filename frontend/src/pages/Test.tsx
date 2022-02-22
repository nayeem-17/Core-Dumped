import React, { useDebugValue, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import EditAnswer from "../components/Answer/EditAnswer";
import EditArticle from "../components/Article/EditArticle";
import Editor from "../components/Editor/Editor";
import Navbar from "../components/Navbar/Navbar";
import EditQuestion from "../components/Question/EditQuestion";
import TagCompact from "../components/Tag/TagCompact";
import TagThumbnail from "../components/Tag/TagThumbnail";
import postData from "../utils/postData";

export default function Test() {
    const [file,setFile] = useState<any>();
    const [cookies,setCookies] = useCookies(['token']);
    const [value,setValue] = useState('');
    
    const sendFile =()=>{ 
        const formData = new FormData();
        formData.append('file', file[0]);
        postData('/file/upload',formData,cookies.token)
        .then( (response) => {
            console.log(response);
            console.log(response.data);
        })
        .catch( (error) => {
            console.log(error.response);
        });
    }
    return <>
        <Navbar/>
        <div className="container">
            <div className='container-center'>
                <label>Select file: </label>
                <input type='file' onChange={(e)=>setFile(e.target.files)}></input>
                <button onClick={() => console.log(file)}>Log</button>
                <button onClick={() => sendFile()}>Send</button>

                <Editor value={value} setValue={setValue} />

                {/* <EditAnswer id={undefined} questionId={undefined}></EditAnswer> */}
            </div>
            <div className='container-left'>

            </div>
            <div className='container-right'> 
            <TagThumbnail id={64}/>
            <TagCompact id={65}/>
            </div>
        </div>
    </>;
}