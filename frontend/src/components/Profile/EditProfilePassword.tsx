import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import postData from "../../utils/postData";
import { ProfileProps } from "./Profile";

export default function EditProfilePassword ({username}:ProfileProps) {
    interface PasswordForm {
        currentPassword?: string,
        newPassword?: string,
        confirmNewPassword?: string,
        message?: string;
    }
    const [data,setData] = useState<PasswordForm>({});
    const [cookies,setCookies] = useCookies(['token']);
    const changePassword = () => {
        postData('/profile/edit/changePassword',data,cookies.token)
        .then( response => {
            console.log(response.data);

            setData({currentPassword:'',newPassword:'',confirmNewPassword:'',message:response.data.message});
        })
        .catch( error =>{ 
            console.log(error.response) ;
            setData({currentPassword:'',newPassword:'',confirmNewPassword:'',message:error.response.data.message});
        });
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
          label="Current Password"
          value={data.currentPassword}
          onChange={(e)=>setData({...data,currentPassword:e.target.value})}
        />
        <TextField
          required
          type="password"
          id="outlined-required"
          label="New Password"
          value={data.newPassword}
          onChange={(e)=>setData({...data,newPassword:e.target.value})}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Confirm New Password"
          type="password"
          autoComplete="current-password"
          value={data.confirmNewPassword}
          color={(data.newPassword===data.confirmNewPassword)?'success':'warning'}
          onChange={(e)=>setData({...data,confirmNewPassword:e.target.value})}
        />
        
    </div>  
    <Typography variant="body2">{data.message}</Typography>
    <Button onClick={()=>changePassword()}>Change Password</Button>
    </Box>
    </>
        
    );
}

