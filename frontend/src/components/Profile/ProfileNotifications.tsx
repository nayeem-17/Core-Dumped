import { Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react' ;
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import postData from '../../utils/postData';
import useAxiosFetch from '../../utils/useAxiosFetch';
import { ProfileProps } from './Profile';

export interface Notification {
    ID: number,
    PROFILE_ID: number, 
    LINK: string,
    MESSAGE: string,
    IS_READ: number,
    CREATED_AT: string,
    UPDATED_AT?: string
}
const defaultNotifications: Notification[] = [{
    ID: 0,
    PROFILE_ID: 0,
    LINK: '',
    MESSAGE: '',
    IS_READ: 1,
    CREATED_AT: ''
}];
export default function ProfileNotifications({username}:ProfileProps) {
   const [cookies,setCookies] = useCookies(['token','username']);
   const [data,setData] = useState(defaultNotifications); 
   
   const markReadNotif = (id:number) => {
     postData('/notification/'+id,{},cookies.token)
     .then(response => {

     })
     .catch(error=> {
       console.log(error.response.data.message);
     })
   }
   useAxiosFetch(setData,'/notification',cookies.token,[username]);

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
           {data.length === 0 ? (
             <Typography variant="body1">{"No new notification"}</Typography>
           ) : (
             data.map((notif) => {
               return (
                 <Card
                   key={notif.ID}
                   sx={{ marginBottom: "5px", padding: "10px" }}
                   onClick={() => markReadNotif(notif.ID)}
                 >
                   <Link className="link" to={notif.LINK}>
                     <Typography variant="body2">{notif.MESSAGE}</Typography>
                   </Link>
                 </Card>
               );
             })
           )}
         </CardContent>
       </Card>
     </>
   );
}