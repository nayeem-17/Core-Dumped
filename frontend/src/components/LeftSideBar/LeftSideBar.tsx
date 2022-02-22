import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './LeftSideBar.css'

export default function LeftSideBar() {
    return <>
        <h3 className='leftsidebar-element'><Link className='link leftsidebar' to='/feed'>Feed</Link> </h3>   
        <h3 className='leftsidebar-element'><Link className='link leftsidebar' to='/profile'>Profile</Link></h3>
        <h3 className='leftsidebar-element'><Link className='link leftsidebar' to='/question'>Question</Link></h3>
        <h3 className='leftsidebar-element'><Link className='link leftsidebar' to='/article'>Article</Link></h3>
        <h3 className='leftsidebar-element'><Link className='link leftsidebar' to='/tag'>Tags</Link></h3>
    </>
}

function allyProps(index: number) {
    return {
        id:   `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}
interface LeftPanelProps {
    id : number;
}
export function LeftPanel({id}:LeftPanelProps) {
    const [value,setValue] = React.useState(id);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        // console.log(event.);
        setValue(newValue);
        
    }
    return (<>
    <Box sx={{flexGrow:1,bgcolor:'background.paper', diplay:'flex', height:224}}>
        <Tabs
            orientation='vertical'
            value={value}
            onChange={handleChange}
            aria-label="Left Panel"
            sx={{borderRight:1,borderColor:'divider'}}
        >
            <Tab className="leftsidebar-element" component={Link} label='Feed' to="/feed" {...allyProps(0)}></Tab>
            <Tab className="leftsidebar-element" component={Link} label='Questions' to="/question" {...allyProps(2)}/>
            <Tab className="leftsidebar-element" component={Link} label='Articles' to="/article" {...allyProps(3)}/>
            <Tab className="leftsidebar-element" component={Link} label='Profile' to="/profile" {...allyProps(1)}/>
            <Tab className="leftsidebar-element" component={Link} label='Tags' to="/tag" {...allyProps(4)}/>
        </Tabs>

        
    </Box>

    </>)
}