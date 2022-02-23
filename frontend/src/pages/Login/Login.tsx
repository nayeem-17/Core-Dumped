import React, {useState,useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Login.css';
import postData from '../../utils/postData';
import { Box, Button, Card, Checkbox, FormControlLabel, Grid, Input, TextField } from '@mui/material';

interface loginProps{
    showSignUpState: boolean;
}


const Login = ({showSignUpState}: loginProps)=>{
    const [cookies,setCookies] = useCookies(['token','username']);

    const [showSignUp,setShowSignUp] = useState(showSignUpState);
    const [loginFormData,setLoginFormData] = useState({username:'',password:'',message:''});
    const [registerFormData,setRegisterFormData] = useState({username:'',password:'',repassword:'',first_name:'',last_name:'',email:'',message:''});
    const handleSubmitLoginForm = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        postData('/auth/token',loginFormData)
        .then( (response) => {
            console.log(response);

            if( response.status === 200 ){
                setLoginFormData({...loginFormData, message:'Login success!!'});
                alert("Login success~!!");
                setCookies('username',loginFormData.username);
                setCookies('token',response.data.access_token);
            }
            else {
                setLoginFormData({...loginFormData, message:'Invalid credentials'});
            }
        }).catch( (error) => {
            console.log(error.response);

            setLoginFormData({...loginFormData, message:error.response.data.message});
        } )
        
        ;
    };

    const handleSubmitRegisterForm = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        postData('/auth/register',registerFormData)
        .then( (response) => {
            console.log(response);

            if( response.data.success === true ){
                setRegisterFormData({username:'',password:'',repassword:'',first_name:'',last_name:'',email:'',message:'User '+registerFormData.username+' was created successfully!'});
                
            }
            else {
                setRegisterFormData({...registerFormData,message:'Invalid information. The user exists'});
            }
        }).catch( (error) => {
            console.log(error.response) ;
        });
    }   

    const handleChangeLoginForm = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newLoginFromData = {...loginFormData, [event.target.name]: event.target.value, message: ''};
        setLoginFormData(newLoginFromData);
    }
    const handleChangeRegisterForm = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newRegisterFormData = {...registerFormData,[event.target.name]: event.target.value, message: ''};
        setRegisterFormData(newRegisterFormData);
    }

    if( cookies.token ){
        return <Navigate to='/feed'></Navigate>;
    }
    return (
      <Box className="form-container">
        <Card
          className="login-form"
          sx={{ justifySelf: "center", alignSelf: "center", display: "flex" }}
        >
          <Box
            component="form"
            className="form"
            onSubmit={handleSubmitLoginForm}
          >
            <div className="form-control">
              <label>Username:</label>
              <Input
                type="text"
                name="username"
                value={loginFormData.username}
                placeholder="Username"
                onChange={handleChangeLoginForm}
              ></Input>
            </div>
            <div className="form-control">
              <label>Password</label>
              <Input
                type="password"
                name="password"
                value={loginFormData.password}
                onChange={handleChangeLoginForm}
              ></Input>
            </div>
            <div className="login-form-buttons">
              <Button type="submit">login</Button>
              {showSignUp || (
                <Button type="button" onClick={() => setShowSignUp(true)}>
                  sign up
                </Button>
              )}
            </div>
            {loginFormData.message && (
              <div className="login-form-text">
                <p style={{ color: "#ff0000" }}>{loginFormData.message}</p>
              </div>
            )}
            <div className="login-form-texts">
              {/* <p>Forgot password?</p> */}
            </div>
          </Box>
          
          {showSignUp && (
            <form className="form" onSubmit={handleSubmitRegisterForm}>
              <div className="form-control">
                <label>First Name:</label>
                <Input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={registerFormData.first_name}
                  onChange={handleChangeRegisterForm}
                ></Input>
              </div>
              <div className="form-control">
                <label>Last Name:</label>
                <Input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={registerFormData.last_name}
                  onChange={handleChangeRegisterForm}
                ></Input>
              </div>
              <div className="form-control">
                <label>E-mail:</label>
                <Input
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  value={registerFormData.email}
                  onChange={handleChangeRegisterForm}
                ></Input>
              </div>
              <div className="form-control">
                <label>Username:</label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={registerFormData.username}
                  onChange={handleChangeRegisterForm}
                ></Input>
              </div>
              <div className="form-control">
                <label>Password:</label>
                <Input
                  type="password"
                  name="password"
                  value={registerFormData.password}
                  onChange={handleChangeRegisterForm}
                ></Input>
              </div>
              <div className="form-control">
                <label>Re-type Password:</label>
                <Input
                  type="password"
                  name="repassword"
                  value={registerFormData.repassword}
                  onChange={handleChangeRegisterForm}
                ></Input>
              </div>
              {registerFormData.message && (
                <div className="login-form-texts">
                  <p>{registerFormData.message}</p>
                </div>
              )}
              <div className="login-form-buttons">
                <Button type="submit">Sign up</Button>
                <Button onClick={() => setShowSignUp(false)}>Cancel</Button>
              </div>
            </form>
          )}
        </Card>
      </Box>
    );
}

export default Login;