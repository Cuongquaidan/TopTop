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

    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    addFollowedUser: (state,action)=>{
      state.user = {...state.user, numOfFolloweds : state.user.numOfFolloweds + 1, followeds:[...state.user.followeds,action.payload]}
    },
    removeFollowedUser: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          numOfFolloweds: state.user.numOfFolloweds - 1,
          followeds: state.user.followeds.filter(id => id !== action.payload)
        };
      }
    },

  }
})

export const {setUser, clearUser, addFollowedUser, removeFollowedUser} = userSlice.actions;
export default userSlice.reducer;