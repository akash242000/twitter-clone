import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import VerifiedIcon from '@mui/icons-material/Verified';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { usePosts } from '../postsContex';
import SmallPopup from './SmallPopup';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Link } from 'react-router-dom'
import { numberFormatter } from '../utils';



export default function Post({id, userID, name,views, username, caption, avatar, image,verified, likes, liked, retweets, comments, openCommentsModal}) {
  
  const {handleLiked,getProfiles,handleDelete} = usePosts();
  const [popupSmall, setPopup] = useState(false);

  function handlePopup(){
    setPopup(true)
  }

  function handleClosePopup(){
    setPopup(false)
  }


  return (
    <div className='post'>

      {popupSmall?<SmallPopup onclose={handleClosePopup} id={id} caption={caption} image={image}/>:<></>}

      <div className="post-avatar">
        <Avatar src={avatar} />
      </div>

      <div className="post-body">
        <div className="post-header">

          <Link to={`/${userID}`}>
            <div className="personal-info" id='personal-info-desk'>
                <h3>
                    {name}
                </h3>
                {verified && <span className='verified-badge'><VerifiedIcon/></span>}
                
                {" "}<p id='username'>@{username}</p>
            </div>

            <div className="personal-info" id='personal-info-mbl' >
                <h3>
                    {name.length>10?name.slice(0,10)+"...":name}
                </h3>
                {verified && <span className='verified-badge'><VerifiedIcon/></span>}
                
                {" "}<p id='username'>@{username.length>10?username.slice(0,10)+"...":username}</p>
            </div>
          </Link>

   
            <div className="delete-edit-box">
              <button onClick={handlePopup} disabled={username!=="akashsathawane"} className='more-btn'><MoreHorizIcon/></button>
            </div>
        </div>

        <div className="post-caption">
           {caption}
        </div>

        <div className="post-media">
          {
            image && <img src={image} alt="" />
          }
            
        </div>

        <div className="post-footer">
          <div className="button-box comment-button" onClick={openCommentsModal}>
            <ModeCommentOutlinedIcon onClick={getProfiles} />
            {comments && <div className='counter-display'>{comments.length}</div>}
          </div>

          <div className="button-box retweet-button">
            <RepeatOutlinedIcon/>
            {retweets && <div className='counter-display'>{retweets.length}</div>}
          </div>

          <div className={`button-box like-button ${liked? 'likeButton-fill':""}` }>
            {
              liked? <FavoriteIcon  className='likeButton-fill' onClick={()=>{handleLiked(id)}}/>
              :
              <FavoriteBorderOutlinedIcon onClick={()=>{handleLiked(id)}} />
            }
            
            {<div className='counter-display'>{likes}</div>}
  
          </div>

          <div className="button-box views-button">
            <EqualizerOutlinedIcon/>
            <div className='counter-display'>{numberFormatter.format(views)}</div>
          </div>
            

        </div>
      </div>
    </div>
  )
}
