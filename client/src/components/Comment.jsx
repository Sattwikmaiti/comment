import React from 'react'

const Comment = ({author,postedOn,comment}) => {
  return (
    <div style={{display:'flex',width:'100%',height:'8rem',backgroundColor:'white',padding:'1rem',borderBottom:'1px solid black',borderRadius:'2px',color:"black"}}>
      
        <div style={{paddingLeft:'1rem',width:'100%'}}>
            <div style={{display:'flex',gap:'1rem',marginBottom:'1rem',alignItems:''}}>
                <p style={{fontWeight:'bold',fontSize:"1.2rem",color:"#008B8B"}}>{author}</p>
                <p style={{color:'gray',fontWeight:'bold'}}>{postedOn}</p>
            </div>
            <p style={{color:"gray"}}>{comment}</p>
            <div style={{display:'flex',width:'100%',marginTop:'1.6rem',flexDirection:'row-reverse',gap:'1rem'}}>
                Updates
                Deletes
            </div>
        </div>
    </div>
  )
}

export default Comment
