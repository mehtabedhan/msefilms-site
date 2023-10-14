import React,{useEffect,useState} from 'react'

const getLocalUser = () => {
    const [localUser, setLocalUser] = useState({
        info:''
    });

   

    useEffect(() => {

        const user= localStorage.getItem('user')!=='undefined'?
        JSON.parse(localStorage.getItem('user'))
        :localStorage.clear();

        setLocalUser(user)

        
        
    }, []);

    return localUser;
};

export default getLocalUser;