import React from 'react'
import TweetBox from './TweetBox'
import Post from './Post'
import Loading from './Loading'
import { usePosts } from '../postsContex'
import TweetPopup from './TweetPopup'
import EditBox from './EditBox'

export default function HomeFeed({data,isLoading,currentProfile}) {

  const {tweetPopup, editMode} = usePosts()

  return (
    <div>
        {tweetPopup && <TweetPopup/>}
        {editMode && <EditBox/>}


        <div className="header">
          <h2>{"Home"}</h2>
        </div>

        <div className="feed">

                {isLoading?
                    <Loading/>
                :
                <>
                    <div>
                    <TweetBox/>
                        {
                            data && data.map((post,index)=>{
                            return <Post key={index} id={post.id} name={post.name} views={post.views} username={post.username} caption={post.caption} avatar={post.avatar} image={post.image} verified={post.verified} liked={post.liked} likes={post.likes} userID={post.userID} />
                            })
                        }
                    </div>      
                </>
                } 
        </div>


      
    </div>
  )
}
