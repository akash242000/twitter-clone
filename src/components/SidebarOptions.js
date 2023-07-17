import React from 'react'

export default function SidebarOptions({active,optionIcon, option}) {
  return (
    <div className={`sidebar-options ${active && 'sidebar-option-active'}`}>
      <span className='sidebar-icon'>{optionIcon}</span>
      <span className='sidebar-option-name' >{option}</span>
    </div>
  )
}
