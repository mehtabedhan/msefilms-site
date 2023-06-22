import React, { useEffect, useState } from 'react'
import { getCollectionData } from '../../utils/apiFunctions'

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
              
              <div key={item.id} className="aspect-w-16 aspect-h-9">
              <iframe src={"https://www.youtube.com/embed/"+item.link.split('=')[1]+"?start="+item.startAt} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            )
        })}
   

        
    </div>
      ):(<></>)}
    </>
  )
}

export default Videos