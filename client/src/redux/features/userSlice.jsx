import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const initialState = {
  username: null,
  email: null,
  phone: null,
  displayName: null,
  profilePicture: null, 
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.displayName = action.payload.displayName;
      state.profilePicture = action.payload.profilePicture; 

    },
    clearUser: (state)=>{
      state.username = null;
      state.email = null;
      state.phone = null;
      state.displayName = null;
      state.profilePicture = null;
    },
  }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;