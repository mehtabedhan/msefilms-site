import React, { useEffect, useState } from 'react'
import { getCollectionData } from '../../utils/apiFunctions'
import ReactPlayer from 'react-player'
import { MdSearch } from 'react-icons/md'

const Videos = () => {
  const [videos, setVideos] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredVideos, setFilteredVideos] = useState([])
  
  useEffect(() => {
    getCollectionData('videos').then((val)=>{
      setVideos(val)
      setFilteredVideos(val)

    })    
  }, [])
  
 

   function find(items, text) {
    text = text.split(' ');
    return items.filter(item => {
      return text.every(el => {
        return item.includes(el);
      });
    });
  }

  function getList(name) {
    var splitList = name.split(" ");

  var indexList = [];

for (var i = 0; i < splitList.length; i++) {
 for (var y = 1; y < splitList[i].length + 1; y++) {
  indexList.push(splitList[i].substring(0, y).toLowerCase());
}}

return indexList
  }

  return (
    <>
     <div className='flex items-center justify-center'>
     <div className='py-2 border-b border-gray-300 gap-2 bg-bg-secondary rounded-md p-2'>
           
            <input type="text" required value={searchText} placeholder ='' onChange={(e)=>{
              setSearchText(e.target.value)
            }} 
            className="text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-500 text-textColor" />
            
            
             <button
             onClick={()=>{
              
              if(searchText==''){
                setFilteredVideos(videos)
              }
              else{
                var vds=[]
                var v=[]

              videos.forEach((video)=>{
                var list=video.keywords.concat(getList(video.description))
                v=find(list,searchText.toLowerCase())
                if(v.length!=0){
                  vds.push(video)
                }
              })
              console.log(vds)
              setFilteredVideos(vds)
              }
              
             }}
             >
              
            <MdSearch className='text-xl text-gray-700'/>
            </button>
          </div>
     
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