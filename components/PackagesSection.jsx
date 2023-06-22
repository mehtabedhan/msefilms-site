import React, { useEffect, useState } from 'react'
import { getFeaturedData } from '../utils/apiFunctions'
import Link from 'next/link'
import { monthNames } from '../data'
import Image from 'next/image'

const PackagesSection = () => {
  const [packages, setPackages] = useState([])

  useEffect(() => {
  
      
    getFeaturedData('packages').then((val)=>{
      setPackages(val)
    })
}, [])

  return (
    <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
            <h2 className="mb-8 text-2xl font-extrabold tracking-tight leading-tight text-center text-text-secondary lg:mb-16 md:text-4xl">
                Our Packages
                </h2>
            {packages.length!=0?(
              <div className="grid grid-cols-2 gap-4 text-text-primary sm:gap-12 md:grid-cols-3 lg:grid-cols-3">

              {packages.map((item)=>{
                  return(
                    <div  key={item.id} className="container p-3 bg-bg-primary shadow-lg shadow-gray-900 hover:cursor-pointer">
                       <Link href={'/package/'+item.id}>
                        <div>
                          <div className='flex justify-center items-center'>
                           <Image width='300' height='300' src={item.coverPhotoURL}
                       className='rounded-md' alt=""/>
                          </div>

                          <div className='pt-4'>
                          <p key={item.title}  className="mb-2 flex justify-center font-bold text-text-primary lg:mb-4 text-md lg:text-xl">
                           {item.title}</p>
                          
                           {/* <p key={item.highlights[0]}  className="mb-2 flex justify-center font-light text-text-primary lg:mb-4 text-sm lg:text-lg">
                           {item.highlights[0]}</p> */}
                           

                          
                           

                          </div>
                       


                        </div>
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

export default PackagesSection