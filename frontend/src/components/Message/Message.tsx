import { Delete, Send } from '@mui/icons-material';
import { Button, Card, Dialog, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react' ;
import { useCookies } from 'react-cookie';
import deleteData from '../../utils/deleteData';
import postData from '../../utils/postData';
import useAxiosFetch from '../../utils/useAxiosFetch';
import ProfileAvatar from '../Profile/ProfileAvatar';

export interface MessageProps {
    id: number 
}
export interface MessageData {
    ID:number,
    SENDER_ID:number,
    SENDER_USERNAME:string,
    RECEIVER_ID:number,
    MESSAGE:string,
    CREATED_AT?:string,
    UPDATED_AT?:string
}

const sendMessage = (receiverId:number|undefined, message:string, token: string) => {
    postData('/message/send', {receiverId:receiverId,message:message}, token )
    .then(response=> {

    })
    .catch(error=>{
        console.log(error.response.data.message);
    });
}
const deleteMessage = (messageId: number, token:string) => {
    deleteData('/message/delete/'+messageId,token)
    .then(response=> {

    })
    .catch(error=>{
        console.log(error.response.data.message);
    })
}

export function MessageDeleteButton({id}:MessageProps) {
    const [cookies,setCookies] = useCookies(['token','username']);
    
    return 
}

interface MessageSendButtonProps {
    receiverId: number | undefined
}
export function MessageSendButton({receiverId}:MessageSendButtonProps){
    const [cookies,setCookies] = useCookies(['token','username']);
    const [showMessageEditor,setShowMessageEditor] = useState(false);
    const [message,setMessage] = useState('');

    return (
      <>
        <IconButton
          key={"message-send-button-" + receiverId}
          onClick={()=>setShowMessageEditor(!showMessageEditor)}
          >
          <Send></Send>
        </IconButton>
        <Dialog
          open={showMessageEditor}
          onClose={() => setShowMessageEditor(false)}
          >
          <TextField
            id="filled-multiline-flexible"
            label="Message"
            multiline
            maxRows={4}
            value={message}
            onChange={(e) =>
                setMessage(e.target.value)
            }
            variant="filled"
            />
          <IconButton onClick={() => {sendMessage(receiverId, message, cookies.token); setShowMessageEditor(false); }}>
            <Send></Send>
          </IconButton>
        </Dialog>
      </>
    );
}
export default function Message({id}:MessageProps) {
    const [cookies,setCookies] = useCookies(['token','username']);
    const [data,setData] = useState<MessageData>({
        ID: 0,
        SENDER_ID: 0,
        SENDER_USERNAME: '',
        RECEIVER_ID: 0,
        MESSAGE: ''
    });
    
    useAxiosFetch((responseData:any)=> {
        setData(responseData[0]);
    },'/message/'+id,cookies.token,[id]);

    return (
      <Card sx={{ borderRadius: "10px" }}>
        <ProfileAvatar username={data?.SENDER_USERNAME} />
        <Box>
          <Typography variant="body2">{data?.MESSAGE}</Typography>
        </Box>
        <Box>
          <Typography variant="body2">
            {"at "}
            {data?.CREATED_AT}
          </Typography>
        </Box>
        <Box>
          <IconButton
            key={"message-delete-button-" + id}
            onClick={() => deleteMessage(id, cookies.token)}
          >
            <Delete></Delete>
          </IconButton>
          <MessageSendButton receiverId={data.SENDER_ID}></MessageSendButton>
        </Box>
      </Card>
    );
}