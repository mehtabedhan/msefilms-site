import React, { useEffect, useState } from 'react'
import { getCollectionData } from '../../utils/apiFunctions'
import ReactPlayer from 'react-player'
import { MdSearch } from 'react-icons/md'
import { categories } from '../../data'

const Videos = () => {
  const [videos, setVideos] = useState([])
  const [filteredVideos, setFilteredVideos] = useState([])
  
  useEffect(() => {
    getCollectionData('videos').then((val)=>{
      setVideos(val)
      setFilteredVideos(val)

    })    
  }, [])

  function filter(category){
    if(category=='all'){
      setFilteredVideos(videos)
    }
    else{
      var filteredVideos=[]
      videos.map((t)=>{
        if(t.category===category){
          filteredVideos.push(t)
        }
      })
      setFilteredVideos(filteredVideos)
    }
  }
  

  return (
    <>
      <div className="grid grid-cols-4 gap-3 p-4">

<button key='all' onClick={()=>filter('all')}  className='p-2 md:mx-8 lg:mx-20 text-lg bg-text-primary text-bg-primary font-extrabold rounded-lg bg-primary-700 hover:bg-text-secondary shadow-gray-600 shadow-md'>All</button>

{categories.map((c)=>{
return(

<button key={c.urlParamName} onClick={()=>filter(c.urlParamName)}  className='p-2 md:mx-8 lg:mx-20 text-lg bg-text-primary text-bg-primary font-extrabold rounded-lg bg-primary-700 hover:bg-text-secondary shadow-gray-600 shadow-md'>{c.name}</button>


)
})}

</div>


    {filteredVideos.length!=0?(
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10" >

        {filteredVideos.map((video)=>{
            return(
              
       <ReactPlayer key={video.id} width='360px' height='240px' url={video.videoURL}/>

            )
        }
        )}
   

        
    </div>
      ):(<></>)}
    </>
  )
}

export default Videos