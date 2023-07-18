import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import ExpenseReducer from "./ExpenseReducer";
import ThemeReducer from "./ThemeReducer";


const store=configureStore({
    reducer:{
        authReducer:AuthReducer,
        expenseReducer:ExpenseReducer,
        themeReducer:ThemeReducer
    }
})
export default store;