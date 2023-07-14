import React, { useContext } from 'react';
import ExpenseContext from '../store/ExpenseContext';
const UserExpenseItem=(props)=>{
    const ctx=useContext(ExpenseContext);


    const editHandler=(id, amount, description, category)=>{
      ctx.edit(id, amount, description, category);
    }

    const email=localStorage.getItem('email').replace(/[@,.]/g,'')
    let url='https://expense-tracker-3a05b-default-rtdb.firebaseio.com/';
    const deleteExpense=async(id)=>{
      try{
          const response=await fetch(`${url}/${email}/${id}.json`,{
              method:'DELETE'
          });
          console.log(response);
      }
      catch(err){
          console.log(err);
      }
  }
    const deleteHandler=(id)=>{
      deleteExpense(id)
    }
    return(
    <div>
      <table className='table'>
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
        {ctx.expenses.map((expense,index)=>{
            return(
            <tr key={expense.id}>
                <th scope="row">{index+1}</th>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>
                    <button type="button" class="btn btn-primary" onClick={editHandler.bind(null, expense.id,expense.amount,expense.description,expense.category)}>Edit</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" onClick={deleteHandler.bind(null,expense.id)}>Delete</button>
                </td>

            </tr>
            )
        })}
      </tbody>

      </table>
    </div>
    )
}
export default UserExpenseItem;