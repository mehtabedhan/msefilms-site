import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Loader } from '../../components'
import { categories } from '../../data'
import { getCollectionData, getDataByCategory, getFeaturedData } from '../../utils/apiFunctions'

const ProjectsByCategory = ({projects}) => {
  const router=useRouter();

  if(router.isFallback){
      return <Loader/>
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">

{projects.map((item)=>{
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
  )
}
export async function getStaticProps({params}){
  const data=await getDataByCategory(params.category,'projects');

  return {
    props:{projects:data}
  }
}

export async function getStaticPaths(){
  var p=[]
  categories.map((val)=>{
    p.push('/projects/'+val.urlParamName)
  })

  return {
      paths:p,
      fallback:true
  }
}

export default ProjectsByCategory