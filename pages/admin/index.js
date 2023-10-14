import React, { useEffect } from 'react'
import { useAppContext } from '../../context/AppContext';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AddFilm} from '../../components';
import { app } from '../../firebase.config';
import { actionType } from '../../context/AppReducer';
import { fetchUser } from '../../utils/fetchLocalStorageData';


const AdminPanel = () => {
    const {state, dispatch} = useAppContext();
    const firebaseAuth=getAuth(app)
    const provider=new GoogleAuthProvider()
    const {user} = state;

useEffect(() => {

    var user = fetchUser()
    dispatch({
        type:actionType.SET_USER,
        user:user,
      });
  

}, [])


    const login=async()=>{

        const {user:{providerData}}=await signInWithPopup(firebaseAuth,provider);
        
        if(providerData[0].email=='mhtb93.mse@gmail.com'){
            
            dispatch({
                type:actionType.SET_USER,
                user:providerData[0],
              });

              localStorage.setItem('user',JSON.stringify(providerData[0]))

        }
        else{
            dispatch({
                type:actionType.SET_USER,
                user:null,
              });

            window.alert("Access Denied");

        }
    
        
      }

      const logOut=async()=>{
        localStorage.clear()

        dispatch({
          type:actionType.SET_USER,
          user:null
        })
      }


    return (
    <div>
        {user==null?( 
        <button
              onClick={login}
                type="button"
                className="p-2 ml-6 rounded-md bg-blue-100 text-black text-md my-2 hover:shadow-lg">
                Login with Google
              </button>)


              :(
              <>


            <button
              onClick={logOut}
                type="button"
                className="p-2 ml-6 rounded-md bg-blue-100 text-black text-md my-2 hover:shadow-lg">
                LogOut
              </button>

             {<AddFilm/>}

              </>)}
        
    </div>
  )
}

export default AdminPanel