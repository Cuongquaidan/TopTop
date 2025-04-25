import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postsData: [],
    scrollTop: 0,
    postStack: [],
  },
  reducers: {
    setPostsData: (state, action) => {
      state.postsData = action.payload;
    },
    clearPostsData: (state) => {
      state.postsData = [];
    },
    setScrollTop: (state, action) => {
      state.scrollTop = action.payload;
    },
    pushPostStack: (state, action) => {
      state.postStack.push(action.payload);
    },
    popPostStack: (state) => {
      state.postStack.pop();
    },
    clearPostStack: (state) => {
      state.postStack = [];
    }
  }
});

export const { setPostsData, clearPostsData, setScrollTop, pushPostStack, popPostStack, clearPostStack } = postSlice.actions;
export default postSlice.reducer;
