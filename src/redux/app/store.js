// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import userReducer from '../reducers/userSlice';

const store = configureStore({
  reducer: {
    userState: userReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
