import React from 'react'
import { images } from '../../data'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import Link from 'next/link'
import Image from 'next/image'





const Header = () => {

  
  return (
    <header>
      
        <nav className="flex items-center justify-between flex-wrap bg-transparent p-6">
<div className="cursor-pointer flex items-center flex-shrink-0 text-text-secondary mr-6">
   <Link href='/'>

   <div className='ml-2 lg:ml-5'>
    <Image width='100' height='100' src={images['companyLogo1']} alt="Jungle Tales Logo" />

   </div>
   </Link>
  </div>

  <div>

    <DesktopNav/>
    <MobileNav/>

  </div>
    
</nav>
</header>
  )
}

export default Header