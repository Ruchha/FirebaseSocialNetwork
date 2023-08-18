import { configureStore, ThunkAction, Action, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit"
import { authAPI } from "../services/AuthService"
import userReducer from './reducers/userSlice'
import { postsAPI } from "../services/PostsService"
import { commentsAPI } from "../services/CommentsService"

const rootReducer = combineReducers({
  userReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [postsAPI.reducerPath]: postsAPI.reducer,
  [commentsAPI.reducerPath]: commentsAPI.reducer
})

const apiMiddlewares = [
  commentsAPI.middleware,
  authAPI.middleware,
  postsAPI.middleware,
]
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck:false}).concat([...apiMiddlewares]),
  devTools:true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
