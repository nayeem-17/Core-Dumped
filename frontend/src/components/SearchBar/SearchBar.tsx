import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useCookies } from 'react-cookie';
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from '@mui/icons-material/Search';

import QuestionThumbnail from '../Question/QuestionThumbnail';
import "./searchbar.css";
import { List, ListItem, Paper } from '@mui/material';

export interface SearchInfo {
    searchString: string,
    resultItems? : {ID: number, TYPE: string}[]
}
export const defaultSearchInfo: SearchInfo = {
  searchString: ''
};

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface SearchBarProps{
  searchString: string,
  setSearchString: (s: string) => void 
  children?: React.ReactNode
}

export function SearchBar({searchString,setSearchString,children}:SearchBarProps) {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchString}
        onChange={(e)=>setSearchString(e.target.value)}
      />
      { searchString && 
      (<Paper
          sx={{
            maxHeight: "300px",
            overflow: "auto",
            position: "absolute",
            width: "100%",
          }}
        >
          {children}
        </Paper>)
      }
    </Search>
  );
}