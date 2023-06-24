import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// var env   = process.env;


const firebaseConfig = {
    apiKey: "AIzaSyCkLq3MP-sw1-841KRKY05MSfDd9xKKiaQ",
    authDomain: "mse-films.firebaseapp.com",
    projectId: "mse-films",
    storageBucket: "mse-films.appspot.com",
    messagingSenderId: "182657575580",
    appId: "1:182657575580:web:5ffdcffaf7fd6139b95b59",
    measurementId: "G-V7NCJBQ9EE"
};


  const app=getApps.length>0?getApp():initializeApp(firebaseConfig);

  const firestore=getFirestore(app)
  const storage=getStorage(app)

  
export {app,storage,firestore};


