import { createSlice } from "@reduxjs/toolkit";


const initialState={
    
    isActivePremium:false,
    isMode:false
}
const ThemeReducer=createSlice({
    name:'Theme',
    initialState: initialState,
    reducers:{
        activePremium(state){
            state.isActivePremium=true;
        },
        ModeChange(state){
            state.isMode=!state.isMode;
        }
    }
})
export const ThemeReducerAction=ThemeReducer.actions
export default ThemeReducer.reducer