import React from 'react'

export default function Avatar({src}) {
  return (
    <div className="avatar-img-wrapper">
      <img className='avatar-img' src={src} alt="" />
    </div>

  )
}
