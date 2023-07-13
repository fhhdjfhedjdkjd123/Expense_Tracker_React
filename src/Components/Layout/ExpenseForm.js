import React,{useState} from 'react';
import classes from './ExpenseForm.module.css';


const ExpenseForm=(props)=>{
    const [amount,setAmount]=useState('');
    const [description,setDescription]=useState('');
    const [category,setCategory]=useState('');
    const [show,setShow]=useState(false);

    const amountHandler=(e)=>{
        setAmount(e.target.value);
    }
    const descriptionHandler=(e)=>{
        setDescription(e.target.value);
    }
    const categoryHandler=(e)=>{
        setCategory(e.target.value);
    }
    const showHandler=()=>{
        setShow(true);
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        props.onAdd(amount,description,category);
        setAmount('');
        setDescription('');
        setCategory('');
    }
    return(
    <div className={classes.parent}>
        <div className={classes.add}>
            <button type="button" className="btn btn-primary mt-5 mb-5" onClick={showHandler}>{show ? 'close' : '+Add Expense'}</button>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div class="mb-3">
            <label className="form-label">Amount</label>
            <input type="number" className="form-control" value={amount} onChange={amountHandler}/>  
          </div>
          <div className="mb-3">
            <label  className="form-label">Description</label>
            <input type="text" className="form-control" value={description} onChange={descriptionHandler}/>
          </div>
          <label  className="form-label">Category</label>
          <select className="form-select" value={category} onChange={categoryHandler}>
      
          <option value="food">Food</option>
          <option value="petrol">Petrol</option>
          <option value="Shopping">Shopping</option>
          </select>
          <button type="submit" className="btn btn-primary mt-5" >Save</button>
        </form>
      </div>
  
    )

}
export default ExpenseForm;