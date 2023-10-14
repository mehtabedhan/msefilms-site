import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Loader } from '../../components'
import { categories } from '../../data'
import { getCollectionData, getDataByCategory, getFeaturedData } from '../../utils/apiFunctions'

const FilmsByCategory = ({films}) => {
  const router=useRouter();

  if(router.isFallback){
      return <Loader/>
  }
  function toDateTime(date) {
    var t = new Date(1970, 0, 1);
    
    t.setSeconds(date/1000);
    
   var year= t.getFullYear()
  
    return year;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">

{films.map((item)=>{
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
  )
}
export async function getStaticProps({params}){
  const data=await getDataByCategory(params.category,'films');

  return {
    props:{films:data}
  }
}

export async function getStaticPaths(){
  var p=[]
  categories.map((val)=>{
    p.push('/films/'+val.urlParamName)
  })

  return {
      paths:p,
      fallback:true
  }
}

export default FilmsByCategory