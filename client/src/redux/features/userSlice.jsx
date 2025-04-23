import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const initialState = {
  user: null,
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
  }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;