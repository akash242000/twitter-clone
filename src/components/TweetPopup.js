import React, { useEffect } from 'react'
import { usePosts } from '../postsContex'
import { useState, useRef } from 'react';
import Avatar from './Avatar';

export default function TweetPopup({edit, id, oldCaption, oldImage}) {

  const {setTweetPopup,addPost,setEditMode,editMode,handleEdit} = usePosts();


  const captionref= useRef();
  const imageRef= useRef();



  const [caption, setCaption] = useState('');
  const [image,setImage]= useState('');

  useEffect(()=>{
    if(editMode){
      setCaption(oldCaption);
      setImage(oldImage)
    }
  },[])

  

  function handleCaptionOnchange(event){
      setCaption((prevCaption)=> prevCaption=event.target.value);

  }

  function handleImageOnChange(event){
      setImage((prevImage)=> prevImage=event.target.value);
  }

  function handleSubmit(event){
      event.preventDefault()


        if(!editMode){
                addPost({
                    caption:captionref.current.value,
                    image:imageRef.current.value
                    });

                  setCaption("");
                  setImage("");

                  setTweetPopup(false);
                }
          else{
            handleEdit(id, caption, image)
          }
  }

  return (
    <div className='tweet-popup-bg'>
      <div className="tweet-popup">

        <div className="close-btn-box">
          <button className='btn-close' onClick={()=>{setTweetPopup(false);setEditMode(false)}}>✖</button>
        </div>
        
        <div className="main-input-container">
        <Avatar src="https://scontent.fnag5-1.fna.fbcdn.net/v/t1.6435-9/81451880_2482503601987780_6307375596930334720_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Z12iI1WyrskAX-Hv1Yv&_nc_ht=scontent.fnag5-1.fna&oh=00_AfAJXWjQN9jUAEYLYFGdYPXMXTG7nBQRQvfsXU2VraCj7w&oe=64CDF432"/>

          <div className="input-container">
            <textarea type="text" className='tweetBoxInput' value={caption} ref={captionref} onChange={handleCaptionOnchange}  placeholder='Whats happening?' />
            <input type="text" className='input-url-small' value={image} ref={imageRef} onChange={handleImageOnChange}  placeholder='Enter Image URL' />
          </div>
        </div>

        <div className="tweet-input-box-footer">
          <div className="input-more-box">

          </div>
          <button className='btn btn-small' disabled={caption.length<5 || caption.length>200} onClick={handleSubmit} >{editMode?`Edit`:`Tweet`}</button>
        </div>

      </div>
    </div>
  )
}
