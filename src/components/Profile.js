import React, { useEffect,useState } from 'react'
import { usePosts } from '../postsContex'
import { useParams } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import Post from './Post'
import Loading from './Loading';
import Header from './Header';



export default function Profile() {

    const {getProfileWithID, posts,profiles,getPosts,handleFollowed} = usePosts();
    let location= useParams();

    const [currentProfile, setProfile] = useState([]);
    const [currentTab, setCurrentTab]= useState("tweet");

    const [tweetPosts, setTweetPosts] = useState([]);
    const [likedPosts, setlikedPosts] = useState([]);

    const [isLoading, setLoading] = useState(false);

    const [data, setData] = useState([])




    useEffect(()=>{
      setLoading(true)
        getProfileWithID(location.username).then((res)=>{
            setProfile(res);
            setLoading(false)
        });
    },[location.username,currentTab]);

    useEffect(()=>{
      getProfileWithID(location.username).then((res)=>{
        setProfile(res);
    });
    },[profiles])

    useEffect(()=>{

      currentProfile.postIDs && 
        setTweetPosts(posts.filter((post)=>{
          return currentProfile.postIDs.includes(post.id);
         }));


         currentProfile.likedPosts &&
        setlikedPosts(posts.filter((post)=>{
          return currentProfile.likedPosts.includes(post.id);
        }))

        
    },[currentProfile,posts,currentTab])


  return (
    <>


    {/* <div className="header">
          <h2>{currentProfile.username}</h2>
          <p>{currentProfile.postIDs && currentProfile.postIDs.length} Tweets</p>
    </div> */}

    <Header title={currentProfile.username} more={currentProfile.postIDs && currentProfile.postIDs.length}/>


    <div className='profile-box'>
        <div className="cover-section">

          <div className="cover-photo-bg" style={{background:`top / cover no-repeat url(${currentProfile.cover}), var(--light-gray)`}}>
            <img className='cover-photo' src="" alt="" />
          </div>

          <div className="profile-actions">
            <img className='avatar-big' src={currentProfile.avatar} alt="" />

            {currentProfile.userID!=="akashsathawane" && <button className={`btn-follow-common ${currentProfile.followed?'btn-followed':"btn-follow"}`}onClick={()=>{handleFollowed(currentProfile.id, currentProfile.followed)}} >{currentProfile.followed?`Follow`:"Followed"}</button>}
          </div>

        </div>

      
        <div className="profile-header">  
            <div className="handle-info">
                <div className="usernames">
                  <h4>{currentProfile.username}</h4>
                  <span className='verified-badge'><VerifiedIcon/></span> 
              </div>
                    
                <p id='username'>@{currentProfile.userID}</p>
              </div>

            <div className="bio-box">
                {currentProfile.bio}
            </div>

            <div className="follower-following">
              <span className='f-count-wrapper'> <span className='f-count-head'>68</span> Following</span>
              <span className='f-count-wrapper'> <span className='f-count-head'>{currentProfile.followers}</span> Followers</span>
            </div>
        </div>  
    </div>


    <div className="profile-nav">
      <div className={`tweets profile-nav-item  ${currentTab=='tweet'?"profile-nav-item-active":""}`} onClick={()=>{setCurrentTab('tweet')}}>
          Tweets
      </div>

      {likedPosts.length>0 &&
        <div className={`likes profile-nav-item ${currentTab=='liked'?"profile-nav-item-active":""}`} onClick={()=>{setCurrentTab('liked')}}>
          Likes
      </div>}
    </div>

    {isLoading?<Loading/>
    :
    <>

      {
        
        currentTab==='tweet'?
        <>
          {
            tweetPosts.map((post,index)=>{
              return <Post key={index} id={post.id} name={post.name} username={post.username} caption={post.caption} avatar={post.avatar} image={post.image} verified={post.verified} liked={post.liked} likes={post.likes} views={post.views} />
            })
          }
        </>
        :
        <>
          {
            likedPosts.map((post,index)=>{
              return <Post key={index} id={post.id} name={post.name} username={post.username} caption={post.caption} avatar={post.avatar} image={post.image} verified={post.verified} liked={post.liked} likes={post.likes} views={post.views} />
            })
          }
        </>

      }
    </>

    }
    </>
  )
}
