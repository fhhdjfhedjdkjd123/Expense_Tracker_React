import React, { useContext } from 'react';
//import AuthContext from '../store/AuthContext';
import { useDispatch } from 'react-redux';
import { authAction } from '../ReduxStore/AuthReducer';

const Verification = () => {
    //const ctx=useContext(AuthContext);
    const dispatch = useDispatch();
    const token=localStorage.getItem('token');
    let url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDh4Q71z_iYl7koXLXL8FAvALOnpFvgCxU';
    const verifyEmail=async()=>{
        try{
            const response=await fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    requestType:'VERIFY_EMAIL',
                    idToken:token
                })
            })
            console.log(response);
            alert('CHECK YOUR INBOX');

        }
        catch(err){
            console.log(err);
        }
    }

    const logoutHandler=()=>{
        //ctx.logout();
        dispatch(authAction.logout());
    }
  return (
    <div>
        <button onClick={verifyEmail} className="btn btn-warning"> Verify Email </button>
        <button onClick={logoutHandler} className="btn btn-danger">Logout</button>
    </div>
  )
}

export default Verification