
import { Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react' ;
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { IDs } from '../../pages/Feed/Feed';
import postData from '../../utils/postData';
import useAxiosFetch from '../../utils/useAxiosFetch';
import Message from '../Message/Message';
import { ProfileProps } from './Profile';


export default function ProfileMessages({username}:ProfileProps) {
   const [cookies,setCookies] = useCookies(['token','username']);
   const [data,setData] = useState<IDs[]>([]); 
   
   useAxiosFetch(setData,'/message',cookies.token,[username]);

   return (
     <>
       <Card
         sx={{
           position: "absolute",
           maxHeight: "300px",
           right: "0",
           width: "300px",
           overflow: "auto",
         }}
       >
         <CardContent
           sx={{
             overflow: "auto",
             padding: "10px",
           }}
         >
           {data?.length === 0 ? (
             <Typography variant="body1">{"No new message"}</Typography>
           ) : (
             data?.map((msg) => {
               return <Message id={msg.ID} key={"message-" + msg.ID}></Message>;
             })
           )}
         </CardContent>
       </Card>
     </>
   );
}