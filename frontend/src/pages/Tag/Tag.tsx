import { Paper, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LeftPanel } from '../../components/LeftSideBar/LeftSideBar';
import Navbar from '../../components/Navbar/Navbar';
import SearchTag from '../../components/Tag/SearchTag';
import TagCompact from '../../components/Tag/TagCompact';
import TaggedArticles from '../../components/Tag/TaggedArticles';
import TaggedQuestions from '../../components/Tag/TaggedQuestions';

export default function Tag () {
    const {tagId} = useParams() ;
    const [tabValue,setTabValue] = useState('question');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
      };
    if( tagId === undefined) {
        return <> 
        <Navbar/>
        <div className='container'>
            <Paper className='container-center' sx={{background:'var(--clr-gainsboro)'}}>
                <SearchTag/>
            </Paper>
            <div className='container-left'> 
                <LeftPanel id={4}/>
            </div>
            <div className='container-right'>

            </div>
        </div>
        </>
    }
    return (<>
        <Navbar/>
        <div className='container'>
            <Paper className='container-center'>
                <TagCompact id={parseInt(tagId+'')}></TagCompact>
                {tabValue==='question' && (<TaggedQuestions id={parseInt(tagId)}/>)} 
                {tabValue==='article' && (<TaggedArticles id={parseInt(tagId)} />)}
            </Paper>
            <div className='container-left'> 
                <LeftPanel id={4}/>
            </div>
            <Paper className='container-right'>
                <Tabs value={tabValue} onChange={handleChange} orientation="vertical">
                    <Tab value="question" label="Questions"></Tab>
                    <Tab value="article" label="Articles"></Tab>
                </Tabs>
            </Paper>
        </div>
    </>);
} 

