import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import ResponsiveAppBar from '../../components/Navbar/NavBartest';

function HomePage(){
    const [data,setData] = useState([{ID:0,TITLE:'',TYPE:''},{ID:0,TITLE:'',TYPE:''}]);

    useEffect( ()=>{
        axios.get(process.env.REACT_APP_SERVER_URL+'').
        then( (response) => {
            console.log(response.data);
            setData(response.data);
        }).
        catch( (error) => {
            console.log(error.response);
        });
    }, [] );
    return (
        <>
            <ResponsiveAppBar/>
            <div className='container'>
            <div className='container-center'>
            {
                data.map( (post,index) =>{
                    const link = (post.TYPE === 'QUESTION') ? `/question/${post.ID}` : `/article/${post.ID}`;
                    return (<div> 
                        <Link to={link} > {post.TITLE} </Link>
                    </div>)
                })
            }
            </div>
            </div>
        </>);
}


export default HomePage;