import '../styles/globals.scss'
import 'tailwindcss/tailwind.css'
import React,{useEffect,useState} from 'react'
import { Layout } from '../components'

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-bg-primary'>
    <Layout>

    <Component {...pageProps} />

    </Layout>
    
    </div>
  )
}

export default MyApp
