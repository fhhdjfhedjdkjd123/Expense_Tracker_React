import React,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';
import classes from './ProfileForm.module.css';
import Verification from './Verification';
import ExpenseForm from './ExpenseForm';
import UserExpenseItem from './UserExpenseItem';
const ProfileForm=()=>{
    // const [expenseList,setExpenselist]=useState([]);
    // const onAddHandler=(expenseAmt,expenseDes,expenseCate)=>{
    //     setExpenselist((prevExpenseList)=>{
    //         return [...prevExpenseList, 
    //           {amount:expenseAmt, description:expenseDes, id:Math.random().toString(), category:expenseCate}];
    //       });
      
    // }
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
            <ExpenseForm/>
            <UserExpenseItem/>
        </Fragment>
    )

}
export default ProfileForm;