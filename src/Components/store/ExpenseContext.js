import React, { useEffect, useState } from "react";

const ExpenseContext=React.createContext();

export const ExpenseContextProvider=(props)=>{
    const [expense, setExpense]=useState([]);
    const [isEditing, setIsEditing]= useState(false)
    const [id, setId]=useState(null);
    const [amount, setAmount]=useState(null);
    const [descript, setDescript]=useState(null)
    const [category, setCategory]=useState(null)



    const email=localStorage.getItem('email').replace(/[@,.]/g,'')
    let url='https://expense-tracker-3a05b-default-rtdb.firebaseio.com/';
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
    const putData=async(id, obj)=>{
        try {
            const response=await fetch(`${url}/${email}/${id}.json`,{
                method:'PUT',
                body:JSON.stringify(obj),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            console.log(response);
            getData()
            
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
        const data=await response.json();
        console.log(data);
        getData();
        }
        catch(err){
            console.log(err);
        }
    }

    const deleteHandler=async(id)=>{
        try{
            const response=await fetch(`${url}/${email}/${id}.json`,{
                method:'DELETE'
            })
            getData();
            console.log(response);
            console.log("Expense Successfully Deleted");
        }
        catch(err){
            console.log(err);
        }
    }
    const editHandler=(id, amount, description, category)=>{
        setIsEditing(true)
        setId(id)
        setAmount(amount)
        setDescript(description)
        setCategory(category)
        
        console.log(id, amount, description, category);
        }
    const updateHandler=(id, obj)=>{
        putData(id, obj)
        setIsEditing(false)
    }
        

    const addExpenseHandler=(newExpense)=>{
        postData(newExpense)
        console.log('Expenses added');
    }

    useEffect(()=>{
        getData()
    },[])

    const cartContextValues={
        expenses:expense,
        addExpense:addExpenseHandler,
        deleteData:deleteHandler,
        edit: editHandler,
        id:id,
        amount:amount,
        description:descript,
        category:category,
        update:updateHandler,
        isEditing: isEditing,

    }
    return (
        <ExpenseContext.Provider value={cartContextValues}>{props.children}</ExpenseContext.Provider>
    )
}
export default ExpenseContext;