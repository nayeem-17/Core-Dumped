import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import postData from "../../utils/postData";
import { ProfileProps } from "./Profile";

export default function DeleteProfile ({username}:ProfileProps){
    interface PasswordForm {
        password?: string
        rePassword?: string,
        message?: string;
    }
    const [data,setData] = useState<PasswordForm>({});
    const [cookies,setCookies] = useCookies(['token','username']);
    const navigate = useNavigate();
    const deleteAccount = () => {
        if( data.password && data.rePassword )
        postData('/profile/delete',data,cookies.token)
        .then( response =>{ 
            console.log('au revoir');

            setCookies('token','');
            setCookies('username','');
            navigate('/');
        })
        .catch( error => {
            console.log(error.response.data.message);
            setData({...data,message:error.response.data.message});
        })
    }


    return(<>
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
              required
              type="password"
              id="outlined-required"
              label="Password"
              value={data.password}
              onChange={(e)=>setData({...data,password:e.target.value})}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Retype Password"
              type="password"
              autoComplete="current-password"
              value={data.rePassword}
              color={(data.password===data.rePassword)?'success':'warning'}
              onChange={(e)=>setData({...data,rePassword:e.target.value})}
            />
        </div>  
        <Typography variant="h5">{data?.message}</Typography>
        <Button onClick={()=>deleteAccount()}>DELETE ACCOUNT</Button>
        </Box>
        </>
            
    );
}