import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// var env   = process.env;


const firebaseConfig = {
  apiKey: "AIzaSyAmo7BBs98RyhLiOPitZ-5UzwhEPjuNrXg",
  authDomain: "amp-studio-1a31a.firebaseapp.com",
  projectId: "amp-studio-1a31a",
  storageBucket: "amp-studio-1a31a.appspot.com",
  messagingSenderId: "39140013802",
  appId: "1:39140013802:web:fc562ffdda16319512c993",
  measurementId: "G-7H2KKN0Y6K"
};


  const app=getApps.length>0?getApp():initializeApp(firebaseConfig);

  const firestore=getFirestore(app)
  const storage=getStorage(app)

  
export {app,storage,firestore};


