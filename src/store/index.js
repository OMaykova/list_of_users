import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import currentUserReducer from './currentUserSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
  }
});