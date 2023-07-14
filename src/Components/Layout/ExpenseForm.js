import React,{useState,useContext,useEffect} from 'react';
import classes from './ExpenseForm.module.css';
import ExpenseContext from '../store/ExpenseContext';


const ExpenseForm=()=>{
    const [expense, setExpense]=useState([]);
    const [amount,setAmount]=useState('');
    const [description,setDescription]=useState('');
    const [category,setCategory]=useState('food');
    const [show,setShow]=useState(false);

    const ctx=useContext(ExpenseContext);

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
          setExpense(arrayOfData);
          console.log(arrayOfData);
      }
      catch(err){
          console.log(err);
      }
  }
  const putData=async(obj)=>{
    try {
        const response=await fetch(`${url}/${email}/${ctx.id}.json`,{
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
        if(ctx.isEditing){
          ctx.update(ctx.id,obj)
          putData(obj)
        }else{
          postData(obj)
        }
        // props.onAdd(amount,description,category);
        // setAmount('');
        // setDescription('');
        // setCategory('');
    }
    useEffect(()=>{
      if(ctx.isEditing){
        setAmount(ctx.amount);
        setDescription(ctx.description);
        setCategory(ctx.category);
      }else{
        setAmount("")
        setDescription("")
        setCategory("")
      }
      },[ctx.isEditing])
      
    useEffect(()=>{
      getData()
    },[]);
    
    return(
    <div className={classes.parent}>
        <div className={classes.add}>
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
          <button type="submit" className="btn btn-primary mt-5" >{ctx.isEditing?'Update':'Save'}</button>
        </form>}      
      </div>
  
    )

}
export default ExpenseForm;