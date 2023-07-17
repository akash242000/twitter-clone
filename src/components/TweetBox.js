import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import { usePosts } from '../postsContex';

export default function TweetBox() {

    const {addPost} = usePosts();

    const captionref= useRef();
    const imageRef= useRef();



    const [caption, setCaption] = useState('');
    const [image,setImage]= useState('');


    function handleCaptionOnchange(event){
        setCaption((prevCaption)=> prevCaption=event.target.value);

    }

    function handleImageOnChange(event){
        setImage((prevImage)=> prevImage=event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault()


        addPost({
            caption:captionref.current.value,
            image:imageRef.current.value
          });

          setCaption("");
          setImage("");

    }





  return (
    <div className='tweetBox'>
        <form>
            <div className="tweet-box-header">
                <Avatar src="https://scontent.fnag5-1.fna.fbcdn.net/v/t1.6435-9/81451880_2482503601987780_6307375596930334720_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Z12iI1WyrskAX-Hv1Yv&_nc_ht=scontent.fnag5-1.fna&oh=00_AfAJXWjQN9jUAEYLYFGdYPXMXTG7nBQRQvfsXU2VraCj7w&oe=64CDF432"/>
                <div className="tweet-textarea-container">
                    <textarea className='tweetBoxInput' ref={captionref} type="text" placeholder='Whats happening?' name='caption' value={caption} onChange={handleCaptionOnchange} />

                </div>
            </div>
            <div className="post-section">
                <div className="inputs">
                    <input className='input-url-small' ref={imageRef} type="text" placeholder='Enter Image URL' name='image' value={image} onChange={handleImageOnChange} />
                </div>
                <button className='btn btn-small' disabled={caption.length<5 || caption.length>200} onClick={handleSubmit} >Tweet</button>
            </div>
        </form>
    </div>
  )
}
