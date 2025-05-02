import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../libs/axios/AxiosInstance";
import { BASE_URL, SUMMARY_API } from "../../shared/Route";

const initialState = {
  user: null,
  selectedUser: null,
  likePosts: [],
  savePosts: [],
  loading : false,
  error: null,
}

export const fetchUserByID = createAsyncThunk(
  "user/fetchUserByID",
  async (userID, {rejectWithValue})=>{
      try {
        const AxiosInstance = createAxiosInstance(BASE_URL);
        const response = await AxiosInstance.get(SUMMARY_API.user.get.byID.replace(":userID", userID));
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
  }
)

export const fetchLikePostsByUserID = createAsyncThunk("user/fetchLikePostsByUserID",
  async (userID, {rejectWithValue})=>{
    try{
      const AxiosInstance = createAxiosInstance(BASE_URL);
      const response = await AxiosInstance.get(SUMMARY_API.likePost.get.byUserID.replace(":userID", userID));
      return response.data;
    }catch(error){
      return rejectWithValue(error.response.data);
    }
  }

)

export const fetchSavePostsByUserID = createAsyncThunk(
  "user/fetchSavePostsByUser",
  async (userID, { rejectWithValue }) => {
    try {
      const AxiosInstance = createAxiosInstance(BASE_URL);
      const response = await AxiosInstance.get(SUMMARY_API.savePost.get.byUserID.replace(":userID", userID));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    setUser: (state, action) => {
      state.user = action.payload.user;

    },
    clearUser: (state)=>{
      state.user = null;
      state.likePosts = [];
      state.savePosts = [];
      state.selectedUser = null;
      
    },
    setSelectedUser:(state,action)=>{
      state.selectedUser=action.payload.selectedUser
    },
    clearSelectedUser:(state)=>{
      state.selectedUser=null
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
    addLikePost: (state, action) => {
      state.likePosts = [...state.likePosts, action.payload];
    },
    removeLikePost: (state, action) => {
      state.likePosts = state.likePosts.filter(post => post.postId !== action.payload);
    },
    addSavePost: (state, action) => {
      state.savePosts = [...state.savePosts, action.payload];
    },
    removeSavePost: (state, action) => {
      state.savePosts = state.savePosts.filter(post => post.postId !== action.payload);
    },
    

  },
  extraReducers: (builder)=>{
    builder
    .addCase(fetchUserByID.pending,(state,action)=>{
      state.loading = true;
      state.error = null;

    })
    .addCase(fetchUserByID.fulfilled,(state,action)=>{
      state.loading = false;
      state.selectedUser = action.payload;
    })
    .addCase(fetchUserByID.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(fetchLikePostsByUserID.fulfilled, (state, action) => {
      state.likePosts = action.payload;
    })

    .addCase(fetchSavePostsByUserID.fulfilled, (state, action) => {
      state.savePosts = action.payload;
    });
  }
})

export const {setUser, clearUser,setSelectedUser,clearSelectedUser, addFollowedUser, removeFollowedUser, addLikePost, addSavePost, removeLikePost, removeSavePost} = userSlice.actions;
export default userSlice.reducer;