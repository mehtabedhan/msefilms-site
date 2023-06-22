
import Link from 'next/link'
import Image from 'next/image'
import { categories } from '../data'

const PackageTypesSection = () => {

  return (
    <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
           
            {categories.length!=0?(
              <div className="grid grid-cols-2 gap-4 text-text-primary sm:gap-12 md:grid-cols-3 lg:grid-cols-3">

            {categories.map((item)=>{
                  return(
                    <div  key={item.id}>
                       <Link href={'/packages/'+item.urlParamName}>
                        <div className="relative  hover:cursor-pointer rounded-md shadow-lg shadow-gray-900">
                        <Image width='600' height='400' src={item.coverPhotoURL}
                       className='' alt=""/>

                          <p className="absolute bottom-0 left-0 bg-black text-sm px-2 py-1 lg:py-2 lg:text-lg lg:px-5 text-bg-primary">{item.name}</p>
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

export default PackageTypesSection