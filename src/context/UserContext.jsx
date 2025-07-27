import { createContext, useEffect, useState } from "react";


export let UserContext = createContext();


export default function UserContextProvider({children}){

    useEffect(()=>{
        if (localStorage.getItem('userToken')) {
            setUserToken(localStorage.getItem('userToken'))
        }

    } , [])
    const [count, setCount] = useState(0);

    const [userToken, setUserToken] = useState(null)

    function changeCount(){
        setCount(Math.random())
    }

    return <UserContext.Provider value={ {count , changeCount , userToken , setUserToken} }>
        {children}
    </UserContext.Provider>


}