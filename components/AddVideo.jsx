import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import {MdFastfood,MdCloudUpload,MdDelete,MdMoney, MdAddBox, MdRemove, MdClear} from 'react-icons/md'
import { videoCategories,categories} from '../data'
import Loader from './Loader'
import {  getCollectionData, uploadData } from '../utils/apiFunctions'
import Image from 'next/image'


const AddVideo = () => {


  const [videoURL,setVideoURL]=useState('')

  const [category,setCategory]=useState('Select Category')
  const [pkg,setPkg]=useState('Select Package')

  const [fields,setFields]=useState(false)
  const [alertStatus,setAlertStatus]=useState('dangper')
  const [msg,setMsg]=useState(null)
  const [isLoading,setIsLoading]=useState(false)

  const [packages, setPackages] = useState([])

  useEffect(() => {

    getCollectionData('packages').then((val)=>{
      setPackages(val)
    })
    
  },)
  


  const saveDetails=()=>{

    setIsLoading(true)

    
    try {

      

      if(videoURL.length===0 || category==='Select Category'|| pkg==='Select Package'){
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
          videoURL:videoURL,
          category:category,
          package:pkg,
          isFeatured:true
       
        }

        // console.log(data)
        uploadData(data,'videos')
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
    setVideoURL('')
    setCategory('Select Category')
    setCategory('Select Package')

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


          <div className="w-full">
            <select onChange={(e)=>{setPkg(e.target.value)}} className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
              <option value="other" className='bg-white'>Select Package</option>
              {packages&& packages.map(item=>
                (
                  <option key={item.urlParamName} className="text-base border-0 outline-none capitalize bg-white text-textColor" value={item.urlParamName}>{item.title}</option>
                )
              )}
            </select>
          </div>

   
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdFastfood className='text-xl text-gray-700'/>
            <input type="text" required value={videoURL} placeholder ='Video URL' onChange={(e)=>{setVideoURL(e.target.value)}} 
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-500 text-textColor" />
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

export default AddVideo