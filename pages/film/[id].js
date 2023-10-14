import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Loader, filmsByCategorySection } from '../../components';
import { getCollectionData, getDataById } from '../../utils/apiFunctions';
import Head from 'next/head';

const FilmDetails = ({film}) => {
  const router=useRouter();
  const [isReleased, setisReleased] = useState(false)
  useEffect(() => {

    if(Date.now()>film.releaseDateTimestamp){
      setisReleased(true)
    }
    
  }, [])

  function removeKey(mp,k){
    delete mp[k]
    return mp
  }
  

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
<div>
<Head>
        <title>{film.title}</title>
        <meta charSet="UTF-8"/>

        <meta
          name="description"
          content={film.description}
          key="desc"
        />
        <meta name="keywords"
         content={'filmkatha,filmkatha studios'}
         />

        <link
          rel="canonical"
          href={'https://www.filmkatha.com/film/'+film.id}
          key="canonical"
        />
    </Head>

<div className="grid grid-cols-1 lg:grid-cols-2 mx-4 my-8 md:mx-8 lg:mx-16 lg:my-16">

            {isReleased?(
              <>
             <div key={film.id} className="aspect-w-16 aspect-h-9 ">
                    <iframe src={"https://www.youtube.com/embed/"+film.filmURL.split('=')[1]} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                  
              </>
            
                  
                  ):(<>
                    <div className='my-10 mx-10 items-center justify-center flex'>
                <Image width='400' height='400' src={film.posterURL} className='rounded-lg shadow-lg shadow-black' alt="img"/>

                </div></>)}


    <div className="mx-5 lg:mx-20">
       <div className='justify-center flex my-5'>
       <h1 className="text-xl lg:text-3xl font-extrabold leading-none text-text-secondary">
       {film.title}</h1>
        </div>
      {isReleased? ( <p className="font-bold flex justify-center text-text-primary lg:mb-4 text-md lg:text-xl">
          {`${toDateTime(film.releaseDateTimestamp)}`}</p>):(<></>)}

        <p className="font-bold flex justify-center text-text-primary lg:mb-4 text-md lg:text-xl">
          {'a '+film.category.toUpperCase().replaceAll('-',' ')}</p>


       <div className='border-2 px-7 mt-10 py-10 border-text-secondary'>
   
       {
        
          Object.keys(film.credits).map((val)=>{
                              return(
                                <div key={val} className='flex justify-center'>
                                <p className="mb-2 mr-2 flex justify-center font-light text-text-primary lg:mb-4 text-sm lg:text-lg">
                                {val+" : "}</p>
         <p className="mb-2 flex justify-center font-medium text-text-primary lg:mb-4 text-md lg:text-xl">
                                {film.credits[val]}</p> 
                            </div>
                              )
                            })
                          }
          <p key={'cast'}  className="my-4 font-bold flex justify-center text-text-primary lg:mb-4 text-md lg:text-xl">
          {'Cast'}</p>


      {(film.cast).map((para)=>{

          return ( <p key={para}  className="mb-2 font-medium flex justify-center text-text-primary lg:mb-4 md:text-sm lg:text-lg">
          {para}</p>)

                })}

       

       </div>
 

    </div>
    
   

                 
              </div>

              <div className='mt-32 mx-5 md:mx-10 lg:mx-20'>
            
              <p key='heading'  className="mb-2 flex font-bold text-center justify-center font-xl text-text-primary lg:mb-4 md:text-xl lg:text-2xl">
                {"Film Details"}
                </p> 


                <div key={film.description} className='flex items-center px-5 md:px-20 lg:px-40 justify-center'>
                <p className="mb-6 font-medium text-text-primary lg:mb-8 md:text-sm lg:text-lg">
              {film.description}
              </p>
              </div>
            
              </div>

              {/* <FilmsByCategorySection title="Similar films..." category={film.category}/> */}
                      

            </div>



  )
}

export async function getStaticProps({params}){
    const data=await getDataById(params.id,'films');
  
    return {
      props:{film:data}
    }
  }

export async function getStaticPaths(){
    const films=await getCollectionData('films')
    var p=[]
    films.map((val)=>{
      p.push('/film/'+val.id)
    })

    return {
        paths:p,
        fallback:true
    }
}


export default FilmDetails