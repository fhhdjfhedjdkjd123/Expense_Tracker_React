import React,{useState,useContext,useEffect} from 'react';
import classes from './ExpenseForm.module.css';
//import ExpenseContext from '../store/ExpenseContext';
import { ExpenseAction } from '../ReduxStore/ExpenseReducer';
import { useDispatch,useSelector } from 'react-redux';


const ExpenseForm=()=>{

  const dispatch=useDispatch();
  const isEditing=useSelector((state)=>state.expenseReducer.isEditing)
  const idForEditing=useSelector((state)=>state.expenseReducer.id)
  const amountForEditing=useSelector((state)=>state.expenseReducer.amount)
  const descriptionForEditing=useSelector((state)=>state.expenseReducer.description)
  const categoryForEditing=useSelector((state)=>state.expenseReducer.category)
  const deleted=useSelector((state)=>state.expenseReducer.deleted)
  const arrayOfData=useSelector((state)=>state.expenseReducer.expenses)

    const [expense, setExpense]=useState([]);
    const [amount,setAmount]=useState('');
    const [description,setDescription]=useState('');
    const [category,setCategory]=useState('food');
    const [show,setShow]=useState(false);

    //const ctx=useContext(ExpenseContext);

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
        setShow(!show);
    }
    let url='https://expense-tracker-3a05b-default-rtdb.firebaseio.com/';
    const email=localStorage.getItem('email').replace(/[@,.]/g,'');
    const getData=async()=>{
      try{
          const response=await fetch(`${url}/${email}.json`);
          const data=await response.json()
          let arrayOfData=[];
          for(let key in data){
              arrayOfData.push({id:key, ...data[key]})
          }
          //setExpense(arrayOfData);
          dispatch(ExpenseAction.addExpense(arrayOfData));
          console.log(arrayOfData);
      }
      catch(err){
          console.log(err);
      }
  }
  const putData=async(obj)=>{
    try {
        const response=await fetch(`${url}/${email}/${idForEditing}.json`,{
            method:'PUT',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        })
        console.log(response);
        console.log("Expenses edited Successfully");
        getData();
        
    } catch (error) {
        console.log(error);
    }
  }
  
    const postData=async(obj)=>{
      try{
          const response=await fetch(`${url}/${email}.json`,{
              method:'POST',
              body:JSON.stringify(obj),
              headers:{
                  'Content-Type':'application/json'
              }
          })
    
         const data=await response.json()
         console.log(data);
         console.log("Expenses added successfully");
         getData();
      }
      catch(err){
          console.log(err);
      }
    }
    
    const submitHandler=(e)=>{
        e.preventDefault();
        const obj={
          amount:amount,
          description:description,
          category:category
        }
        if(isEditing){
          //ctx.update(ctx.id,obj);
          dispatch(ExpenseAction.update());
          putData(obj)
        }else{
          postData(obj)
        }
        // props.onAdd(amount,description,category);
        // setAmount('');
        // setDescription('');
        // setCategory('');
    }

  let total=0;
  arrayOfData.forEach((exp)=>{
    total+=Number(exp.amount)
  })

    useEffect(()=>{
      if(isEditing){
        setAmount(amountForEditing);
        setDescription(descriptionForEditing);
        setCategory(categoryForEditing);
      }else{
        setAmount("")
        setDescription("")
        setCategory("")
      }
      },[isEditing])
      
    useEffect(()=>{
      getData()
    },[deleted]);
    
    return(
    <div className={classes.parent}>
        <div className={classes.add}>
            {total>=10000 && <button type="button" className="btn btn-primary mt-5 mb-5 me-5">Premium</button>}
            <button type="button" className="btn btn-primary mt-5 mb-5" onClick={showHandler}>{show ? 'close' : '+Add Expense'}</button>
        </div>
       {show && <form className={classes.form} onSubmit={submitHandler}>
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
      
          <option selected value="food">Food</option>
          <option value="petrol">Petrol</option>
          <option value="Shopping">Shopping</option>
          </select>
          <button type="submit" className="btn btn-primary mt-5" >{isEditing?'Update':'Save'}</button>
        </form>}      
      </div>
  
    )

}
export default ExpenseForm;