import React from 'react'
import im from "../log.jpg"
import { CloudUploadFill,X, ChatDots,PencilSquare} from 'bootstrap-icons-react';
import { Trash} from 'bootstrap-icons-react';

const Comment = ({author,postedOn,comment}) => {
  return (
    <div style={{display:'flex',width:'100%',height:'8rem',backgroundColor:'white',padding:'1rem',borderBottom:'1px solid black',borderRadius:'2px',color:"black"}}>
      <img src={im} alt="no Image" style = {{width:'2rem',height:'2rem',borderRadius:'1000rem'}} />
        <div style={{paddingLeft:'1rem',width:'100%'}}>
            <div style={{display:'flex',gap:'1rem',marginBottom:'1rem',alignItems:''}}>
                <p style={{fontWeight:'bold',fontSize:"1.2rem",color:"#008B8B"}}>{author}</p>
                <p style={{color:'gray',fontWeight:'bold'}}>{postedOn}</p>
            </div>
            <p style={{color:"gray"}}>{comment}</p>
            <div style={{display:'flex',width:'100%',marginTop:'1.6rem',flexDirection:'row-reverse',gap:'1rem'}}>
                <PencilSquare />
                <Trash />
            </div>
        </div>
    </div>
  )
}

export default Comment
