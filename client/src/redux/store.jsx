import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/userSlice"
import {persistReducer , FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER} from "redux-persist"
import persistConfig from './persist/persistConfig'
import postReducer from "./features/postSlice"

const rootReducer =  combineReducers({
  user: userReducer,
  post: postReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store