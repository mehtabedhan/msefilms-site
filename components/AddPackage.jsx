import { motion } from 'framer-motion'
import React, { useState } from 'react'
import {MdFastfood,MdCloudUpload,MdDelete,MdMoney, MdAddBox} from 'react-icons/md'
import { storage } from '../firebase.config'
import { categories} from '../data'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Loader from './Loader'
import {  uploadData } from '../utils/apiFunctions'
import Image from 'next/image'


const AddPackage = () => {
  const [currentHighlights,setCurrentHighlights]=useState('')
  const [currentDetails,setCurrentDetails]=useState('')


  const [title,setTitle]=useState('')
  const [highlights,setHighlights]=useState([])
  const [details,setDetails]=useState([])
  const [category,setCategory]=useState('Select Category')
  const [imageAsset,setImageAsset]=useState(null)
  
  const [fields,setFields]=useState(false)
  const [alertStatus,setAlertStatus]=useState('dangper')
  const [msg,setMsg]=useState(null)
  const [isLoading,setIsLoading]=useState(false)


  const uploadImage=(e)=>{
    setIsLoading(true)
    const imageFile=e.target.files[0]

    const storageRef=ref(storage,`packages/${Date.now()}-${title}`)

    const uploadTask=uploadBytesResumable(storageRef,imageFile)
    uploadTask.on('state_changed',(snapshot)=>{
      const uploadProgress=snapshot.bytesTransferred/snapshot.totalBytes*100
      console.log(uploadProgress)

    },(err)=>{
      console.log("Error -"+err)
      setFields(true) 
      setMsg("Error while Uploading: Try Again")
      setAlertStatus('danger')
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)
      },4000)
    },()=>{

      getDownloadURL(uploadTask.snapshot.ref).then(url=>{
        setImageAsset(url)
        setIsLoading(false)
        setFields(true)
        setAlertStatus('success')
        setTimeout(()=>{
          setFields(false)
        },4000)
      })

    })



  }
  const deleteImage=()=>{
    setIsLoading(true)
    const deleteRef=ref(storage,imageAsset)
    deleteObject(deleteRef).then(()=>{
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg('Image Deleted Successfully')
      setAlertStatus('success')
      setTimeout(()=>{
        setFields(false)
      },4000)

    })

  }
  const saveDetails=()=>{

    setIsLoading(true)

    
    try {

      

      if(title==='' || highlights.length===0|| details.length===0 || category==='Select Category' || !imageAsset){
        setFields(true)
        setMsg("Required fields can't be empty")
        setAlertStatus('danger')
        setTimeout(()=>{
          setFields(false)
          setIsLoading(false)
        },4000)

      }
      else{
        const data={
          id:`${category}-${Date.now()}`,
          title:title,
          coverPhotoURL:imageAsset,
          highlights:highlights,
          details:details,
          category:category,
          urlParamName:(title.replaceAll(' ','-')).toLowerCase(),
          isFeatured:true
       
        }

        // console.log(data)
        uploadData(data,'packages')
        setIsLoading(false)
        setFields(true)
        setMsg('Data uploaded Successfully')
        setAlertStatus('success')
        clearData()

        setTimeout(()=>{
          setFields(false)
        },4000)



      }
      
    } catch (err) {
      console.log("Error -"+err)
      setFields(true)
      setMsg("Error while Uploading: Try Again")
      setAlertStatus('danger')
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)
      },4000)
      
    }

  }


  const clearData=()=>{
    setTitle('')
    setImageAsset(null)
    setHighlights([])
    setDetails([])
    setCategory('Select Category')
  }



  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-white'>
        <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">

          {fields&&(
            <motion.p
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}

             className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus==='danger' ? 
            "bg-red-400 text-red-800 ":" bg-emerald-400 text-emerald-800"
            }`}>
              {msg}
            </motion.p>
          )}

          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdFastfood className='text-xl text-gray-700'/>
            <input type="text" required value={title} placeholder ='Title' onChange={(e)=>{setTitle(e.target.value)}} 
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-500 text-textColor" />
          </div>

          <div className="w-full">
            <select onChange={(e)=>{setCategory(e.target.value)}} className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
              <option value="other" className='bg-white'>Select Category</option>
              {categories&& categories.map(item=>
                (
                  <option key={item.id} className="text-base border-0 outline-none capitalize bg-white text-textColor" value={item.urlParamName}>{item.name}</option>
                )
              )}
            </select>
          </div>


                
          


          
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdMoney className='text-xl text-gray-700'/>
            <input type="text" required value={currentHighlights} placeholder ='Highlights' onChange={(e)=>{setCurrentHighlights(e.target.value)}} 
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-500 text-textColor" />

           <button><MdAddBox className='text-3xl text-bg-primary' onClick={()=>{
            var l=highlights
            l.push(currentHighlights)
            setHighlights(l)
            setCurrentHighlights('')
            }}/></button>

          </div>
          


          {highlights&&highlights.map((para)=>{

        return ( <p key={para} className=" text-bg-primary">
              {para}
          </p>)

              })}


   <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdMoney className='text-xl text-gray-700'/>
            <input type="text" required value={currentDetails} placeholder ='Details' onChange={(e)=>{setCurrentDetails(e.target.value)}} 
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-500 text-textColor" />

           <button><MdAddBox className='text-3xl text-bg-primary' onClick={()=>{
            var l=details
            l.push(currentDetails)
            setDetails(l)
            setCurrentDetails('')
            }}/></button>

          </div>
          
          {details&&details.map((para)=>{

             return ( <p key={para} className=" text-bg-primary">
                 {para}
                       </p>)

             })}


                      {/* cover photso*/}


                             <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-150 md:h-300 cursor-pointer rounded-lg'>


                              {isLoading? <Loader/>:
                              <>
                              {!imageAsset?
                              <div>
                              <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer '>
                                <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                                  <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700'/>
                                  <p className='text-gray-500 hover:text-gray-700'>Click here to upload Photo</p>
                                </div>
                                <input type="file" name='uploadimage' accept='image/*' onChange={(e)=>uploadImage(e)} className="w-0 h-0"/>
                              </label>
                              </div>:
                              <div className='flex'>

                                <div>
                                <Image width='200' height='200' src={imageAsset} alt="uploaded image" />

                                </div>

                              <div className='ml-10 flex justify-center items-center'>

                                <div>
                                <button type='button' className='rounded-full bg-red-500 text-3xl 
                                cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out' onClick={()=>deleteImage(imageAsset)}><MdDelete className='text-white'/></button>
                                </div>

                              </div>
                              </div>

                              }

                              </>}

                              </div>


          
          <div className='flex items-center w-full'>
          <button type='button'
          onClick={saveDetails}
           className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'>
             Save
           </button>
        </div>
        </div>
        
    </div>
  )
}

export default AddPackage