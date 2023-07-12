import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import classes from './ProfileForm.module.css';
import Verification from './Verification';
const ProfileForm=()=>{
    return(
        <Fragment>
            <div className={classes.top}>
                <div className={classes.welcomeExp}>Welcome to expense Tracker!!!!!</div>
                <div className={classes.completeProfile}>
                    Your Profile is incomplete.
                    <Link to="/profileCompleteForm">Complete it</Link>
                </div>
            </div>
            <div className={classes.verification}>
                 <Verification/>
            </div>
        </Fragment>
    )

}
export default ProfileForm;