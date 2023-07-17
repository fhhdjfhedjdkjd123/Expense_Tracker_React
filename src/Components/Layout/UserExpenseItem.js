import React, { useContext } from 'react';
//import ExpenseContext from '../store/ExpenseContext';
import { useDispatch,useSelector } from 'react-redux';
import { ExpenseAction } from '../ReduxStore/ExpenseReducer';
const UserExpenseItem=(props)=>{
    //const ctx=useContext(ExpenseContext);

    const dispatch=useDispatch();
    const arrayOfData=useSelector((state)=>state.expenseReducer.expenses)

    const editHandler=(id, amount, description, category)=>{

      const obj={
        id:id,
        amount:amount,
        description:description,
        category:category
      }
      dispatch(ExpenseAction.edit(obj)); // cann't take more than one argument, so I store in obj and pass
     // ctx.edit(id, amount, description, category);
    }

    const email=localStorage.getItem('email').replace(/[@,.]/g,'')
    let url='https://expense-tracker-3a05b-default-rtdb.firebaseio.com/';
    const deleteExpense=async(id)=>{
      try{
          const response=await fetch(`${url}/${email}/${id}.json`,{
              method:'DELETE'
          });
          console.log(response);
          dispatch(ExpenseAction.deleteData());
      }
      catch(err){
          console.log(err);
      }
  }
    const deleteHandler=(id)=>{
      deleteExpense(id)
    }

    let totalAmount=0;
    arrayOfData.forEach((expense)=>{
     totalAmount+=Number(expense.amount)
    })
 
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
        {arrayOfData.map((expense,index)=>{
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
      <div style={{display:'flex',justifyContent:'space-between', marginRight:'200px',fontWeight:"bold",fontSize:"25px"}}>
        <div style={{marginLeft:"1rem"}}>Total expenses</div>
        <div style={{marginRight:"5rem"}}>${totalAmount}</div>
      </div>

    </div>
    )
}
export default UserExpenseItem;