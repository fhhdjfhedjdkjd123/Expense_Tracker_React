import { createSlice } from "@reduxjs/toolkit";


const initialAuthState={
    isAuthenticate:!!localStorage.getItem('email'),
    isLogin:true
}

const AuthSlice=createSlice({
    name:'Authentication',
    initialState:initialAuthState,
    reducers:{
        login(state){
            state.isAuthenticate=true
            console.log('User has successfully loggedin');
        },
        logout(state){
            localStorage.clear();
            state.isAuthenticate=false
        }
    }
})


export const authAction=AuthSlice.actions;
export default AuthSlice.reducer;