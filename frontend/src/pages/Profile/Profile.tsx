import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { LeftPanel } from '../../components/LeftSideBar/LeftSideBar';
import Navbar from '../../components/Navbar/Navbar';
import ProfileAnswers from '../../components/Profile/ProfileAnswers';
import ProfileArticles from '../../components/Profile/ProfileArticles';
import ProfileCard from '../../components/Profile/ProfileCard';
import ProfileFollowers from '../../components/Profile/ProfileFollowers';
import ProfileFollowing from '../../components/Profile/ProfileFollowing';
import ProfileInterests from '../../components/Profile/ProfileInterests';
import ProfileQuestions from '../../components/Profile/ProfileQuestions';
import ProfileStats from '../../components/Profile/ProfileStats';
import SearchProfile from '../../components/Profile/SearchProfile';


const Profile = ()=>{
    const {id} = useParams();
    

    if( id === undefined){
        return <>
            <Navbar/>
            <div className='container profile'>
                <div className='container-left profile'>
                    <LeftPanel id={3}/>
                </div>
                <Paper className='container-center' sx={{background:'var(--clr-gainsboro)'}}>
                    <SearchProfile/>
                </Paper>
                <div className='container-right profile'>

                </div>
            </div>
            </>;
    }
    return (
    <>
        <Navbar/>
        <div className='container profile'>
            <div className='container-left profile'>
                <LeftPanel id={3}/>
            </div>
            <div className='container-center profile'> 
                <ProfileCard username={id}></ProfileCard>
                <ProfileStats username={id}/>
                <ProfileInterests username={id}/>
                <ProfileQuestions username={id}/>
                <ProfileArticles username={id}/>
                <ProfileAnswers username={id}/> 
            </div>

            <div className='container-right profile'>
                <ProfileFollowers username={id}/>
                <ProfileFollowing username={id}/>
            </div>
        </div>
    </>);
}

export default Profile;
