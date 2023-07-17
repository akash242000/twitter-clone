import React, { useState } from 'react'
import Avatar from './Avatar'
import { usePosts } from '../postsContex';
import {Link} from 'react-router-dom'

export default function FollowCard({id, name, username, avatar, followed}) {

  const {handleFollowed} = usePosts();
  return (
    <div className='follow-card'>
      <Link to={`/${id}`}>
        <div className="personal-section">
            <Avatar src={avatar}/>
            <div className="name-section">
                <h4>{name}</h4>
                <p>{username}</p>
            </div>
        </div>
      </Link>  

      <button className={`btn-follow-common ${followed?'btn-followed':"btn-follow"}`}onClick={()=>{handleFollowed(id, followed)}} >{followed?`Follow`:"Followed"}</button>
    </div>
  )
}
