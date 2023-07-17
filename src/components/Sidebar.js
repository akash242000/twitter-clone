import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';

import HomeIcon from '@mui/icons-material/Home';
import SidebarOptions from './SidebarOptions';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {Link,useLocation } from 'react-router-dom'
import { usePosts } from '../postsContex';
import AddIcon from '@mui/icons-material/Add';

export default function Sidebar() {

  const location = useLocation();

  const {setTweetPopup} = usePosts();

  return (
    <div className='sidebar'>
        <div className="twitter-logo"><TwitterIcon/></div>

        <div className="sidebar-options-list">

          <Link to='/'>
            <SidebarOptions optionIcon={<HomeIcon/>} option={"Home"} active={location.pathname==='/' || location.pathname===''} />
          </Link>

          <Link to='/explore'>
            <SidebarOptions optionIcon={<SearchIcon/>} option={"Explore"}  active={location.pathname==='/explore'}/>
          </Link>

          <Link to='/notifications'>
            <SidebarOptions optionIcon={<NotificationsNoneOutlinedIcon/>} option={"Notifications"} active={location.pathname==='/notifications'} />
          </Link>

          <Link to={'/messages'} className='messages'>
            <SidebarOptions optionIcon={<EmailOutlinedIcon/>} option={"Messages"} active={location.pathname==='/messages'}  />
          </Link>

          <Link to={'/bookmarks'} className='bookmarks'>
            <SidebarOptions optionIcon={<BookmarkBorderOutlinedIcon/>} option={"Bookmarks"} active={location.pathname==='/bookmarks'} />
          </Link>

          <Link to={'/lists'} className='lists'>
            <SidebarOptions optionIcon={<ReorderOutlinedIcon/>} option={"Lists"} active={location.pathname==='/lists'} />
          </Link>

          <Link to={`/${"XWbY0SaECyg0HKbujeO9"}`}>
            <SidebarOptions optionIcon={<PersonOutlineOutlinedIcon/>} option={"Profile"} active={location.pathname==='/XWbY0SaECyg0HKbujeO9'}  />
          </Link>

          <Link to={'/more'} className='more'>
            <SidebarOptions optionIcon={<MoreHorizOutlinedIcon/>} option={"More"} active={location.pathname==='/more'} />
          </Link>

        </div>  

        <div className="tweet-button-wrapper">
            <button className='btn btn-primary btn-add-desktop' onClick={()=>{setTweetPopup(true)}}>Tweet</button>
            <button className='btn sidebar-icon btn-add-mobile' onClick={()=>{setTweetPopup(true)}}><AddIcon/></button>
        </div>

    </div>
  )
}
