import { Button } from '@mui/material';
import React, { useState } from 'react' ;
import { useCookies } from 'react-cookie';
import postData from '../../utils/postData';
import useAxiosFetch from '../../utils/useAxiosFetch';
import { ProfileProps } from './Profile';


export default function ProfileFollowButton({username}:ProfileProps){
    const [cookies,setCookies] = useCookies(['token','username']);
    const [follows,setFollows] = useState(false);

    const handleFollow = () => {
        const url = follows ? ('/profile/unfollow/'+username) : ('/profile/follow/'+username);
        postData(url, follows, cookies.token)
        .then((response) => {
          console.log(response);
          if( response.data.success === true )
            setFollows(!follows);
        })
        .catch((error) => {
          console.log(error.response);
        });
    };
    const fetchSetData = (responseData:any) => {
        setFollows( (responseData.length > 0) );
    }
    useAxiosFetch(fetchSetData,'/profile/follows/'+username,cookies.token,[username]);
    return (
      <Button className="btn follow" onClick={() => handleFollow()}>
        {follows && 'Unfollow'}
        {!follows && 'Follow'}
      </Button>
    );
}