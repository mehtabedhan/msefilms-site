import React, { useEffect, useState } from 'react'
import { getCollectionData } from '../../utils/apiFunctions'
import { v } from '../../data'
import ReactPlayer from 'react-player'

const Videos = () => {
    const [videos, setVideos] = useState([])


    useEffect(() => {
    
        
      getCollectionData('videos').then((val)=>{
        setVideos(val)
      })
     

  }, [])


  return (
    <>
    {videos.length!=0?(
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">

        {videos.map((item)=>{
            return(
              
       <ReactPlayer key={item} width='480px' url={item}/>
            )
        }
        )}
   

        
    </div>
      ):(<></>)}
    </>
  )
}

export default Videos