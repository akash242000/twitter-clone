import React, { useEffect } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Hashtag from './Hashtag';
import FollowCard from './FollowCard';
import { usePosts } from '../postsContex';
import { numberFormatter } from '../utils';

export default function Widgets() {

  const {profiles, getProfiles} = usePosts();

  useEffect(()=>{
    getProfiles();
  },[])

  return (
    <div className='widgets'>
      <div className="search-sec-wrapper">
        <div className="search-section">
          <SearchOutlinedIcon/>
          <input type="text" className='serach-box' placeholder='Search Twitter' />
        </div>
      </div>

      <div className="card">
        <h3>What’s happening</h3>

        <Hashtag category={"Entertainment"} hashtag={"#Prabhas"} tweets={numberFormatter.format(1645)} />
        <Hashtag category={"Fashion"} hashtag={"#RRR"} tweets={"513"} />
        <Hashtag category={"Bollywood"} hashtag={"#Adipurush"} tweets={"13k"} />
        <Hashtag category={"India"} hashtag={"#Modi"} tweets={"7,813"} />
        <Hashtag category={"Politics"} hashtag={"#Maharashtra"} tweets={"3"} />

      </div>


      <div className="card">
        <h3>Who to follow</h3>

        {profiles.map((profile)=>{
          if(!profile.admin){
            return <FollowCard 
                    followed={profile.followed} 
                    id={profile.id} 
                    key={profile.id} 
                    name={profile.username} 
                    username={profile.userID} 
                    avatar={profile.avatar} 
                    admin={profile.admin}
                    />
                    }
        })}
      </div>

      <div className="credits-section">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
          <p>Accessibility</p>
          <p>Ads info</p>
          <p>More</p>
          <p>© 2023 X Corp.</p>
      </div>
    </div>
  )
}
