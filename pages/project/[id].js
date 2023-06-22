import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { Loader, ProjectsByCategorySection } from '../../components';
import { getCollectionData, getDataById } from '../../utils/apiFunctions';

const ProjectDetails = ({project}) => {
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];
  const router=useRouter();

  if(router.isFallback){
      return <Loader/>
  }
  return (
<div>
<div className="grid grid-cols-1 lg:grid-cols-2 mx-4 my-8 md:mx-8 lg:mx-16 lg:my-16">


          {project.projectURL!=''?(
            <>
            {project.projectURL.includes('youtu')?(
               <div key={project.id} className="aspect-w-16 aspect-h-9 ">
               <iframe src={"https://www.youtube.com/embed/"+project.projectURL.split('=')[1]} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
             </div>
            ):(
              <div className='my-10 mx-10 items-center justify-center flex'>
                <Image width='400' height='400' src={project.coverPhotoURL} className='rounded-lg shadow-lg shadow-black' alt="img"/>

                </div>
            )}
            </>
           
          ):(
           <>

           </>
          )}  

        {(project.projectURL==''&&project.projectPhotos.length>=0)?(
             <div className='grid border-4 border-text-secondary grid-cols-2 gap-2 lg:grid-cols-4 mt-10 p-2'>
             {project.projectPhotos.map((img)=>{
              return(
  
                <div key={img}>
                <Image width='400' height='400' src={img} alt="uploaded images" />
  
                </div>
              )
             })}
             </div>
          ):(
            <>
            
            
            </>
           
          )}  






    <div className="mx-5 lg:mx-20">
       <div className='justify-center flex my-5'>
       <h1 className="text-xl lg:text-3xl my-7 font-extrabold leading-none text-text-secondary">
       {project.title}</h1>
        </div>

       <div className='border-2 px-7 py-10 border-text-secondary'>

       {(project.highlights).map((para)=>{

    return ( <p key={para}  className="mb-2 font-medium flex justify-center text-text-primary lg:mb-4 md:text-sm lg:text-lg">
          {para}</p>)

            })}

       </div>
       


    </div>
    
   

                 
              </div>

              <div className='mt-32 mx-5 md:mx-10 lg:mx-20'>


              {(project.projectURL!=''&&project.projectPhotos.length>=0)?(
             <div className='grid border-4 border-text-secondary grid-cols-2 gap-2 lg:grid-cols-4 mt-10 p-2'>
             {project.projectPhotos.map((img)=>{
              return(
  
                <div key={img}>
                <Image width='400' height='400' src={img} alt="uploaded image" />
  
                </div>
              )
             })}
             </div>
          ):(
            <></>
           
          )}  






              
              <p key='heading'  className="mb-2 flex font-bold text-center justify-center font-xl text-text-primary lg:mb-4 md:text-xl lg:text-2xl">
                {"Project Details"}
                </p> 
              {(project.details).map((para)=>{

              return ( 
              <div key={para} className='flex items-center px-5 md:px-20 lg:px-40 justify-center'>
                <p className="mb-6 font-medium text-text-primary lg:mb-8 md:text-sm lg:text-lg">
              {para}
              </p>
              </div>)

              })}
              </div>

              <ProjectsByCategorySection title="Similar Projects..." category={project.category}/>
                      

            </div>



  )
}

export async function getStaticProps({params}){
    const data=await getDataById(params.id,'projects');
  
    return {
      props:{project:data}
    }
  }

export async function getStaticPaths(){
    const projects=await getCollectionData('projects')
    var p=[]
    projects.map((val)=>{
      p.push('/project/'+val.id)
    })

    return {
        paths:p,
        fallback:true
    }
}


export default ProjectDetails