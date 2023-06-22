import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { categories } from '../../data'
import { getCollectionData } from '../../utils/apiFunctions'

const Packages = () => {
    const [packages, setPackages] = useState([])
    const [packagesByCategory, setPackagesByCategory] = useState([])


    useEffect(() => {
    
        
      getCollectionData('packages').then((val)=>{
        setPackages(val)
        setPackagesByCategory(val)
      })
  }, [])

  function filter(category){
    if(category=='all'){
      setPackagesByCategory(packages)
    }
    else{
      var filteredpackages=[]
      packages.map((t)=>{
        if(t.category===category){
          filteredpackages.push(t)
        }
      })
      setPackagesByCategory(filteredpackages)
    }
  }

  return (
     <div>  
             <div className="grid grid-cols-4 gap-4 lg:gap-12 p-4">

                <button key='all' onClick={()=>filter('all')}  className='mx-2 p-2 md:mx-16 lg:mx-20 text-lg bg-text-primary text-bg-primary font-extrabold rounded-lg bg-primary-700  hover:bg-text-secondary shadow-gray-600 shadow-md'>All</button>

              {categories.map((c)=>{
               return(
                
                <button key={c.urlParamName} onClick={()=>filter(c.urlParamName)}  className='p-2 md:mx-8 lg:mx-20 text-lg bg-text-primary text-bg-primary font-extrabold rounded-lg bg-primary-700 hover:bg-text-secondary shadow-gray-600 shadow-md'>{c.name}</button>

                
               )
              })}

              </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">

        {packagesByCategory.map((item)=>{
                  return(
                    <div  key={item.id} className="container p-3 bg-bg-secondary shadow-lg shadow-gray-900 hover:cursor-pointer hover:bg-bg-primary">
                      <Link href={'/package/'+item.id} >
                        <div>
                          <div className='flex justify-center items-center'>
                          <Image width='400' height='400'   src={item.coverPhotoURL}
                      className='rounded-md' alt=""/>
                          </div>

                          <div className='pt-4'>
                          <p key={item.title}  className="mb-2 flex justify-center font-bold text-text-primary lg:mb-4 text-md lg:text-xl">
                          {item.title}</p>
                              
                          {item.highlights.slice(0,3).map((i)=>{
                            return(
                                <p key={i}  className="mb-2 flex justify-center font-light text-text-primary lg:mb-4 text-sm lg:text-lg">
                            {i}</p>
                            )
                          })}
                          <p key="etc"  className="mt-4 mr-2 flex justify-end font-medium text-text-primary lg:mb-4 text-sm lg:text-lg">
                           ... know more</p>

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

export default Packages