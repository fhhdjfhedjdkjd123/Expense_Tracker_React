import React from 'react';

const Verification = () => {
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
  return (
    <div>
        <button onClick={verifyEmail} className="btn btn-warning"> Verify Email </button>
    </div>
  )
}

export default Verification