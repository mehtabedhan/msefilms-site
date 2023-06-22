import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { categories } from '../../data'
import { getCollectionData, getFeaturedData } from '../../utils/apiFunctions'

const Projects = () => {
    const [projects, setProjects] = useState([])
    const [projectsByCategory, setProjectsByCategory] = useState([])

    useEffect(() => {
    
        
      getCollectionData('projects').then((val)=>{
        setProjects(val)
        setProjectsByCategory(val)

      })
  }, [])



  function filter(category){
    if(category=='all'){
      setProjectsByCategory(projects)
    }
    else{
      var filteredProjects=[]
      projects.map((t)=>{
        if(t.category===category){
          filteredProjects.push(t)
        }
      })
      setProjectsByCategory(filteredProjects)
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

{projectsByCategory.map((item)=>{
                  return(
                    <div  key={item.id} className="container p-3 bg-bg-secondary shadow-lg shadow-gray-900 hover:cursor-pointer hover:bg-bg-primary">
                       <Link href={'/project/'+item.id} >
                        <div>
                          <div>
                           <Image width='400' height='400'   src={item.coverPhotoURL}
                       className='rounded-md' alt=""/>
                          </div>

                          <div className='pt-4'>
                          <p key={item.title}  className="mb-2 flex justify-center font-bold text-text-primary lg:mb-4 text-md lg:text-xl">
                           {item.title}</p>

                           <p key={item.highlights[0]}  className="mb-2 flex justify-center font-light text-text-primary lg:mb-4 text-sm lg:text-lg">
                            {item.highlights[0]}</p>
                          

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

export default Projects