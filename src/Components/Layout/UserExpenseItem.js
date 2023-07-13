import React, { useContext } from 'react';
import classes from './UserExpenseItem.module.css';
import ExpenseContext from '../store/ExpenseContext';
const UserExpenseItem=(props)=>{
    const ctx=useContext(ExpenseContext);
    return(
    <div>
      <table>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Amount</th>
          
          <th scope="col">Description</th>
          <th scope="col">Category</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {ctx.expenses.map((expense)=>{
            return(
            <tr key={expense.id}>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
            </tr>
            )
        })}
      </tbody>

      </table>
    </div>
    )
}
export default UserExpenseItem;