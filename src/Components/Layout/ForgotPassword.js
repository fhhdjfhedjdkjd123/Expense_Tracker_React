import React,{useState} from 'react';
import classes from './ForgotPassword.module.css';

const ForgotPassword=()=>{
    const [email,setEmail]=useState();

    let url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDh4Q71z_iYl7koXLXL8FAvALOnpFvgCxU';

    const sendLinkPost=async()=>{
        try{
            const response=await fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    requestType:"PASSWORD_RESET",
                    email:email
                }),
                headers:{
                    'Contect-Type':'application/json'
                }
            })
            console.log(response);
        }
        catch(err){
            console.log(err);
        }
    }

    const emailHandler=(e)=>{
        setEmail(e.target.value);
    }
    return(
        <div className={classes.parent}>
            <form className={classes.form}>
                <label>Enter the mail with which you have registered.</label>
                <input type="text" value={email} onChange={emailHandler} placeholder="Enter email" required />
                <button onClick={sendLinkPost}>Send Link</button>

            </form>
        </div>
    )

}
export default ForgotPassword;