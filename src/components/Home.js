import { useState, useEffect } from 'react'
import TweetBox from './TweetBox'
import Post from './Post'
import { usePosts } from '../postsContex'
import Loading from './Loading'
import Profile from './Profile'
import {Routes, Route} from 'react-router-dom'
import HomeFeed from './HomeFeed'
import Explore from './Explore'
import Notifications from './Notifications'
import Messages from './Messages'
import Bookmarks from './Bookmarks'
import Lists from './Lists'
import More from './More'



export default function Home() {

  const {posts, getPosts, editMode} = usePosts();
  
  const [data,setData] = useState([]);

  const [isLoading, setLoading] = useState(false);
  // const [isNewPostLoading, setNewPostLoading]= useState(false);

  const [prevPostCount, setprevPostCount] = useState(0);

  const [currentProfile, setCurrentProfile] = useState("LPyuimxQyPxWgg2Zx1Uy");



    useEffect(()=>{
      setLoading(true);
        getPosts().then((res) => {
          setData(res);
          setLoading(false);
          setprevPostCount(res.length)
        });
   
    },[]);

    useEffect(() => {

   
      setData(posts);
      // const e= document.querySelector('.post');
      // if(e && prevPostCount < posts.length){
      //   e.classList.add('post-bg-color');

      //   setTimeout(()=>{
      //     e.classList.remove('post-bg-color')
      //   },1000)
      // }

    }, [posts,prevPostCount,editMode]);

  

  return (
    
    <div className='home'>

      <Routes>
        <Route path='/' element={<HomeFeed data={data}  isLoading={isLoading} currentProfile={currentProfile}/>} />
        <Route path='/:username' element={<Profile/>} />
        <Route path='/explore' element={<Explore/>} />
        <Route path='/notifications' element={<Notifications/>} />
        <Route path='/messages' element={<Messages/>} />
        <Route path='/bookmarks' element={<Bookmarks/>} />
        <Route path='/lists' element={<Lists/>} />
        <Route path='/more' element={<More/>} />
      </Routes>

    </div>
  )
}
