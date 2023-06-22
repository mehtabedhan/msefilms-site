import React, { useEffect, useState } from 'react'
import { getProjectsByPackage } from '../utils/apiFunctions'
import Link from 'next/link'
import Image from 'next/image'

const ProjectsByPackageSection = ({pck}) => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
      
    getProjectsByPackage(pck).then((val)=>{
      console.log(val)
      setProjects(val)
    })
},[] )
  return (
    <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
            <h2 className="mb-8 text-2xl font-extrabold tracking-tight leading-tight text-center text-text-secondary lg:mb-16 md:text-4xl">
                Our Recent Projects for this Package
                </h2>
            {projects.length!=0?(
              <div className="grid grid-cols-2 gap-4 text-text-primary sm:gap-12 md:grid-cols-3 lg:grid-cols-3">

              {projects.map((item)=>{
                  return(
                    <div  key={item.id}>
                       <Link href={'/project/'+item.id}>
                         <Image width='300' height='300'   src={item.coverPhotoURL}
                       className='rounded-md shadow-lg shadow-gray-900 hover:cursor-pointer' alt=""/>

                    </Link>

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

export default ProjectsByPackageSection