import { Email, Notifications, Person, Settings } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Button, Container, FormControl, FormControlLabel, FormLabel, IconButton, List, ListItem, makeStyles, Radio, RadioGroup, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPost from '../../utils/useAxiosPost';
import ArticleThumbnail from '../Article/ArticleThumbnail';
import ProfileAvatar from '../Profile/ProfileAvatar';
import ProfileMessages from '../Profile/ProfileMessages';
import ProfileNotifications from '../Profile/ProfileNotifications';
import QuestionThumbnail from '../Question/QuestionThumbnail';
import {SearchBar } from '../SearchBar/SearchBar';
import './Navbar.css';

interface SearchInfo {
  searchString: string,
  resultItems? : {ID: number, USERNAME: string}[]
}

export default function Navbar() {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["token", "username"]);
    const [clicked, setClicked] = useState(false);
    const [searchInfo,setSearchInfo]= useState<SearchInfo>({searchString:''});
    const [showNotifs,setShowNotifs] = useState(false) ;
    const [showMessages,setShowMessages] = useState(false);
    const [searchType, setSearchType] = useState('question');

    const handleChangeSearchType = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInfo({...searchInfo,searchString:''});
      setSearchType((event.target as HTMLInputElement).value);
    };
  
    const handleClick = () => {
      setClicked(!clicked);
    };
    const pages = ["Feed", "Question", "Article", "tag"];
    const settings = ["Profile", "Account", "Dashboard", "Logout"];

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
      null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
      null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page: string) => {
      console.log(page);
      navigate("/" + page.toLowerCase());
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };


    useAxiosPost( (responseData:any) => {
      setSearchInfo({...searchInfo, resultItems: responseData});
    },`/${searchType}/search`,searchInfo,cookies.token,[searchInfo.searchString]) ;

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="navbar" position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
                onClick={() => navigate("/")}
              >
                CoreDumped
              </Typography>
              {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={()=>handleCloseNavMenu(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box> */}
              <Box sx={{ minWidth: "400px" }}>
                <SearchBar
                  searchString={searchInfo.searchString}
                  setSearchString={(s: string) =>
                    setSearchInfo({ ...searchInfo, searchString: s })
                  }
                >
                  <List>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        SearchWhat?
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={searchType}
                        onChange={handleChangeSearchType}
                      >
                        <FormControlLabel
                          value="question"
                          control={<Radio />}
                          label="Question"
                        />
                        <FormControlLabel
                          value="article"
                          control={<Radio />}
                          label="Article"
                        />
                        <FormControlLabel
                          value="profile"
                          control={<Radio />}
                          label="Profile"
                        />
                      </RadioGroup>
                    </FormControl>
                    {searchInfo.resultItems?.map((item) => {
                      return (
                        <ListItem
                          className="search-dropdown-item"
                          key={item.ID}
                        >
                          {searchType === "question" && (
                            <QuestionThumbnail
                              key={"navbar-sr-q" + item.ID}
                              id={item.ID}
                            />
                          )}
                          {searchType === "article" && (
                            <ArticleThumbnail
                              key={"navbar-sr-a" + item.ID}
                              id={item.ID}
                            />
                          )}
                          {searchType === "profile" && (
                            <ProfileAvatar
                              key={"navbar-sr-p" + item.USERNAME}
                              username={item?.USERNAME}
                            />
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                </SearchBar>
              </Box>
              <Link className="nav-links" to={`/profile/${cookies.username}`}>
                <Person></Person>
              </Link>
              <Link className="nav-links" to="/settings">
                <Settings></Settings>
              </Link>
              {/* <Link className="nav-links" to="/messages">
              </Link> */}
              <Box position="relative">
                <IconButton onClick={() => setShowMessages(!showMessages)}>
                  <Email className="nav-links"></Email>
                </IconButton>
                {showMessages && (
                  <ProfileMessages username={cookies.username} />
                )}
              </Box>

              {/* <Link className='nav-links' to='/notifications'>
                <Notifications></Notifications>
              </Link> */}
              <Box position="relative">
                <IconButton onClick={() => setShowNotifs(!showNotifs)}>
                  <Notifications className="nav-links"></Notifications>
                </IconButton>
                {showNotifs && (
                  <ProfileNotifications username={cookies.username} />
                )}
              </Box>
              {cookies.token && (
                <Button
                  variant="contained"
                  className="btn"
                  onClick={() => {
                    setCookies("token", "");
                    setCookies("username", "");
                  }}
                >
                  Log out
                </Button>
              )}
              {!cookies.token && (
                <>
                  {" "}
                  {/* <Link to="/login"> */}
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={() => navigate("/login")}
                    className="btn"
                  >
                    Login
                  </Button>
                  {/* </Link> */}
                  {/* <Link to="/register"> */}
                  <Button
                    className="btn"
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                  {/* </Link> */}
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    );
}

