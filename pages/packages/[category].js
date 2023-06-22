import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Loader, ProjectsByCategorySection } from '../../components'
import { categories } from '../../data'
import { getCollectionData, getDataByCategory, getFeaturedData } from '../../utils/apiFunctions'
import ProjectsByCategory from '../projects/[category]'

const PackagesByCategory = ({packages}) => {
  const router=useRouter();

  if(router.isFallback){
      return <Loader/>
  }
 
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">

{packages.map((item)=>{
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

    {packages.length!=0?(<ProjectsByCategorySection title={'Our Recent Projects for this Category'} category={packages[0].category}/>):(<></>)}

    </div>
    
  )
}
export async function getStaticProps({params}){
  const data=await getDataByCategory(params.category,'packages');

  return {
    props:{packages:data}
  }
}

export async function getStaticPaths(){
  var p=[]
  categories.map((val)=>{
    p.push('/packages/'+val.urlParamName)
  })

  return {
      paths:p,
      fallback:true
  }
}

export default PackagesByCategory