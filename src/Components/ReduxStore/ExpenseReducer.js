import { createSlice } from "@reduxjs/toolkit"


const initialState={
    expenses:[],
    isEditing: false,
    id:null,
    amount:null,
    description:null,
    category:null,
    deleted:false
    
}
const ExpenseReducer=createSlice({
    name:'expenses',
    initialState:initialState,
    reducers:{
        addExpense(state,actions){
            state.expenses=actions.payload
        },
        edit(state,actions){
            state.isEditing=true;
            state.id=actions.payload.id; 
            state.amount=actions.payload.amount;
            state.description=actions.payload.description;
            state.category=actions.payload.category;
            console.log(actions.payload);
        },
        update(state){
            state.isEditing=false
        },
        deleteData(state){
            state.deleted=!state.deleted
        }
        

    }
})
export const ExpenseAction=ExpenseReducer.actions
export default ExpenseReducer.reducer