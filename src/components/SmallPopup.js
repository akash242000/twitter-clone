import React, { useEffect } from 'react'
import { usePosts } from '../postsContex';


export default function SmallPopup({onclose,id, caption, image}) {


    const {handleDelete,setEditMode,setEditValues} = usePosts()

    useEffect(()=>{
        function handleClickOutside(event){
            const popup = document.querySelector('.popup-sm');
            if(popup && !popup.contains(event.target)){
                onclose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    },[onclose]);


    function handleEdit(){
        setEditMode(true);
        const oldvalues={
            id:id,
            caption:caption,
            image:image
        }
        setEditValues(oldvalues);

        onclose();
    }




  return (
    <div className='popup-background'>
        <div className="popup-sm">
            <button className='btn-popup' onClick={handleEdit} >Edit</button>
            <button className='btn-popup' onClick={()=>{handleDelete(id); onclose()}}>Delete</button>
        </div>
    </div>
  )
}
