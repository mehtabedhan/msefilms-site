import React, { useEffect, useState } from 'react'
import { getCollectionData } from '../../utils/apiFunctions'

const Photos = () => {
    const [photos, setPhotos] = useState([])


    useEffect(() => {        
      getCollectionData('photos').then((val)=>{
        setPhotos(val)
      })
  }, [])


  return (
    <>
    {photos.length!=0?(
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">

        {photos.map((item)=>{
            return(
             <div key={item.id} className='p-5'>
               <iframe src={item.url+"/embed/"}width="400" height="400" allowtransparency="true"></iframe>
              </div>

            )
        })}
   

        
    </div>
      ):(<></>)}
    </>
  )
}

export default Photos