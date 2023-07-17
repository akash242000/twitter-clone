import React from 'react'
import TweetPopup from './TweetPopup'
import { usePosts } from '../postsContex'

export default function EditBox() {

    const {editValues} = usePosts()
  return (
    <TweetPopup edit id={editValues.id} oldCaption={editValues.caption} oldImage={editValues.image}/>
  )
}
