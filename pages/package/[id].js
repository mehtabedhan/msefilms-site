import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Loader, ProjectsByCategorySection } from '../../components';
import ProjectsByPackageSection from '../../components/ProjectsByPackageSection';
import { monthNames, whatsappNo } from '../../data';
import { getCollectionData, getDataById, getPackageDetails } from '../../utils/apiFunctions';

const PackageDetails = ({pck}) => {
  const router=useRouter();

  
  

  if(router.isFallback){
      return <Loader/>
  }


  
  return (
<div>
<div id='download-section' className="lg:grid lg:grid-cols-2 ml-10">
<div className='my-10 mx-10 items-center justify-center flex'>
     <Image width='500' height='500' src={pck.coverPhotoURL} className='rounded-lg shadow-lg shadow-black' alt="img"/>

    </div>
    <div className="mx-5 lg:mx-20">
       <div className='justify-center flex my-9'>
       <h1 className="text-2xl mt-4 font-extrabold leading-none text-text-secondary">
       {pck.title}</h1>
      
        </div>
        {pck.category=='photo-package'?(
            <p className="flex justify-center font-medium text-text-primary lg:mb-4 text-md lg:text-xl">
            {toDateTime(pck.date)}</p>
          ):(
            <></>
          )}
      

   <div className='border-2 px-7 py-5 border-text-secondary'>

{(pck.highlights).map((para)=>{

return ( <p key={para}  className="mb-2 bg-bg-secondary p-2 font-semiBold flex justify-center items-center text-text-primary lg:mb-4 md:text-sm lg:text-lg">
   {para}</p>)

     })}
    
</div>
     
    </div>
   

                 
</div>

<div className='flex items-center justify-center mt-3'>
               
               {/* <Link 
               
                className='p-3 m-4 my-3 text-base font-medium text-center text-text-primary rounded-lg border-2 border-text-secondary hover:text-bg-primary hover:bg-text-primary hover:border-text-primary'
                 href="/contact">
                  Email us
                  </Link> */}


                  {/* <button 
                onClick={()=>downloadPdf()}
               
               className='p-3 m-4 my-3 text-base font-medium text-center text-text-primary rounded-lg border-2 border-text-secondary hover:text-bg-primary hover:bg-text-primary hover:border-text-primary'>
                 download PDFs
                 </button> */}
        
              <Link
            href={`https://wa.me/${whatsappNo}?text=Hello I want to know about this package - ${pck.title}`.replaceAll('&','and').replaceAll(' ','%20')}
                className="p-3 ml-3 text-sm text-center bg-green-500 font-extrabold text-black rounded-lg bg-primary-700 sm:w-fit hover:bg-green-300 shadow-gray-600 shadow-md"
                target="_blank"
                rel="noopener noreferrer"
              >
              Get Quote
              </Link>
              </div>
        
               

                <div className='mt-10'>
                <p key='heading'  className="mb-2 flex font-bold text-center justify-center font-xl text-text-primary lg:mb-4 md:text-xl lg:text-2xl">
                {"Package Details"}
                </p> 
             
              
              
              <div className='mt-10 mx-5 md:mx-10 lg:mx-20'>
              {(pck.details).map((para)=>{
              
              return ( 
              <div key={para} className='flex items-center px-5 md:px-20 lg:px-40 justify-center'>
              
                {para[0]=='D'?(
                  <p className="mb-6  font-semiBold text-text-secondary text-2xl border border-text-primary p-4 rounded-md">
                  {para}
                  </p>
                ):(
                  <p className="mb-6 bg-bg-secondary p-3 font-semiBold text-text-primary text-lg">
              {para}
              </p>
                )}
                
              </div>)
              
              })}
              </div>
              <ProjectsByPackageSection pck={pck.urlParamName}/>
              
          

                      

  </div>

  </div>



  )
}

export async function getStaticProps({params}){
    const data=await getDataById(params.id,'packages');
  
    return {
      props:{pck:data}
    }
  }

export async function getStaticPaths(){
    const packages=await getCollectionData('packages')
    var p=[]
    packages.map((val)=>{
      p.push('/package/'+val.id)
    })

    return {
        paths:p,
        fallback:true
    }
}


export default PackageDetails