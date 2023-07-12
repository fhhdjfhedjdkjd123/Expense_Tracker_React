import React, { useState } from 'react';

const AuthContext=React.createContext();


export const AuthProvider=(props)=>{
    const [login, setLogin] =useState(true);

    let url;
    const Auth=async(userEmail, userPassword)=>{
        if(login){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDh4Q71z_iYl7koXLXL8FAvALOnpFvgCxU'
        }else{
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDh4Q71z_iYl7koXLXL8FAvALOnpFvgCxU'
        }
       try
       {
        const response=await fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:userEmail,
                password:userPassword,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
            const data=await response.json();
            console.log(data);
            console.log(response.ok);
            if(!response.ok){
                localStorage.setItem('token', data.idToken)
                localStorage.setItem('email', userEmail)
            }else{
                if(login){
                    console.log("User has successfully login");
                }else{
                    console.log("User has successfully signup");
                }
        
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const switchAuthHandler=()=>{
        setLogin((prev)=>!prev)
    }
    const cartContextValues={
        switchAuth:switchAuthHandler,
        isLogin:login,
        authFunction:Auth,

    }
    return (
        <AuthContext.Provider value={cartContextValues} >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext;