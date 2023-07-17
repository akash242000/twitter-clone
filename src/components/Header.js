import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Link} from 'react-router-dom'

export default function Header({title, more}) {
  return (
    <div className="header">
        <Link to={'..'}><KeyboardBackspaceIcon/></Link>
            <div className="back-btn">
            <h2>{title}</h2>
            {more && <p>{more} Tweets</p>}
        </div>
    </div>
  )
}
