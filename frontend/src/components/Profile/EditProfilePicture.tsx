import { Box, Typography, Avatar, Input, Button } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import useAxiosFetch from "../../utils/useAxiosFetch";
import { ProfileProps, ProfileInfo, defaultProfileInfo } from "./Profile";

export default function EditProfilePicture({username}:ProfileProps) {
    const [data,setData] = useState<ProfileInfo>(defaultProfileInfo);
    const [imageFile,setImageFile] = useState<any>();
    const [cookies,setCookies] = useCookies(['token','username']);

    const onImageInputChange = (event:any) => {
        console.log("Chosen image:"+event.target.files); 
        if( event.target.files && event.target.files[0]){
            const newData = {...data,PROFILE_PICTURE: URL.createObjectURL(event.target.files[0]) };
            setData(newData);
            setImageFile(event.target.files);
        }
        
    }
    const setProfilePicture = () => {
        const formData = new FormData();
        formData.append('file',imageFile[0]);

        let profilePictureURL: string;
        postData('/file/upload',formData,cookies.token)
        .then((response) => {
            console.log(response);
            console.log(response.data.url);
            profilePictureURL = response.data.url;
            
            postData('/profile/edit/profilePicture',{profilePicture: profilePictureURL},cookies.token)
            .then((response) =>{ 
                console.log(response);
            })
            .catch((error)=> {
                console.log(error.response);
            });
        })
        .catch( (error) => {
            console.log(error.response) ;
        });

        fetchData('/profile/'+username,cookies.token)
        .then( response => {
            setData(response.data.data[0]);
        })
        .catch( error => {
            console.log(error.response);
        })
    }

    const fetchSetData = (responseData:any)=>{
        console.log(responseData[0]);
        setData(responseData[0]);
    }
    useAxiosFetch(fetchSetData,'/profile/'+username,cookies.token,[username]);

    return (<Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}> 
        <Typography variant="h6" gutterBottom>
        Profile Picture:{" "}
        </Typography>
        <Avatar
        sx={{justifySelf:'center',height: "256px", width: "256px" }}
        alt={data.FIRST_NAME + " " + data.LAST_NAME}
        src={data.PROFILE_PICTURE}
        />
        <Input type="file" onChange={onImageInputChange}></Input> 
        <Button onClick={() => setProfilePicture() }> Save</Button>
    </Box>);
}

