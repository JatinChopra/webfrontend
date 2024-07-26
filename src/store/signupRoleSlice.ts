import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

// type def 
export type signupRoleType = {
    role:"client"|"stylist"|"salon"|undefined;
}

// init state 
let signupRole:signupRoleType = {
    role : undefined, 
}  ;

// create slice 
let signupRoleSlice = createSlice({
    name:"signupRole",
    initialState :signupRole,
    reducers:{
        setRole(state,action:PayloadAction<signupRoleType["role"]>){
           state.role = action.payload;  
        }
    }
})

//export actions , reducer 
export const signupRoleSliceActions = signupRoleSlice.actions;
export default signupRoleSlice.reducer;