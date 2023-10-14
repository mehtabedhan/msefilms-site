import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { categories } from '../../data'
import { getCollectionData } from '../../utils/apiFunctions'

const Films = () => {
    const [films, setFilms] = useState([])
    const [filmsByCategory, setFilmsByCategory] = useState([])

    useEffect(() => {
    
        
      getCollectionData('films').then((val)=>{
        setFilms(val)
        console.log(val)

        setFilmsByCategory(val)

      })
  }, [])



  function filter(category){
    if(category=='all'){
      setFilmsByCategory(films)
    }
    else{
      var filteredfilms=[]
      films.map((t)=>{
        if(t.category===category){
          filteredfilms.push(t)
        }
      })
      setFilmsByCategory(filteredfilms)
    }
  }

  function toDateTime(date) {
    var t = new Date(1970, 0, 1);
    
    t.setSeconds(date/1000);
    
   var year= t.getFullYear()
  
    return year;
  }
  
  
  
  return (

    <div>
       <div className="grid grid-cols-4 gap-3 p-4">

                        <button key='all' onClick={()=>filter('all')}  className='p-2 md:mx-8 lg:mx-20 text-lg bg-text-primary text-bg-primary font-extrabold rounded-lg bg-primary-700 hover:bg-text-secondary shadow-gray-600 shadow-md'>All Films</button>

                        {categories.map((c)=>{
                        return(

                        <button key={c.urlParamName} onClick={()=>filter(c.urlParamName)}  className='p-2 md:mx-8 lg:mx-20 text-lg bg-text-primary text-bg-primary font-extrabold rounded-lg bg-primary-700 hover:bg-text-secondary shadow-gray-600 shadow-md'>{c.name}</button>


                        )
                        })}

                        </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-10">
          {filmsByCategory.map((item)=>{
                  return(
                    <div  key={item.id} className="container p-3 bg-bg-secondary shadow-lg shadow-gray-900 hover:cursor-pointer hover:bg-bg-primary">
                       <Link href={'/film/'+item.id} >
                        <div>
                          <div className='flex justify-center'>
                           <Image width='400' height='400'   src={item.posterURL}
                       className='rounded-md' alt=""/>
                          </div>

                          <div className='pt-4'>
                          <p className="mb-2 flex justify-center font-bold text-text-primary lg:mb-4 text-md lg:text-xl">
                          {item.title}</p>
                          
                          <p className="mb-2 flex justify-center font-light text-text-primary lg:mb-4 text-sm lg:text-lg">
                          {toDateTime(item.releaseDateTimestamp)}</p>
                          {
                            Object.keys(item.credits).reverse().slice(0,2).map((val)=>{
                              return(
                                <div key={val} className='flex justify-center'>
                                <p className="mb-2 mr-2 flex justify-center font-light text-text-primary lg:mb-4 text-sm lg:text-lg">
                                {val+" :"}</p> 
                                <p className="mb-2 flex justify-center font-medium text-text-primary lg:mb-4 text-md lg:text-xl">
                                {item.credits[val]}</p> 
                            </div>
                              )
                            })
                          }

                          

                          </div>
                       


                        </div>
                    </Link>

                    </div>

              
                  )
              })}


  </div>

    </div>
    
  )
}

export default Films