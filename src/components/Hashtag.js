import React from 'react'

export default function Hashtag({category,hashtag,tweets}) {
  return (
    <div className='hashtag-wrapper'>
      <p className='small-text'>{category}</p>
      <h4>{hashtag}</h4>
      <p className='small-text'>{tweets} tweets</p>
    </div>
  )
}
