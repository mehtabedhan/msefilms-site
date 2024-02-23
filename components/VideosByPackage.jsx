import React, { useEffect, useState } from 'react'
import { getDataByCategory, getFeaturedData, getVideosByPackage } from '../utils/apiFunctions'

const VideosByPackage = ({pkg}) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
  
      
getVideosByPackage(pkg).then((val)=>{
      setVideos(val)
    })

}, [])


  return (
    <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
            <h2 className="mb-8 text-2xl font-normal leading-tight text-center text-text-secondary lg:mb-16 md:text-4xl">
              Related Work ...
                </h2>
            {videos.length!=0?(
              <div className="grid grid-cols-2 gap-4 text-text-primary sm:gap-12 md:grid-cols-3 lg:grid-cols-3">

              {videos.map((item)=>{
                  return(
                    <div key={item.id} className="aspect-w-16 aspect-h-9">
                    <iframe src={"https://www.youtube.com/embed/"+item.videoURL.split('=')[1]+"?start="+item.startAt} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                  )
              })}
         

              
          </div>
            ):(<></>)
          }

            
            
        </div>
    </section>

  )
}

export default VideosByPackage