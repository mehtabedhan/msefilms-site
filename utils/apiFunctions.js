import { collection, doc, getDocs, where, query, setDoc, limit } from "firebase/firestore"
import { firestore } from "../firebase.config"
import { PackageTypesSection } from "../components";



export const uploadData = async(data,name)=>{
    await setDoc(doc(firestore,name,data.id),data,{merge:true});
};



export const getDataByCategory=async(category,name)=>{


    const items=await getDocs(

        query(collection(firestore,name),where('category','==',category)
        )
        
    )
    const data=items.docs.map((doc)=>doc.data())

    return data


    

}



export const getVideosByPackage=async(pkg)=>{


    const items=await getDocs(

        query(collection(firestore,'videos'),where('package','==',pkg)
        )
        
    )
    const data=items.docs.map((doc)=>doc.data())

    return data


    

}

export const getProjectsByPackage=async(pck)=>{


    const items=await getDocs(

        query(collection(firestore,'projects'),where('projectType','==',pck)
        )
        
    )
    const data=items.docs.map((doc)=>doc.data())
    

    return data


    

}
export const getDataById=async(id,name)=>{


    const items=await getDocs(

        query(collection(firestore,name),where('id','==',id)
        )
        
    )
    const data=items.docs.map((doc)=>doc.data())

    return data[0]


    

}




export const getFeaturedData=async(name)=>{


    const items=await getDocs(

        query(collection(firestore,name),where('isFeatured','==',true)
        )
        
    )
    

    return items.docs.map((doc)=>doc.data())

    

}

export const getCollectionData=async(name)=>{

    const items=await getDocs(

        query(collection(firestore,name))
        
    )
    

    return items.docs.map((doc)=>doc.data())

}

