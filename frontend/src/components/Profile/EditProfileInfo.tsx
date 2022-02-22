import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import postData from "../../utils/postData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import { ProfileProps, ProfileInfo, defaultProfileInfo } from "./Profile";

export default function EditProfileInfo({username}:ProfileProps){
    const [data,setData] = useState<ProfileInfo>(defaultProfileInfo);
    const [message,setMessage] = useState('');
    const [cookies,setCookies] = useCookies(['token','username']);

    const fetchSetData = (responseData:any)=>{
        console.log(responseData[0]);
        setData(responseData[0]);
    }

    const updateInfo = () => {
        postData('/profile/edit/updateInfo',data,cookies.token)
        .then(response=>{
            console.log(response.data.message);
            setMessage(response.data.message);
        })
        .catch(error=>{
            console.log(error.response.data.message);
            setMessage(error.response.data.message);

        });
    }
    useAxiosFetch(fetchSetData,'/profile/'+username,cookies.token,[username]);

    return (<>
    <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
    >
    <div>
    <TextField
        variant="standard"
        label="First Name"
        value={data.FIRST_NAME}
        onChange={(e) =>
            setData({
            ...data,
            FIRST_NAME: e.target.value,
            })
        }
    /> 
    <TextField
        variant="standard"
        label="Last Name"
        value={data.LAST_NAME}
        onChange={(e) =>
            setData({
            ...data,
            LAST_NAME: e.target.value,
            })
        }
    />
    <TextField
        variant="standard"
        label="E-mail"
        value={data.EMAIL}
        onChange={(e) =>
            setData({ ...data, EMAIL: e.target.value })
        }
    /> 
    <TextField
        variant="standard"
        label='Title'
        value={data.TITLE}
        onChange={(e) =>{ 
            setData({...data,TITLE:e.target.value})
        }}
    />
    <TextField
        id="filled-multiline-flexible"
        label="About Me"
        multiline
        maxRows={4}
        value={data.DESCRIPTION}
        onChange={(e) =>
            setData({
            ...data,
            DESCRIPTION: e.target.value,
            })
        }
        variant="filled"
    />
    <TextField
        variant="filled"
        type="date"
        label="Birthdate"
        value={data.BIRTHDATE}
        onChange={(e) => {
            console.log(e.target.value);
            setData({ ...data, BIRTHDATE: e.target.value })

        }
        }
    />
    </div>
    <Typography variant="body2">{message}</Typography>
    <Button onClick={() => updateInfo()}>Save</Button>
    </Box>
    
    </>
    );
}

