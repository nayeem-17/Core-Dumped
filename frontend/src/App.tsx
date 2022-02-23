import React, {useState,useContext, useEffect} from 'react';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { CookiesProvider,useCookies } from 'react-cookie';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Feed from './pages/Feed/Feed';
import Profile from './pages/Profile/Profile';
import Article from './pages/Article/Article';
import Question from './pages/Question/Question';
import Tag from './pages/Tag/Tag';
import EditProfile from './pages/Profile/EditProfile';
import Test from './pages/Test';
import Navbar from './components/Navbar/Navbar';
import {CreateArticle } from './components/Editor/Editor';
import EditQuestion from './pages/Question/EditQuestion';

function App() {
  document.title = "CoreDumped";
  return (
      <CookiesProvider> 
      <Routes> 
      <Route path="/" element={<Login showSignUpState={false}/>}></Route>
      <Route path='/login' element={ <Login showSignUpState={false}></Login>} />
      <Route path='/register' element={ <Login showSignUpState={true}/> }/>
      <Route path="/feed" element={<Feed></Feed>} />
      <Route path="/profile/:id" element={<Profile/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/profile/edit' element={<EditProfile/>} />
      <Route path='/settings' element={<EditProfile/>} />
      <Route path='/question/:id' element={<Question/>} />
      {/* <Route path='/question/:id/edit' element={<EditQuestion/>} /> */}
      <Route path='/question' element={<Question/>} />
      <Route path='/article/:id' element={<Article/>} />
      <Route path='/article' element={<Article/>} />
      <Route path='/tag/:tagId' element={<Tag/>} />
      <Route path='/tag' element={<Tag/>} />
      {/* <Route path='/organization' element={} /> */}
      <Route path='/post/article' element={<CreateArticle/>} />
      <Route path='/test' element={<Test/>} />
      <Route path="*" element={<Test/>} />
      </Routes>
      </CookiesProvider>
  );
};
export default App;
