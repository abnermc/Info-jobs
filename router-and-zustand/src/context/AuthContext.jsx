import {createContext, useState} from 'react'

export const AuthContext = createContext()
export function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function login(){
        setIsLoggedIn(true)
    }
    function logout(){
        setIsLoggedIn(false)
    }
    const value = {
        isLoggedIn, 
        login,
        logout
    }
    return <AuthContext value={value}>{children}</AuthContext>
}