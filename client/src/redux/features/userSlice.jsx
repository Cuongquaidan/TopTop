import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const initialState = {
  user: null,
  selectedUser: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    setUser: (state, action) => {
      state.user = action.payload.user;

    },
    clearUser: (state)=>{
      state.user = null;
    },
    setSelectedUser:(state,action)=>{
      state.selectedUser=action.payload.selectedUser
    },
    clearSelectedUser:(state)=>{
      state.selectedUser=null
    },
  }
})

export const {setUser, clearUser,setSelectedUser,clearSelectedUser} = userSlice.actions;
export default userSlice.reducer;