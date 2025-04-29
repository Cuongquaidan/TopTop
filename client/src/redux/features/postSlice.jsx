import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    pages: {
      home: { data: [], scrollTop: 0 },
      explore: { data: [], scrollTop: 0 },
    },
    postStack: [],
  },
  reducers: {
    setPageData: (state, action) => {
      const { page, data } = action.payload;
      state.pages[page].data = data;
    },
    clearPageData: (state, action) => {
      const { page } = action.payload;
      state.pages[page].data = [];
    },
    setPageScrollTop: (state, action) => {
      const { page, scrollTop } = action.payload;
      state.pages[page].scrollTop = scrollTop;
    },
    pushPostStack: (state, action) => {
      state.postStack.push(action.payload);
    },
    popPostStack: (state) => {
      state.postStack.pop();
    },
    clearPostStack: (state) => {
      state.postStack = [];
    },
  }
});

export const { setPageData, clearPageData, setPageScrollTop, pushPostStack, popPostStack, clearPostStack } = postSlice.actions;
export default postSlice.reducer;
