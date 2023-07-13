import React from 'react';
import Card from './Card';
import classes from './UserExpenseItem.module.css';
const UserExpenseItem=(props)=>{
    return(
        <Card>
        <ul>
        {props.expenses.map((expense)=>(
        <li className={classes.expense}>
            <div className={classes.item}>
                <h3>{expense.amount}</h3>
                <div className={classes.description}>{expense.description}</div>
                <div className={classes.category}>{expense.category}</div>
           </div>
        </li>
        ))}
        </ul>
    </Card>

    )

}
export default UserExpenseItem;