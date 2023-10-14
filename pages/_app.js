import '../styles/globals.scss'
import 'tailwindcss/tailwind.css'
import React,{useEffect,useState} from 'react'
import { Layout } from '../components'
import { AppWrapper } from '../context/AppContext'

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-bg-primary'>
      <AppWrapper>

      <Layout>

<Component {...pageProps} />

</Layout>

      </AppWrapper>
    
    
    </div>
  )
}

export default MyApp
